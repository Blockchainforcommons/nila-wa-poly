interface IProduct {
  cropType: String;
  cropVariety: String;
  location: String;
  quantity: String;
  packagingStatus: String;
  harvestDate: String;
  entryDate: String;
  picture: Buffer;
  grade: String;
  pricePerQuintal: String;
  appId: Number;
}

interface INewProduct {
  cropType: String;
  cropVariety: String;
  location: String;
  quantity: String;
  packagingStatus: String;
  harvestDate: String;
  entryDate: String;
  picture: Buffer;
  grade: String;
  pricePerQuintal: String;
  path: String[];
  appId: Number;
  isVerified: Boolean;
}

export { IProduct, INewProduct };
