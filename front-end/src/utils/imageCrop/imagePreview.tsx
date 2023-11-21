import { useState, useEffect } from "react";
import ReactCrop from "react-image-crop";
import { createCanvas } from "./createCanvas";
import S from "./image-preview.styled";
import "react-image-crop/dist/ReactCrop.css";

type ImagePreviewType = {
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  handleCroppedImage: (croppedImg: string) => void;
};

type FinalImageType = {
  croppedImageUrl: string;
  croppedImage: string;
};

interface Crop {
  aspect?: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  unit?: "px" | "%";
}

interface PixelDataType {
  aspect?: number;
  height?: number;
  width?: number;
  unit?: string;
  x?: number;
  y?: number;
}

export default function ImagePreview({
  image,
  setImage,
  handleCroppedImage,
}: ImagePreviewType) {
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 30,
    aspect: 1,
  });
  const [imageRef, setImageRef] = useState<HTMLElement | null>(null);
  const [finalImage, setFinalImage] = useState<FinalImageType | null>(null);

  useEffect(() => {
    let pixelData = {
      aspect: 1,
      height: crop.height,
      unit: "px",
      width: crop.width,
      x: 0,
      y: 0,
    };
    imageRef && handleOnComplete(pixelData);
  }, [imageRef]);

  const handleOnComplete = async (pixelData: PixelDataType) => {
    if (imageRef && pixelData.width && pixelData.height) {
      let result: FinalImageType | any = await createCanvas(
        imageRef,
        pixelData
      );
      setFinalImage(result);
    }
  };

  const handleOnUpload = () => {
    setImage("");
    finalImage?.croppedImageUrl &&
      handleCroppedImage(finalImage?.croppedImageUrl);
  };

  const handleImageLoaded = (image: HTMLElement) => {
    setImageRef(image);
  };

  const handleClose = () => {
    handleCroppedImage("");
    setImage("");
  };

  return (
    <S.ImageCropperContainer>
      <S.ImagePopUp>
        <S.CloseIconContainer onClick={handleClose}>
          <S.CloseIcon>close</S.CloseIcon>
        </S.CloseIconContainer>
        <S.MainImageContainer>
          <ReactCrop
            className="react-cropper"
            crop={crop}
            onChange={(c: Crop) => setCrop(c)}
            onComplete={(c: PixelDataType) => handleOnComplete(c)}
            src={image}
            ruleOfThirds
            onImageLoaded={(item: HTMLElement) => handleImageLoaded(item)}
            crossorigin="anonymous"
          />
        </S.MainImageContainer>
        <S.ImageDetailsSection>
          <S.PreviewTitleContainer>
            <p>Preview</p>
          </S.PreviewTitleContainer>
          <S.PreviewImageContainer>
            {finalImage ? (
              <img src={finalImage.croppedImageUrl} alt={"wallpaper"} />
            ) : (
              <p className="image-preview-title">Image Preview</p>
            )}
          </S.PreviewImageContainer>
          <S.UploadBtn>
            <button onClick={handleOnUpload}>Upload</button>
          </S.UploadBtn>
        </S.ImageDetailsSection>
      </S.ImagePopUp>
    </S.ImageCropperContainer>
  );
}
