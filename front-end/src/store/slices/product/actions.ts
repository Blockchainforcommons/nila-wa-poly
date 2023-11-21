import {
  fetchProduct,
  productFetching,
  setFetchError,
  setProductAddLoading,
} from ".";
import { Dispatch, RootState } from "../../store";
import axios from "axios";
import { IProductSlice } from ".";
import Toast from "../../../utils/toast";

export const getProducts =
  () => async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(productFetching(true));
    try {
      const request = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_ENDPOINT}/api/products`
      );
      if (request.data.success) {
        dispatch(fetchProduct(request.data.data));
        dispatch(productFetching(false));
      }
    } catch (err) {
      console.error(err);
      dispatch(productFetching(false));
      dispatch(setFetchError(true));
    }
  };

export const addProduct =
  (data: IProductSlice) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    // let formData = new FormData();
    // for (const key in data) {
    //   if (data.hasOwnProperty(key)) {
    //     if (key === "picture" && data[key] instanceof ArrayBuffer) {
    //       // Append the ArrayBuffer as a Blob
    //       const blob = new Blob([new Uint8Array(data[key])]);
    //       formData.append(key, blob, "filename.jpg");
    //     } else {
    //       formData.append(key, data[key]);
    //     }
    //   }
    // }
    dispatch(setProductAddLoading(true));
    const persistData = getState().product.products;
    const config = {
      headers: {
        // "Content-Type": "application/json",
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const request = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_ENDPOINT}/api/products`,
        data,
        config
      );
      console.log("postRequest", request);
      if (request.data.success) {
        dispatch(fetchProduct([request.data.data, ...persistData]));
        dispatch(setProductAddLoading(false));
        Toast({ message: "Product Added Successfully.", type: "success" });
      }
    } catch (err) {
      console.error("post err", err);
      Toast({ message: "Add Product failed.", type: "error" });
      dispatch(setProductAddLoading(false));
    }
  };
