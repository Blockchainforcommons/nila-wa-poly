import { NFTStorage, Blob } from 'nft.storage';
import dotenv from 'dotenv';
import Product from '../models/Product';
import staticProducts from '../utils/staticProducts.json';
import { IProduct } from '../utils/type';
dotenv.config();

// create a new NFTStorage client using our API key
const nftstorage = new NFTStorage({
  token: process.env.NFT_STORAGE_API_TOKEN || '',
});

export const storeNFT = async (product: IProduct) => {
  try {
    const blob = new Blob([JSON.stringify(product)], {
      type: 'application/json',
    });

    // call client.storeBlob, passing in the metadata
    const hashedProduct = await nftstorage.storeBlob(blob);

    return hashedProduct;
  } catch (error) {
    console.error(
      'Storing data on nft storage has failed!',
      (error as Error).message,
    );
  }
};

// export const initiate = async () => {
//   try {
//     const hashedProducts = [];
//     for (const product of staticProducts) {
//       const hashedProduct = await storeNFT(product);
//       const p = new Product({ ...product, cid: hashedProduct });
//       await p.save();
//       hashedProducts.push(hashedProduct);
//     }
//     console.log('hashedProducts', hashedProducts);
//   } catch (error) {
//     console.error(
//       'Initialising Storing data on nft has failed!',
//       (error as Error).message,
//     );
//   }
// };
