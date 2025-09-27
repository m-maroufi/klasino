"use client";
import { cn } from "@/lib/utils";
import axios from "axios";
import { ImageIcon, XCircleIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Dropzone from "react-dropzone";
interface ImageUploadProps {
  onChange: (url: string) => void; // ⚡ تغییر از onUpload به onChange
  value?: string;
}

const ImagePreview = ({
  url,
  onRemove,
}: {
  url: string;
  onRemove: () => void;
}) => (
  <div className="relative aspect-square">
    <button
      className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"
      onClick={onRemove}
    >
      <XCircleIcon className="h-5 w-5 fill-primary text-primary-foreground" />
    </button>
    <Image
      src={url}
      height={500}
      width={500}
      alt=""
      className="border border-border h-full w-full rounded-md object-cover"
    />
  </div>
);

export default function ImageUpload({ onChange, value }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(value || null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append("image", file);

      const apiKey = process.env.NEXT_PUBLIC_IMAGEBB_API_KEY;
      const apiUrl = process.env.NEXT_PUBLIC_IMAGEBB_API_URL;
      console.log(`${apiUrl}?key=${apiKey}`);

      const response = await axios.post(`${apiUrl}?key=${apiKey}`, formData);
      const url = response.data.data.url as string;
      onChange(url); // ⚡ همینجا URL رو میفرستیم به فرم
      setPreview(url);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="w-full max-w-40">
      <div className="mt-1 w-full">
        {preview ? (
          <ImagePreview url={preview} onRemove={() => setPreview(null)} />
        ) : (
          <Dropzone
            onDrop={(acceptedFiles) => {
              const file = acceptedFiles[0];
              if (file) {
                const imageUrl = URL.createObjectURL(file);
                setPreview(imageUrl);
              }
            }}
            accept={{
              "image/png": [".png", ".jpg", ".jpeg", ".webp"],
            }}
            maxFiles={1}
          >
            {({
              getRootProps,
              getInputProps,
              isDragActive,
              isDragAccept,
              isDragReject,
            }) => (
              <div
                {...getRootProps()}
                className={cn(
                  "border border-dashed flex items-center justify-center aspect-square rounded-md focus:outline-hidden focus:border-primary",
                  {
                    "border-primary bg-secondary": isDragActive && isDragAccept,
                    "border-destructive bg-destructive/20":
                      isDragActive && isDragReject,
                  }
                )}
              >
                <input
                  {...getInputProps()}
                  id="profile"
                  onChange={handleFileChange}
                />
                <ImageIcon className="h-16 w-16" strokeWidth={1.25} />
              </div>
            )}
          </Dropzone>
        )}
      </div>
    </div>
  );
}
