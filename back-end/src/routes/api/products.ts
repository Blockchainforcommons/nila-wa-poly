import { createHash } from './../../utils/helpers';
import express, { NextFunction, Request, Response } from 'express';
const router = express.Router();
import Product from '../../models/Product';
import { productValidator } from '../../services/validator';
import { socketInstance } from '../../services/socket';
import multer from 'multer';
import { genMerkleTree, getMerklePathV2, updateMerkleTree, updatePath, getRoot } from '../../services/merkle_tree';

const multerUpload = multer();

// const create = async (req: any, res: Response, next: NextFunction) => {
//   try {
//     const {
//       cropType,
//       cropVariety,
//       location,
//       quantity,
//       packagingStatus,
//       harvestDate,
//       entryDate,
//       picture,
//       grade,
//       pricePerQuintal,
//       appId,
//     } = req.body;

//     let newProduct: any = {
//       cropType,
//       cropVariety,
//       location,
//       quantity,
//       packagingStatus,
//       harvestDate,
//       entryDate,
//       picture: picture ?? req.file?.buffer,
//       grade,
//       pricePerQuintal,
//       appId,
//       isVerified: false,
//       isDeleted: false,
//     };

//     // validating body
//     await productValidator.validate(newProduct);

//     // creating hash
//     const productHash = createHash(newProduct);
//     newProduct.path = [productHash];

//     // fetching all products
//     const products = await Product.find({}, { _id: 1, path: { $slice: 1 } }).sort({
//       createdAt: 1,
//     });

//     let productsHashes = [];
//     if (products.length) {
//       productsHashes = products.map(p => p.path[0]);
//       productsHashes.push(productHash);

//       // creating merkle tree
//       const treeRes = await createTree(productsHashes);

//       if (!treeRes.success)
//         return res.status(200).json({ ...treeRes, message: 'Creating product has failed!' });

//       // updating local products
//       const updatedProductsRes = await updateProducts(treeRes.tree, [...products, newProduct]);

//       if (!updatedProductsRes.success)
//         return res.status(200).json({
//           ...updatedProductsRes,
//           message: 'Creating product has failed!',
//         });

//       newProduct.path = updatedProductsRes.data[updatedProductsRes.data.length - 1]?.path;
//       updatedProductsRes.data.pop();

//       // updating old products
//       for (const p of updatedProductsRes.data) {
//         await Product.updateOne({ _id: p._id }, { $set: { path: p.path } });
//       }
//     }

//     const product = new Product(newProduct);
//     await product.save();

//     if (socketInstance) socketInstance.emit('tree', newProduct.path);
//     res.status(200).json({ success: true, data: product });
//   } catch (e) {
//     console.error('Creating product has failed!', (e as Error).message);
//     res.status(200).json({
//       success: false,
//       message: 'Creating product has failed!',
//       error: e as Error,
//     });
//     next(e);
//   }
// };

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.find({ isDeleted: false }).sort({ createdAt: -1 });
    if (products?.length) {
      for (const p of products) {
        const rootRes = await getRoot(p.appId || 474866790);
        if (rootRes.success) p.isVerified = rootRes.root === p.root;
      }
    }

    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error('Fetching products have failed!', (error as Error).message);
    res.status(200).json({
      success: false,
      message: 'Fetching products have failed!',
    });
  }
};

// const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const productId = req.params.id;

//     if (!productId) return res.status(200).json({ success: false, message: 'Provide valid product id' });

//     // fetching target product
//     const targetProduct: any = await Product.findById(productId);
//     if (!targetProduct || targetProduct.isDeleted) {
//       return res.status(200).json({
//         success: false,
//         message: 'Product not exist.',
//       });
//     }

//     const updatableProduct = {
//       ...targetProduct._doc,
//       ...req.body,
//     };
//     delete updatableProduct.path;

//     // creating new hash
//     const productHash = createHash(updatableProduct);
//     updatableProduct.path = [productHash];

//     // updating product with new hash and body
//     const result = await Product.updateOne({ _id: productId }, { $set: updatableProduct });

//     if (result.matchedCount > 0) {
//       // Fetching all products to create new tree with updated product
//       const products = await Product.find({}, { _id: 1, path: { $slice: 1 } }).sort({
//         createdAt: 1,
//       });
//       if (products.length > 1) {
//         const productsHashes = products.map(p => p.path[0]);
//         // creating merkle tree
//         const treeRes = await createTree(productsHashes);

