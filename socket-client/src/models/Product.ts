import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  appId: Number,
  cropType: String,
  cropVariety: String,
  location: String,
  quantity: String,
  packagingStatus: String,
  harvestDate: String,
  entryDate: String,
  picture: Buffer,
  grade: String,
  root: String,
  hash: String,
  pricePerQuintal: String,
  path: [String],
  isVerified: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;
