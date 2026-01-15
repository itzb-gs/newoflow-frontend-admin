import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UploadIcon, Cross2Icon, FileIcon } from '@radix-ui/react-icons';
import { formatBytes } from '@/lib/utils';
import { MAX_UPLOAD_SIZE } from '@/lib/constants';

export const MediaUpload = ({ onUpload, isUploading, multiple = true }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter((file) => {
      if (file.size > MAX_UPLOAD_SIZE) {
        alert(`File ${file.name} is too large. Maximum size is ${formatBytes(MAX_UPLOAD_SIZE)}`);
        return false;
      }
      return true;
    });

    if (multiple) {
      setSelectedFiles((prev) => [...prev, ...validFiles]);
    } else {
      setSelectedFiles(validFiles.slice(0, 1));
    }
  }, [multiple]);

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter((file) => {
      if (file.size > MAX_UPLOAD_SIZE) {
        alert(`File ${file.name} is too large. Maximum size is ${formatBytes(MAX_UPLOAD_SIZE)}`);
        return false;
      }
      return true;
    });

    if (multiple) {
      setSelectedFiles((prev) => [...prev, ...validFiles]);
    } else {
      setSelectedFiles(validFiles.slice(0, 1));
    }
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (selectedFiles.length > 0 && onUpload) {
      onUpload(selectedFiles);
      setSelectedFiles([]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Media Files</CardTitle>
        <CardDescription>
          Drag and drop files or click to browse. Maximum file size: {formatBytes(MAX_UPLOAD_SIZE)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4">
            <label htmlFor="file-upload" className="cursor-pointer">
              <span className="text-blue-600 hover:text-blue-700 font-medium">
                Choose files
              </span>
              <input
                id="file-upload"
                type="file"
                className="sr-only"
                multiple={multiple}
                onChange={handleFileInput}
                accept="audio/*,video/*"
              />
            </label>
            <span className="text-gray-600"> or drag and drop</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {multiple ? 'Audio and video files' : 'Select one file'}
          </p>
        </div>

        {selectedFiles.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Selected Files ({selectedFiles.length})</h4>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <FileIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <p className="text-xs text-gray-500">{formatBytes(file.size)}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveFile(index)}
                    disabled={isUploading}
                  >
                    <Cross2Icon className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <Button
              onClick={handleUpload}
              disabled={isUploading || selectedFiles.length === 0}
              className="w-full"
            >
              {isUploading ? 'Uploading...' : `Upload ${selectedFiles.length} file(s)`}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