//         if (!treeRes.success) return res.status(200).json({ ...treeRes, message: 'Updating product has failed!' });

//         // updating local products
//         const updatedProductsRes = await updateProducts(treeRes.tree, products);

//         if (!updatedProductsRes.success)
//           return res.status(200).json({
//             ...updatedProductsRes,
//             message: 'Updating product with new hashes has failed!',
//           });

//         // updating old products
//         for (const p of updatedProductsRes.data) {
//           await Product.updateOne({ _id: p._id }, { $set: { path: p.path } });
//         }
//         const targetLeaf = updatedProductsRes.data.filter(p => p._id.toString() === productId)[0];

//         if (socketInstance) socketInstance.emit('tree', targetLeaf.path);
//       } else if (socketInstance) socketInstance.emit('tree', updatableProduct.path);
//       res.status(200).json({ success: true, data: updatableProduct });
//     } else return res.status(200).json({ success: false, message: 'No product found to update!' });
//   } catch (error) {
//     console.error('Updating product has failed!', (error as Error).message);
//     res.status(200).json({
//       success: false,
//       message: 'Updating product has failed!',
//     });
//   }
// };

// const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const productId = req.params.id;

//     if (!productId) return res.status(200).json({ success: false, message: 'Provide valid product id' });

//     // empty hash
//     const emptyHash = createHash('');

//     const update = {
//       isDeleted: true,
//       path: [emptyHash],
//     };

//     // updating product with new hash and body
//     const result = await Product.updateOne({ _id: productId }, { $set: update });

//     if (result.matchedCount > 0) {
//       // Fetching all products to create new tree with updated product
//       const products = await Product.find({}, { _id: 1, path: { $slice: 1 } }).sort({
//         createdAt: 1,
//       });
//       if (products.length > 1) {
//         const productsHashes = products.map(p => p.path[0]);
//         // creating merkle tree
//         const treeRes = await createTree(productsHashes);

//         if (!treeRes.success) return res.status(200).json({ ...treeRes, message: 'Deleting product has failed!' });

//         // updating local products
//         const updatedProductsRes = await updateProducts(treeRes.tree, products);

//         if (!updatedProductsRes.success)
//           return res.status(200).json({
//             ...updatedProductsRes,
//             message: 'Updating product with new hashes has failed!',
//           });

//         // updating old products
//         for (const p of updatedProductsRes.data) {
//           await Product.updateOne({ _id: p._id }, { $set: { path: p.path } });
//         }

//         const targetLeaf = updatedProductsRes.data.filter(p => p._id.toString() === productId)[0];
//         if (socketInstance) socketInstance.emit('tree', targetLeaf.path);
//       } else if (socketInstance) socketInstance.emit('tree', []);
//       res.status(200).json({ success: true, data: productId, message: 'Product deleted successfully!' });
//     } else return res.status(200).json({ success: false, message: 'No product found to delete!' });
//   } catch (error) {
//     console.error('Deleting product has failed!', (error as Error).message);
//     res.status(200).json({
//       success: false,
//       message: 'Deleting product has failed!',
//     });
//   }
// };

