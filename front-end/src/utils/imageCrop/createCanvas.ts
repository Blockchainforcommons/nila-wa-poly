type ctxType = {
  imageSmoothingQuality:string
  drawImage:any
} | any

export const createCanvas = (imageData:any, pixelCrop:any) => {
  const canvas = document.createElement("canvas");
  const scaleX = imageData.naturalWidth / imageData.width;
  const scaleY = imageData.naturalHeight / imageData.height;
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx : ctxType = canvas.getContext("2d");
  ctx.imageSmoothingQuality = "high";

  ctx.drawImage(
    imageData,
    pixelCrop.x * scaleX,
    pixelCrop.y * scaleY,
    pixelCrop.width * scaleX,
    pixelCrop.height * scaleY,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((croppedImage:any) => {
      // returning an error
      if (!croppedImage) {
        reject(new Error("Canvas is empty"));
        return;
      }

      croppedImage.name = "Preview.jpeg";
      // creating a Object URL representing the Blob object given
      const croppedImageUrl = window.URL.createObjectURL(croppedImage);
      resolve({croppedImage,croppedImageUrl});
    }, "image/jpeg");
  });
};
