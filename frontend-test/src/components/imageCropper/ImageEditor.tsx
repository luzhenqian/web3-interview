import React, { useState, useCallback } from "react";
import Cropper, { Area, Point } from "react-easy-crop";
import Button from "./Button";

type ImageEditorProps = {
  imageSrc: string;
  onCancel: () => void;
  onCropped: (croppedImage: string) => void;
};

const ImageEditor: React.FC<ImageEditorProps> = ({
  imageSrc,
  onCancel,
  onCropped,
}) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(2);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const cropImage = async () => {
    if (croppedAreaPixels) {
      console.log("裁剪的像素区域:", croppedAreaPixels);
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      console.log("裁剪的图片:", croppedImage);
      onCropped(croppedImage);
    }
  };

  return (
    <div className="w-full h-full relative">
      <Cropper
        image={imageSrc}
        crop={crop}
        zoom={zoom}
        aspect={1 / 1}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
        cropShape="rect"
        showGrid={false}
        style={{
          containerStyle: {
            width: "100%",
            height: "100%",
            position: "absolute",
          },
          cropAreaStyle: {
            border: "2px solid #fff",
          },
          mediaStyle: {
            width: "auto",
            maxHeight: "100%",
            maxWidth: "100%",
            objectFit: "cover",
            boxSizing: "border-box",
          },
        }}
      />
      <Button className="absolute top-0 left-0" onClick={onCancel}>
        取消
      </Button>
      <Button className="absolute top-0 right-0" onClick={cropImage}>
        裁剪图片
      </Button>
    </div>
  );
};

export default ImageEditor;

function getCroppedImg(
  imageSrc: string,
  croppedAreaPixels: Area
): Promise<string> {
  const image = new Image();
  image.src = imageSrc;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  const maxSize = Math.max(image.width, image.height);
  canvas.width = maxSize;
  canvas.height = maxSize;

  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, maxSize, maxSize);
  ctx.drawImage(
    image,
    maxSize / 2 - image.width * 0.5,
    maxSize / 2 - image.height * 0.5
  );

  const data = ctx.getImageData(0, 0, maxSize, maxSize);
  canvas.width = croppedAreaPixels.width;
  canvas.height = croppedAreaPixels.height;
  ctx.putImageData(
    data,
    Math.round(0 - maxSize / 2 + image.width * 0.5 - croppedAreaPixels.x),
    Math.round(0 - maxSize / 2 + image.height * 0.5 - croppedAreaPixels.y)
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(URL.createObjectURL(blob!));
    }, "image/jpeg");
  });
}