// ----------------------- new format -----------------------------------
const createProduct = async (req: any, res: Response) => {
  try {
    const {
      cropType,
      cropVariety,
      location,
      quantity,
      packagingStatus,
      harvestDate,
      entryDate,
      picture,
      grade,
      pricePerQuintal,
      appId,
    } = req.body;

    let newProduct: any = {
      cropType,
      cropVariety,
      location,
      quantity,
      packagingStatus,
      harvestDate,
      entryDate,
      picture: picture ?? req.file?.buffer,
      grade,
      pricePerQuintal,
      appId,
      isVerified: false,
      isDeleted: false,
    };

    // validating body
    await productValidator.validate(newProduct);

    // creating hash
    const productHash = createHash(newProduct);
    newProduct.hash = productHash;
    newProduct.root = productHash;
    newProduct.path = [];

    // fetching all products
    const products: any = await Product.find({}, { _id: 1, hash: 1 }).sort({
      createdAt: 1,
    });

    if (products.length) {
      const productsHashes = products.map((p: any) => p.hash);
      productsHashes.push(productHash);

      // Create full Merkle Tree
      const [merkleRoot, path] = genMerkleTree(productsHashes as string[]);

      // Create paths based on full Merkle Tree
      let paths: { [hash: string]: string[] } = {};

      for (let r = 0; r < productsHashes.length; r++) {
        let p = getMerklePathV2(r, path, productsHashes[r] as string);
        paths = { ...paths, ...p };
      }

      // updating old products
      for (const p of products) {
        await Product.updateOne({ _id: p._id }, { $set: { path: paths[p.hash], root: merkleRoot } });
      }

      // updating new product
      newProduct.path = paths[newProduct.hash];
      newProduct.root = merkleRoot;
    }
    // Save new product
    const product = new Product(newProduct);
    await product.save();

    res.status(200).json({ success: true, data: product });
  } catch (e) {
    console.error('Creating product has failed!', (e as Error).message);
    res.status(200).json({
      success: false,
      message: 'Creating product has failed!',
      error: e as Error,
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;

    if (!productId) return res.status(200).json({ success: false, message: 'Provide valid product id' });

    // fetching target product
    const targetProduct: any = await Product.findById(productId);
    if (!targetProduct || targetProduct.isDeleted) {
      return res.status(200).json({
        success: false,
        message: 'Product not exist.',
      });
    }

    let newRoot: string = targetProduct.root;
    const updatableProduct = {
      ...targetProduct._doc,
      ...req.body,
    };
    delete updatableProduct.hash;
    delete updatableProduct.root;
    delete updatableProduct.path;

    // creating new hash
    const productHash = createHash(updatableProduct);
    updatableProduct.hash = productHash;

    // fetching all products
    const products: any = await Product.find({}, { _id: 1, hash: 1, path: 1 }).sort({
      createdAt: 1,
    });
    const targetIndex = products.findIndex((p: any) => p.hash === targetProduct.hash);

    // Update a leaf
    let [updatedRoot, sib] = updateMerkleTree(
      newRoot,
      targetProduct.path,
      targetProduct.hash,
      productHash,
      targetIndex,
      products.length,
    );
    newRoot = updatedRoot;

    // Update each path to incorporate the new leaf data
    for (const p of products) {
      let update: any = {
        path: updatePath(p.path, sib),
        root: newRoot,
      };
      if (p._id.toString() === targetProduct._id.toString()) {
        update = {
          ...updatableProduct,
          ...update,
        };
      }
      await Product.updateOne({ _id: p._id }, { $set: update });
    }
    // Passing sibling through socket
    if (socketInstance) socketInstance.emit('update', sib);

    res.status(200).json({ success: true, data: updatableProduct });
  } catch (error) {
    console.error('Updating product has failed!', (error as Error).message);
    res.status(200).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    if (!productId) return res.status(200).json({ success: false, message: 'Provide valid product id' });

    // fetching target product
    const targetProduct: any = await Product.findById(productId);
    if (!targetProduct || targetProduct.isDeleted) {
      return res.status(200).json({
        success: false,
        message: 'Product not exist.',
      });
    }

    // empty hash
    const emptyHash = createHash('');

    let newRoot: string = targetProduct.root;
    const updatableProduct = {
      ...targetProduct._doc,
      hash: emptyHash,
      isDeleted: true,
    };

    // fetching all products
    const products: any = await Product.find({}, { _id: 1, hash: 1, path: 1 }).sort({
      createdAt: 1,
    });
    const targetIndex = products.findIndex((p: any) => p.hash === targetProduct.hash);

    // Update a leaf
    let [updatedRoot, sib] = updateMerkleTree(
      newRoot,
      targetProduct.path,
      targetProduct.hash,
      emptyHash,
      targetIndex,
      products.length,
    );
    newRoot = updatedRoot;

    // Update each path to incorporate the new leaf data
    for (const p of products) {
      let update: any = {
        path: updatePath(p.path, sib),
        root: newRoot,
      };
      if (p._id.toString() === targetProduct._id.toString()) {
        update = {
          ...updatableProduct,
          ...update,
        };
      }
      await Product.updateOne({ _id: p._id }, { $set: update });
    }

    // Passing sibling through socket
    if (socketInstance) socketInstance.emit('update', sib);

    res.status(200).json({ success: true, data: productId, message: 'Product deleted successfully!' });
  } catch (error) {
    console.error('Deleting product has failed!', (error as Error).message);
    res.status(200).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

router.post('/', multerUpload.single('picture'), createProduct);
router.get('/', getProducts);
router.put('/:id', updateProduct);
router.put('/delete/:id', deleteProduct);

module.exports = router;
