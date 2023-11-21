import { FC } from "react";
import {
  Control,
  UseFormGetValues,
  UseFormSetValue,
  UseFormUnregister,
} from "react-hook-form";
import Input from "../../../input-fields/input/input";
import AddProfile from "../../../input-fields/add-profile";
import S from "./productsModal.styled";
import { fileValidation } from "../../../../utils/helpers";

interface CustomProps {
  control: Control;
  setValue: UseFormSetValue<any>;
  getValues: UseFormGetValues<any>;
  unregister: UseFormUnregister<any>;
}

const FormField: FC<CustomProps> = ({
  control,
  setValue,
  getValues,
  unregister,
}) => {
  //constants

  return (
    <S.StaticBox>
      <AddProfile
        inputName="picture"
        control={control}
        rules={{
          required: "required",
          // validate: {
          //   fileFormat: (file: File) => {
          //     if (typeof file === "string" && (file as string).length > 0)
          //       return true; // passes cropped image url
          //     return (
          //       fileValidation(file ? file?.name : "") ||
          //       "expected format: .jpg, .jpeg, .png"
          //     );
          //   },
          // },
        }}
        setValue={setValue}
        getValues={getValues}
        unregister={unregister}
        gridArea="prf"
      />

      <Input
        name="cropType"
        type="text"
        control={control}
        rules={{ required: "required" }}
        options={{
          label: "Crop Type *",
          gridArea: "ftp",
          placeholder: "Crop Type",
        }}
      />
      <Input
        name="cropVariety"
        type="text"
        control={control}
        rules={{ required: "required" }}
        options={{
          label: "Crop Variety *",
          gridArea: "var",
          placeholder: "Crop variety",
        }}
      />
      <Input
        name="location"
        type="text"
        control={control}
        rules={{ required: "required" }}
        options={{
          label: "Location",
          gridArea: "loc",
          placeholder: "Location",
        }}
      />
      <Input
        name="harvestDate"
        type="date"
        control={control}
        rules={{ required: "required" }}
        options={{
          label: "Harvest Date *",
          gridArea: "std",
        }}
      />
      <Input
        name="entryDate"
        type="date"
        control={control}
        rules={{ required: "required" }}
        options={{
          gridArea: "end",
          label: "Entry Date *",
        }}
      />
      <Input
        name="quantity"
        type="number"
        control={control}
        rules={{ required: "required" }}
        options={{
          label: "Quantity*",
          gridArea: "ava",
          unit: "kg",
          placeholder: "Quantity",
        }}
      />
      {/* <Input
        name="packagingStatus"
        type="select"
        control={control}
        rules={{ required: "required" }}
        options={{
          label: "Packaging Status *",
          gridArea: "qty",
          selectOptions: [
            ["A+", "A+"],
            ["B+", "B+"],
            ["C+", "C+"],
          ],
          placeholder: "Choose packaging status",
        }}
      /> */}
      <Input
        name="grade"
        type="text"
        control={control}
        rules={{ required: "required" }}
        options={{
          label: "Grade",
          gridArea: "qty",
          placeholder: "Enter Grade",
        }}
      />
      <Input
        name="packagingStatus"
        type="text"
        control={control}
        rules={{ required: "required" }}
        options={{
          label: "packagingStatus",
          gridArea: "pac",
          placeholder: "packagingStatus",
        }}
      />

      <Input
        name="pricePerQuintal"
        type="number"
        control={control}
        rules={{ required: "required" }}
        options={{
          label: "Price Per quintal*",
          gridArea: "pri",
          unit: "₹",
          placeholder: "Enter Price",
        }}
      />
    </S.StaticBox>
  );
};

export default FormField;
