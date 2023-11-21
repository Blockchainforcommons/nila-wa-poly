import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IProductSlice {
  _id?: string;
  cropType: string;
  cropVariety: string;
  location: string;
  quantity: string;
  packagingStatus: string;
  harvestDate: string;
  entryDate: string;
  picture: any;
  grade: string;
  pricePerQuintal: string;
  isVerified?: boolean;
  appId?: number;
}

interface Products {
  products: IProductSlice[];
  productLoading: boolean;
  fetchError: boolean;
  productAddLoading: boolean;
}

const initialState: Products = {
  products: [
    // {
    //   _id: "",
    //   cropType: "paddy",
    //   cropVariety: "",
    //   location: "",
    //   quantity: "",
    //   packagingStatus: "",
    //   harvestDate: "",
    //   entryDate: "",
    //   picture: "",
    //   grade: "",
    //   pricePerQuintal: "",
    //   isVerified: true,
    // },
    {
      cropType: "Paddy Seeds",
      cropVariety: "Basmati",
      quantity: "2000",
      location: "Thanjavur",
      harvestDate: "2022-01-01",
      entryDate: "2022-05-02",
      grade: "A",
      packagingStatus: "Good",
      isVerified: false,
      picture: "",
      pricePerQuintal: "10000",
    },
    {
      cropType: "Millet Seeds",
      cropVariety: "Basmati",
      quantity: "2000",
      location: "Thanjavur",
      harvestDate: "2022-01-01",
      entryDate: "2022-05-02",
      grade: "A",
      packagingStatus: "Good",
      picture: "",
      pricePerQuintal: "10000",
      isVerified: false,
    },
    {
      cropType: "Groundnut",
      cropVariety: "Basmati",
      quantity: "2000",
      location: "Thanjavur",
      harvestDate: "2022-01-01",
      entryDate: "2022-05-02",
      grade: "A",
      packagingStatus: "Good",
      picture: "",
      pricePerQuintal: "10000",
      isVerified: true,
    },
    {
      cropType: "Maize",
      cropVariety: "Basmati",
      quantity: "2000",
      location: "Thanjavur",
      harvestDate: "2022-01-01",
      entryDate: "2022-05-02",
      grade: "A+",
      packagingStatus: "Good",
      picture: "",
      pricePerQuintal: "10000",
      isVerified: false,
    },
    {
      cropType: "Ragi Seeds",
      cropVariety: "Basmati",
      quantity: "2000",
      location: "Thanjavur",
      harvestDate: "2022-01-01",
      entryDate: "2022-05-02",
      grade: "C",
      packagingStatus: "Good",
      picture: "",
      pricePerQuintal: "10000",
      isVerified: true,
    },
    {
      cropType: "Black Gram",
      cropVariety: "Basmati",
      quantity: "2000",
      location: "Thanjavur",
      harvestDate: "2022-01-01",
      entryDate: "2022-05-02",
      grade: "C",
      packagingStatus: "Good",
      picture: "",
      pricePerQuintal: "10000",
      isVerified: false,
    },
  ],
  productLoading: true,
  fetchError: false,
  productAddLoading: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    fetchProduct: (state, action: PayloadAction<any>) => {
      state.products = action.payload;
    },
    productFetching: (state, action: PayloadAction<any>) => {
      state.productLoading = action.payload;
    },
    setFetchError: (state, action: PayloadAction<any>) => {
      state.fetchError = action.payload;
    },
    setProductAddLoading: (state, action: PayloadAction<any>) => {
      state.productAddLoading = action.payload;
    },
  },
});

export const {
  fetchProduct,
  productFetching,
  setFetchError,
  setProductAddLoading,
} = productSlice.actions;
export const productReducer = productSlice.reducer;
