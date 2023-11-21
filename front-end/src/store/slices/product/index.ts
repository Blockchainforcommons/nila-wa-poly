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
  products: [],
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
      state.productLoading = false;
      state.productAddLoading = false;
    },
    productFetching: (state, action: PayloadAction<any>) => {
      state.productLoading = state.products.length ? false : action.payload;
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
