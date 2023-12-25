"use client";
import Image from "next/image";

type ClipboardProps = {
  text: string;
};

export default function Clipboard({ text = "" }: ClipboardProps) {
  return (
    <Image
      src="/assets/images/copy.svg"
      alt="ethereum"
      width={14}
      height={14}
      className="cursor-pointer"
      onClick={() => {
        navigator.clipboard.writeText(text);
      }}
    />
  );
}
