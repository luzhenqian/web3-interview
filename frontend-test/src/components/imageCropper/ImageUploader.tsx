import React from "react";
import Button from "./Button";

type ImageUploaderProps = {
  onFileChange: (file: File) => void;
};

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onFileChange,
}: ImageUploaderProps) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFiles = (files: FileList) => {
    for (let i = 0; i < files.length; i++) {
      if (validateImage(files[i])) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target) {
            onFileChange(files[i]);
          }
        };
        reader.readAsDataURL(files[i]);
        onFileChange(files[i]);
      } else {
        alert("Unsupported file format");
      }
    }
  };

  const validateImage = (file: File) => {
    const validFormats = ["image/jpeg", "image/png", "image/gif"];
    return validFormats.includes(file.type);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  return (
    <div onDragOver={handleDragOver} onDrop={handleDrop}>
      <p className="mb-2">将图片拖到此处</p>
      <p className="mb-4">或者</p>
      <input
        type="file"
        className="hidden"
        id="fileInput"
        accept="image/jpeg, image/png, image/gif"
        onChange={handleInputChange}
      />
      <Button as="label" htmlFor="fileInput">
        选择图片
      </Button>
    </div>
  );
};

export default ImageUploader;
