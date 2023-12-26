import React from "react";
import Button from "./Button";

interface ImageDownloaderProps {
  imageSrc: string;
  onDownload: () => void;
  onCancel: () => void;
  isVisible: boolean;
}

const ImageDownloader: React.FC<ImageDownloaderProps> = ({
  imageSrc,
  onDownload,
  onCancel,
  isVisible,
}) => {
  const downloadImage = () => {
    if (!imageSrc) return;

    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = "downloadedImage.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    onDownload();
  };

  return (
    <div
      className={`fixed bottom-0 left-0 m-4 transition-height duration-500 ease-in-out ${
        isVisible ? "opacity-100 max-h-screen" : "opacity-0 max-h-0"
      }`}
    >
      <div className="relative bg-white shadow-lg rounded-md flex justify-between items-start w-96 h-96">
        <Button className="absolute left-1 top-1" onClick={downloadImage}>
          下载
        </Button>
        <Button className="absolute right-1 top-1" onClick={onCancel}>
          取消
        </Button>
        <img
          src={imageSrc}
          alt="cropped"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default ImageDownloader;
