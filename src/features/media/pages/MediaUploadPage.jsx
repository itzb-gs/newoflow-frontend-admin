import { Link } from 'react-router-dom';
import { useUpload } from '../hooks/useUpload';
import { MediaUpload } from '@/components/media/MediaUpload';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export const MediaUploadPage = () => {
  const { uploadMultiple, isUploading, uploadProgress } = useUpload();
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleUpload = async (files) => {
    setUploadComplete(false);
    await uploadMultiple(files);
    setUploadComplete(true);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center space-x-4">
        <Link to="/media">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Media
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Upload Media Files</h1>
          <p className="text-gray-500 mt-1">
            Upload audio or video files to your media library
          </p>
        </div>
      </div>

      <MediaUpload
        onUpload={handleUpload}
        isUploading={isUploading}
        multiple={true}
      />

      {Object.keys(uploadProgress).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Upload Progress</CardTitle>
            <CardDescription>Files being uploaded</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(uploadProgress).map(([fileId, progress]) => (
                <div key={fileId} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="truncate flex-1">{fileId.split('-')[0]}</span>
                    <span className="font-medium ml-2">{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {uploadComplete && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <div>
                <p className="font-medium text-green-900">Upload Complete</p>
                <p className="text-sm text-green-700">
                  Your files have been successfully uploaded and are being processed.
                </p>
              </div>
            </div>
            <div className="mt-4">
              <Link to="/media">
                <Button variant="outline" className="border-green-300">
                  View Media Library
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Upload Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Supported formats: Audio (MP3, FLAC, WAV) and Video (MP4, MKV, AVI)</li>
            <li>• Maximum file size: 500MB per file</li>
            <li>• Files will be automatically processed by configured plugins</li>
            <li>• You can upload multiple files at once</li>
            <li>• Metadata will be extracted automatically when available</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
