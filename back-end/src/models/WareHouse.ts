import mongoose, { Types } from 'mongoose';

const WareHouseSchema = new mongoose.Schema({
  tree: [
    {
      type: [String],
      unique: true,
    },
  ],
  products:[{ type: Types.ObjectId, ref: 'Product', default: [] }],
  createdAt: { type: Date, default: Date.now },
});

const WareHouse = mongoose.model('WareHouse', WareHouseSchema);

export default WareHouse;
