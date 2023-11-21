import { FC } from "react";
import { Control, useForm } from "react-hook-form";
import { Button } from "@mui/material";
import CustomModal from "../../common-components/custom-modal";
import { useThunkDispatch } from "../../../store/store";
import FormField from "./body/formField";
import ModalHeader from "../../common-components/custom-modal/header";
import ModalBody from "../../common-components/custom-modal/body";
import ModalFooter from "../../common-components/custom-modal/footer";
import { addProduct } from "../../../store/slices/product/actions";
import { IProductSlice } from "../../../store/slices/product";

const ProductsModal: FC<{ openModal: boolean; handleClose: () => void }> = (
  props
) => {
  //constants
  const { openModal, handleClose } = props;
  const dispatch = useThunkDispatch();
  const {
    handleSubmit,
    clearErrors,
    reset,
    setValue,
    getValues,
    unregister,
    control: formControl,
  } = useForm<any>();

  const onSubmit: any = (data: IProductSlice) => {
    console.log("data", { ...data, appId: Math.random() });
    dispatch(addProduct({ ...data, appId: Math.random() }));
    reset();
    handleClose();
  };

  return (
    <CustomModal
      openModal={openModal}
      handleClose={() => {
        reset();
        handleClose();
      }}
    >
      <ModalHeader
        handleClose={() => {
          clearErrors();
          reset();
          handleClose();
        }}
      >
        Add product
      </ModalHeader>

      <ModalBody id={"products"} onSubmit={handleSubmit(onSubmit)}>
        <FormField
          setValue={setValue}
          getValues={getValues}
          unregister={unregister}
          control={formControl as unknown as Control}
        />
      </ModalBody>

      <ModalFooter>
        <Button form="products" type="submit">
          Submit
        </Button>
      </ModalFooter>
    </CustomModal>
  );
};
export default ProductsModal;
