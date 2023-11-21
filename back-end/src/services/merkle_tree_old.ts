import { groupObjectsMax2 } from '../utils/helpers';
import WareHouse from '../models/WareHouse';
import { createHash } from '../utils/helpers';
import dotenv from 'dotenv';
dotenv.config();

export const createTree = async (productList: string[]) => {
  try {
    const root = [productList];

    while (root[0].length > 1) {
      const temp: any = [];

      for (let index = 0; index < root[0].length; index += 2) {
        if (index < root[0].length - 1 && index % 2 === 0) {
          const combinedHash = createHash(root[0][index] + root[0][index + 1]);

          temp.push(combinedHash);
        } else temp.push(root[0][index] + root[0][index]);
      }

      root.unshift(temp);
    }

    return { success: true, tree: root };
  } catch (error) {
    console.error('Creating merkle tree has failed!', (error as Error).message);
    return {
      success: false,
      message: 'Creating merkle tree has failed!',
      error: error as Error,
    };
  }
};

export const updateProducts = async (tree: any, products: any) => {
  try {
    let tempTree = [...tree];
    let groupedProducts = [...products];

    do {
      tempTree.pop();
      const targetHashs = tempTree[tempTree.length - 1];

      groupedProducts = groupObjectsMax2(groupedProducts);

      groupedProducts = groupedProducts.map((d, i) => {
        const updatedProduct = d.map((p: any) => {
          const clone = {
            ...(p._doc ?? p),
            path: [...p.path, targetHashs[i]],
          };

          return clone;
        });

        return updatedProduct;
      });
    } while (groupedProducts.length > 1);

    return { success: true, data: groupedProducts.flat() };
  } catch (error) {
    console.error('Updating product has failed!', (error as Error).message);
    return {
      success: false,
      message: 'Updating product has failed!',
      error: error as Error,
      data: [],
    };
  }
};

// export const createTree = async (productHashList: string[],products:any) => {
//   try {
//     const root = [productHashList];
//     const tempProducts=[...products];

//     while (root[0].length > 1) {
//       const temp: any = [];

//       for (let index = 0; index < root[0].length; index += 2) {
//         if (index < root[0].length - 1 && index % 2 === 0) {
//           const combinedHash = createHash(root[0][index] + root[0][index + 1]);
//           tempProducts[index].path[index + 1]=combinedHash;
//           tempProducts[index + 1].path[index + 1] = combinedHash;

//           temp.push(combinedHash);
//         } else {
//           temp.push(root[0][index]);
//         }
//       }

//       root.unshift(temp);
//     }

//     return root;
//   } catch (error) {
//     console.error('Creating merkle tree has failed!', (error as Error).message);
//   }
// };

export const verify = async (product: string) => {
  try {
    const hasTree: any = await WareHouse.find().sort({ createdAt: -1 }).limit(1);

    if (!hasTree?.length) return false;
    const root = hasTree[0].tree;

    let leafPosition = root.slice(-1)[0].findIndex((t: string) => t === product);

    if (leafPosition !== -1) {
      let productToverify = product;

      for (let index = root.length - 1; index > 0; index--) {
        let neighbour = null;

        if (leafPosition % 2 === 0) {
          neighbour = root[index][leafPosition + 1];
          leafPosition = Math.floor(leafPosition / 2);
          productToverify = createHash(productToverify + neighbour);
        } else {
          neighbour = root[index][leafPosition - 1];
          leafPosition = Math.floor((leafPosition - 1) / 2);
          productToverify = createHash(neighbour + productToverify);
        }
      }

      console.log(productToverify === root[0][0] ? 'Valid' : 'Not Valid');
    } else {
      console.log('Data not found with the id');
    }
  } catch (error) {
    console.error('Verifying product on merkle tree has failed!', (error as Error).message);
  }
};
