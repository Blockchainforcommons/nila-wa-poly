import { useEffect, useState } from "react";
import { Badge, FormHelperText } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
  UseFormGetValues,
  UseFormSetValue,
  UseFormUnregister,
} from "react-hook-form";
import ImagePreview from "../../../utils/imageCrop/imagePreview";
import { fileValidation } from "../../../utils/helpers";
import S from "./body/addProfile.styled";

interface AddProfileProps<FormInputTypes extends FieldValues> {
  ImageHandler?: () => void;
  inputName: string;
  control: Control;
  gridArea?: string;
  rules: { [key: string]: any };
  setValue: UseFormSetValue<FormInputTypes & FieldValues>;
  getValues: UseFormGetValues<FormInputTypes & FieldValues>;
  unregister: UseFormUnregister<FormInputTypes & FieldValues>;
}

function AddProfile<FormInputTypes>({
  inputName,
  rules,
  control,
  setValue,
  gridArea,
  getValues,
}: AddProfileProps<FormInputTypes & FieldValues>) {
  //state values
  // latest chosen image
  const [imageToCrop, setImageToCrop] = useState<string>("");
  // latest cropped image
  const [croppedImage, setCroppedImage] = useState<string | undefined>(
    getValues(inputName as Path<FormInputTypes & FieldValues>)
  );

  //functions
  const handleImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    let chosenImage = (event.target.files as FileList)[0];
    if (fileValidation(chosenImage.name)) {
      // if correct file chosen, replace the cropped image with latest file
      setImageToCrop(window.URL.createObjectURL(chosenImage));
      // const image = await imageCompressor(chosenImage);
      // setImageToCrop(image as string);
    } else {
      // if wrong file chosen, reset the previously croped image.
      setCroppedImage("");
    }
  };

  const handleCroppedImage = (croppedImg: string) => {
    if (!croppedImg) return;
    setCroppedImage(croppedImg);
  };

  const generateProfileName = (blob: Blob, newName: string) => {
    const file = new File([blob], newName, { type: blob.type });
    return file;
  };

  const handleCroppedProfileImage = async (image: string) => {
    const profileBlob = await fetch(image).then((res) => res.blob());
    const result = generateProfileName(profileBlob, "profilePic");

    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryData = e.target && e.target.result; // This contains the binary data of the image
      const finalData = croppedImage ? binaryData : "";
      setValue(
        inputName as Path<FormInputTypes & FieldValues>,
        finalData as PathValue<
          FormInputTypes & FieldValues,
          Path<FormInputTypes & FieldValues>
        >
      );
    };
    reader.readAsArrayBuffer(result);
  };

  // sets the profile field with the value of cropped image
  useEffect(() => {
    if (croppedImage !== "") handleCroppedProfileImage(croppedImage as string);
    // setValue(
    //   inputName as Path<FormInputTypes & FieldValues>,
    //   croppedImage as PathValue<
    //     FormInputTypes & FieldValues,
    //     Path<FormInputTypes & FieldValues>
    //   >
    // );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [croppedImage]);

  return (
    <>
      <S.ProfileContainer {...(gridArea ? { gridArea } : null)}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <label htmlFor="files">
              <S.UploadButton>add</S.UploadButton>
            </label>
          }
        >
          <S.ProfilePicture alt={inputName} src={croppedImage}>
            <ImageIcon />
          </S.ProfilePicture>
        </Badge>
        <Controller
          name={inputName}
          rules={rules}
          defaultValue=""
          control={control}
          render={({ field, formState: { errors } }) => {
            return (
              <>
                <input
                  id="files"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    field.onChange((e.target.files as FileList)[0]);
                    handleImage(e);
                  }}
                  onClick={(
                    event: React.MouseEvent<HTMLInputElement, MouseEvent>
                  ) => {
                    const element = event.target as HTMLInputElement;
                    element.value = "";
                  }}
                />
                <FormHelperText sx={{ whiteSpace: "nowrap" }}>
                  {errors[inputName]?.message as string}
                </FormHelperText>
              </>
            );
          }}
        />
      </S.ProfileContainer>
      {imageToCrop && (
        <ImagePreview
          image={imageToCrop}
          setImage={setImageToCrop}
          handleCroppedImage={handleCroppedImage}
        />
      )}
    </>
  );
}

export default AddProfile;
