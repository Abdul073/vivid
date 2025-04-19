"use client";
import React, { useEffect, useState } from "react";
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";

type Props = {
  contentId: string;
  onContentChange: (
    contentId: string,
    newContent: string | string[] | string[][]
  ) => void;
};

const UploadImage = ({ contentId, onContentChange }: Props) => {
  const [pubkey, setPubkey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load the key safely after component mounts
    const key = process.env.NEXT_PUBLIC_UPLOADCARE_PUB_KEY;
    if (!key) {
      setError("UploadCare public key is not configured");
      console.error("UploadCare public key is not set");
      return;
    }
    setPubkey(key);
  }, []);

  const handleChangeEvent = (e: { cdnUrl: string | string[] | string[][] }) => {
    onContentChange(contentId, e.cdnUrl);
  };

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  if (!pubkey) {
    return <div className="p-4">Loading uploader...</div>;
  }

  return (
    <div className="uploader-container">
      <FileUploaderRegular
        pubkey={pubkey}
        sourceList="local, url, dropbox"
        classNameUploader="uc-light"
        multiple={false}
        onFileUploadSuccess={handleChangeEvent}
        maxLocalFileSizeBytes={10000000}
      />
    </div>
  );
};

export default UploadImage;
