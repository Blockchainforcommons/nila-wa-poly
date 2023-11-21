import { createHash } from 'crypto';
import { describe, test, expect, beforeAll, beforeEach } from '@jest/globals';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { randomBytes } from 'crypto';
import { WarehouseTreeClient } from './contracts/clients/WarehouseTreeClient';

const fixture = algorandFixture();

function timer<T extends (...args: any[]) => any>(func: T): T {
    return function(...args: Parameters<T>): ReturnType<T> {
        const start_time = performance.now();
        const result = func(...args);
        const end_time = performance.now();
        console.log(`${func.name} ran in: ${end_time - start_time} ms`);
        return result;
    } as T;
}

function oppositeSubtreeAtLevel(leaf1: number, leaf2: number, treeSize: number): boolean[] {
    let results: boolean[] = [];
    let level: number = 0;
    let groupSize: number = 2;

    while (groupSize <= treeSize) {
        // Determine if the leaves are in the same group at this level
        const sameGroup: boolean = Math.floor(leaf1 / groupSize) !== Math.floor(leaf2 / groupSize);
        results.push(sameGroup);

        // Prepare for the next level
        level++;
        groupSize *= 2;
    }

    results.reverse();
    results = [false, ...results];

    // Add a boolean for the top level, if leaf1 and leaf2 are equal
    return results;
}

function sha256(left: string, right: string): string {
    if (right !== ''){
        return createHash('sha256').update(Buffer.from(left + right, 'hex')).digest('hex');
    }
    else {
        return createHash('sha256').update(Buffer.from(left, 'hex')).digest('hex');
    }
}

function getMerklePath(index: number, merkleTree: any[][]): any[] {
    let path: any[] = [];
    // List Merkle tree by level, for each level, determine sibling
    merkleTree.forEach((level, i) => {
        // Shift index
        if (i > 0) {
            index = Math.floor(index / 2);
        }
        // Find sibling of index
        const siblingIndex = index % 2 === 0 ? index + 1 : index - 1;
        if (siblingIndex >= level.length) {
            path.push(level[index]);
        } else {
            path.push(level[siblingIndex]);
        }
    });

    return path;
}

function genMerkleTree(leafs: string[]): [string, string[][]] {
    let MT: string[][] = [leafs];

    while (leafs.length !== 1) {
        let branch: string[] = [];
        let level: string[] = [];
        for (let i = 0; i < leafs.length; i += 2) {
            let hash: string;
            if (i === leafs.length - 1) {
                // Find the hash of an uneven pair
                hash = sha256(leafs[i],leafs[i])
                console.log(hash)
            } else {
                // Find the hash of both siblings
                hash = sha256(leafs[i],leafs[i + 1]);
                console.log(hash)

            }
            level.push(hash);
            branch.push(hash);
        }
        MT.push(level);
        leafs = branch;
    }
    return [leafs[0], MT.slice(0, -1)]; // Remove root from MT
}

function validatePath(path: string[], leaf: string, index: number): string {
    let hash: string = leaf;
    path.forEach((sibling, i) => {
        if (i > 0) {
            index = Math.floor(index / 2);
        }
        if (index % 2 === 0) {
            hash = sha256(hash,sibling);
        } else {
            hash = sha256(sibling,hash);
        }
    });
    return hash;
}

function updateTree(path: string[], newLeaf: string, index: number, size: number): [string, [string, string, number][]] {
    let hash: string = newLeaf;
    let slot: number = index;
    let newPath: [string, string, number][] = [];

    path.forEach((sibling, i) => {
        if (i > 0) {
            index = Math.floor(index / 2);
        }

        newPath.push([hash, sibling, slot]);

        if (index % 2 === 0) {
            hash = sha256(hash,sibling);
        } else {
            hash = sha256(sibling,hash);
        }

        if (i < path.length - 1) {
            slot = Math.floor(slot / 2);
        }
    });

    return [hash, newPath];
}

function updateMerkleTree(root: string, path: string[], oldLeaf: string, newLeaf: string, index: number, treeSize: number): [string, [string, string, number][]] {
    // Proof that we know the latest state root
    if (root !== validatePath(path, oldLeaf, index)) {
        throw new Error('Root validation failed');
    }

    // Log for validation - can be removed or adjusted as needed
    if (index % 1000 === 0) {
        console.log('ROOT VALIDATED', index);
    }

    // Calculate the new root with the known path
    const [newRoot, sib] = updateTree(path, newLeaf, index, treeSize);
    return [newRoot, sib];
}

function updatePath(path: string[], sib: [string, string, number][]): string[] {
    // Update paths from top to bottom (inverse path)
    path = path.slice().reverse();
    sib = sib.slice().reverse();

    // Only update if sibling is equal, if not, break loop
    for (let i = 0; i < path.length; i++) {
        if (path[i] !== sib[i][1]) {
            path[i] = sib[i][0];
            break;
        }
    }

    return path.reverse();
}

