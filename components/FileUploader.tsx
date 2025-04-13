"use client";

import { useDropzone } from "@uploadthing/react";
// import type { FileWithPath } from "@uploadthing/react";
import Image from "next/image";
import { useCallback, Dispatch, SetStateAction } from "react";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { Button } from "@/components/ui/button";
import { convertFileToUrl } from "@/lib/utils";

type FileUploaderProps = {
  onFieldChange: (url: string) => void;
  imageUrl: string;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

export function FileUploader({
  imageUrl,
  onFieldChange,
  setFiles,
}: FileUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
      onFieldChange(convertFileToUrl(acceptedFiles[0]));
    },
    [onFieldChange, setFiles]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    // eslint-disable-next-line no-constant-condition
    accept: generateClientDropzoneAccept(["image/*"]),
  });

  return (
    <div
      {...getRootProps()}
      className="flex-center flex h-72 cursor-pointer flex-col overflow-hidden rounded-xl"
    >
      <input {...getInputProps()} className="cursor-pointer" id="image" />

      {imageUrl ? (
        <div className="flex size-full flex-1 justify-center ">
          <Image
            src={imageUrl}
            alt="image"
            width={250}
            height={250}
            className="w-full object-cover object-center"
          />
        </div>
      ) : (
        <div className="flex-center flex-col py-5">
          {/* <Image
            src="/assets/icons/upload.svg"
            width={77}
            height={77}
            alt="file upload"
          /> */}
          <h3 className="my-2">Drag photo here</h3>
          <p className="mb-4">SVG, PNG, JPG</p>
          <Button type="button" className="rounded-full">
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
}
