import { Contract } from '@algorandfoundation/tealscript';

type byte32 = StaticArray<byte, 32>;

const EMPTY_HASH = hex('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855') as byte32;

type Branch = StaticArray<byte, 32>;
type Path = Branch[];

// eslint-disable-next-line no-unused-vars
class WarehouseTree extends Contract {
  root = GlobalStateKey<byte32>();
  size = GlobalStateKey<uint64>();
  depth = GlobalStateKey<uint64>();
  tempstore = GlobalStateKey<byte32>();
  tempstore2 = GlobalStateKey<byte32>();


  private calcInitRoot(): byte32 {
    let result = EMPTY_HASH;

    for (let i = 0; i < this.depth.value; i = i + 1) {
      result = sha256(result + result);
    }

    return result;
  }

  private hashConcat(left: byte32, right: byte32): byte32 {
    return sha256(left + right);
  }

  private calcRoot(leaf: byte32, path: Path, index: uint64): byte32 {
    let result = leaf;

    for (let i = 0; i < this.depth.value; i = i + 1) {
      const elem = path[i];

      if (index % 2 === 0) {
        this.tempstore.value = elem
        this.tempstore2.value = result
        result = this.hashConcat(elem, result);
      } else {
        result = this.hashConcat(result, elem);
      }
    }

    return result;
  }

  deleteApplication(): void {
    verifyTxn(this.txn, { sender: this.app.creator });
  }

  createApplication(size: uint64): void {
    this.size.value = size
    // @ts-ignore
    this.depth.value = bitlen(size) - 1
    this.root.value = this.calcInitRoot();
  }

  verify(data: byte32, path: Path, index: uint64): void {
    assert(this.root.value === this.calcRoot(data, path,index));
  }

  updateLeaf(data: byte32, path: Path, index: uint64): void {
    assert(this.root.value == this.calcRoot(data, path,index))

    this.root.value = this.calcRoot(sha256(EMPTY_HASH), path, index);
  }
}