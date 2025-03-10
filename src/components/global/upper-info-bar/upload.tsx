"use client";
import React, { useState, useRef } from "react";
import { Upload, X, Check, Loader2 } from "lucide-react";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = async (event: any) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setIsUploading(true);
      setUploadSuccess(false);

      // Simulate file upload - replace with actual upload logic
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setUploadSuccess(true);
      } catch (error) {
        console.error("Upload failed:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const clearFile = (e: any) => {
    e.stopPropagation();
    setFile(null);
    setUploadSuccess(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        id="file-upload"
      />

      <label
        htmlFor="file-upload"
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg
          transition-all duration-200
          ${
            file
              ? uploadSuccess
                ? "bg-emerald-800 hover:bg-emerald-700"
                : "bg-slate-800 hover:bg-slate-700"
              : "bg-slate-800 hover:bg-slate-700"
          }
          text-slate-200 cursor-pointer border border-slate-600
          shadow-lg hover:shadow-slate-900/50
        `}
      >
        {isUploading ? (
          <Loader2 className="w-5 h-5 animate-spin text-slate-300" />
        ) : uploadSuccess ? (
          <Check className="w-5 h-5 text-emerald-400" />
        ) : (
          <Upload className="w-5 h-5 text-slate-300" />
        )}

        <span className="text-sm font-medium">
          {isUploading
            ? "Uploading..."
            : uploadSuccess
            ? "Upload Complete"
            : file
            ? file.name
            : "Choose File"}
        </span>

        {file && !isUploading && (
          <button
            onClick={clearFile}
            className="ml-2 p-1 rounded-full hover:bg-slate-600 transition-colors"
            aria-label="Clear file"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </label>

      {file && !isUploading && !uploadSuccess && (
        <div className="text-sm text-slate-400">
          Selected file: {file.name} ({(file.size / 1024).toFixed(1)} KB)
        </div>
      )}
    </div>
  );
};

export default FileUpload;
