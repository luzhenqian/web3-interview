"use client";

import ImageDownloader from "@/components/imageCropper/ImageDownloader";
import ImageEditor from "@/components/imageCropper/ImageEditor";
import ImageUploader from "@/components/imageCropper/ImageUploader";
import { useState } from "react";

const ImageCropper: React.FC = () => {
  const [imageSrc, setImageSrc] = useState("");
  const [downloadVisible, setDownloadVisible] = useState(false);
  const [croppedImageUrl, setCroppedImageUrl] = useState("");

  const onFileChange = (file: File) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => setImageSrc(reader.result as string));
    reader.readAsDataURL(file);
    setImageSrc(reader.result as string);
  };

  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="h-[640px] w-[1120px] flex justify-center items-center flex-col text-center cursor-pointer hover:opacity-90 border border-black rounded-sm border-opacity-25">
          {imageSrc ? (
            <ImageEditor
              imageSrc={imageSrc}
              onCancel={() => setImageSrc("")}
              onCropped={(croppedImage: string) => {
                setImageSrc("");
                setCroppedImageUrl(croppedImage);
                setDownloadVisible(true);
              }}
            />
          ) : (
            <ImageUploader onFileChange={onFileChange} />
          )}
        </div>
      </div>
      {croppedImageUrl && (
        <ImageDownloader
          imageSrc={croppedImageUrl}
          onDownload={() => {
            setCroppedImageUrl("");
            setDownloadVisible(false);
          }}
          onCancel={() => {
            setCroppedImageUrl("");
            setDownloadVisible(false);
          }}
          isVisible={downloadVisible}
        />
      )}
    </>
  );
};

export default ImageCropper;
