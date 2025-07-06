import React, { useState } from 'react';
import { Upload, FileText } from 'lucide-react';

interface PdfUploadProps {
  file: File | null;
  pageRange: string;
  onChange: (field: string, value: File | string | null) => void;
}

export const PdfUpload: React.FC<PdfUploadProps> = ({ file, pageRange, onChange }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type === 'application/pdf') {
      onChange('file', files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onChange('file', files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (): void => {
    setIsDragging(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Upload PDF (optional)
        </label>
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
            isDragging
              ? 'border-purple-500/50 bg-purple-500/10'
              : 'border-gray-600/50 hover:border-gray-500/50'
          }`}
        >
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          {file ? (
            <div className="flex items-center justify-center gap-3">
              <FileText className="text-purple-400" size={24} />
              <span className="text-white font-medium">{file.name}</span>
            </div>
          ) : (
            <div className="space-y-3">
              <Upload className="mx-auto text-gray-400" size={32} />
              <div>
                <p className="text-white font-medium">Drop your PDF here</p>
                <p className="text-gray-400 text-sm">or click to browse</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {file && (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Page Range (optional)
          </label>
          <input
            type="text"
            value={pageRange}
            onChange={(e) => onChange('pageRange', e.target.value)}
            placeholder="e.g., 1-10, 15, 20-25"
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
          />
        </div>
      )}
    </div>
  );
};