function updatePathBoxmap(
    path: string[], 
    boxmap: [string, [string, string, number][]][], 
    root: string, 
    data: string[], 
    index: number, 
    size: number
): [string[], number] {
    boxmap = boxmap.slice().reverse(); // Reverse list
    path = path.slice().reverse();
    let lvls = 0;
    let it = 0;

    while (true) {
        let sib = boxmap[it][1].slice().reverse(); // Reverse the sib list (not boxmap as above)

        for (let i = 0; i < path.length; i++) {
            let subtree = oppositeSubtreeAtLevel(index, sib[i][2], size); // Subtree match between path and sib
            let isSelf = path[path.length - 1] === sib[sib.length - 1][1];

            if (!isSelf && !subtree[i] && i >= lvls) {
                if (i + 1 < path.length && !subtree[i + 1]) {
                    path[i] = sib[i][1]; // Next is also false so use sibling
                } else {
                    path[i] = sib[i][0]; // Next isnt in the same subtree so use self
                }
                lvls += 1;
            }

            if (isSelf) {
                boxmap.splice(it, 1); // Remove sib record
            }
        }

        if (root === validatePath(path.slice().reverse(), data[index], index)) {
            return [path.slice().reverse(), it];
        }
        it++;
    }
}

function createMT(treeSize: number): [string[][], string, string[], number] {
    const originalData: string[] = Array.from({ length: treeSize }, (_, i) => sha256('','')); //(i % 2 === 0 ? 'aa' : 'bb') + 
    console.log('sha256', sha256('',''))
    console.log('tree size', treeSize, treeSize % 2 === 1 ? 'uneven' : '');

    // Create full Merkle Tree
    const [merkleRoot, path] = genMerkleTree(originalData);

    // Create paths based on full Merkle Tree
    let paths: string[][] = [];
    console.log('NEW MT PATHS');
    for (let r = 0; r < treeSize; r++) {
        let p = getMerklePath(r, path);
        paths.push(p);
    }

    return [paths, merkleRoot, originalData, treeSize];
}

function updateMT(paths: string[][], merkleRoot: string, data: string[], treeSize: number): [string[][], string] {
    console.log('UPDATE LEAFS and PATHS');
    let newRoot: string = merkleRoot;

    for (let i = 0; i < treeSize; i++) {
        let newLeaf = `new_tx${i}`;
        // Update a leaf
        let [updatedRoot, sib] = updateMerkleTree(newRoot, paths[i], data[i], newLeaf, i, treeSize);
        newRoot = updatedRoot;

        // Update each path to incorporate the new leaf data
        for (let j = 0; j < paths.length; j++) {
            paths[j] = updatePath(paths[j], sib);
        }
        // Note: Handle any error cases as per your logic
    }

    return [paths, newRoot];
}

function delayedUpdate(updates: number, size: number, paths: string[][], data: string[]) {
    let masterRoot = '';
    let it = 0;
    let boxmaps: [string, [string, string, number][]][] = [];

    while (true) {
        // Randomly select a new leaf to update
        let index = Math.floor(Math.random() * size);
        let newLeaf = randomBytes(12).toString('hex');

        if (boxmaps.length > 0) {
            // Update the path
            let [path, mapsit] = updatePathBoxmap(paths[index], boxmaps, masterRoot, data, index, size);
            paths[index] = path;
            if (masterRoot !== validatePath(path, data[index], index)) {
                throw new Error('Root validation failed');
            }
        }

        // Update tree
        let [newRoot, sib] = updateTree(paths[index], newLeaf, index, size);
        boxmaps.push([Date.now().toString(), sib]);
        masterRoot = newRoot;
        data[index] = newLeaf;

        it++;

        if (it > updates) {
            break;
        }
    }

    return paths;
}
// set tree size
export const treeSize = 8

const createApplication = async () => {
    await fixture.beforeEach();
    const { algod, testAccount } = fixture.context;
    // initiate the contract
    let appClient: WarehouseTreeClient;
    appClient = new WarehouseTreeClient(
          {
            sender: testAccount,
            resolveBy: 'id',
            id: 0,
          },
          algod
        );
    await appClient.create.createApplication({size: treeSize});

    // create tree of size treeSize with empty slots 
    const [paths, merkleRoot, originalData, _] = createMT(treeSize);

    console.log('origin data', originalData)
    const glob = await appClient.getGlobalState()
    console.log('globalState', glob.root?.asString, glob.depth?.asNumber(), glob.size?.asNumber())

    // validate a random path on-chain
    const leaf = Math.floor(Math.random() * treeSize);
    // add prefix 170 (aa) or 187 (bb) if right/left.
    // update to hex bytes
    let data = Buffer.from(originalData[leaf], 'hex')
    console.log('prefixed',leaf,originalData[leaf])
    // add prefix based on uneven/even
    console.log('old data', data, data.length)

    let path: Uint8Array[] = paths[leaf].map((p) => Buffer.from(p, 'hex'))
    //let depth_of_tree = Math.log2(treeSize)
    //console.log('depth_of_tree', depth_of_tree)
    console.log('path to input', path)

    const validate = await appClient.updateLeaf({
        data: data, 
        path: path,
        index: leaf,

    });
    console.log('validate', validate)

    const glob_after = await appClient.getGlobalState()
    console.log('globalState', glob_after.root?.asByteArray, glob_after.tempstore?.asByteArray, glob_after.tempstore2?.asByteArray())

    //console.log(paths, merkleRoot,originalData)
    updateMT(paths, merkleRoot, originalData, treeSize);
}
// create application 
createApplication()
//delayedUpdate(1_000_0, treeSize, paths, originalData)
