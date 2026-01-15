import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadMediaFile } from '@/api/media';
import { toast } from '@/hooks/use-toast';

export const useUpload = () => {
  const queryClient = useQueryClient();
  const [uploadProgress, setUploadProgress] = useState({});

  const mutation = useMutation({
    mutationFn: async ({ file, title, media_type }) => {
      const fileId = `${file.name}-${Date.now()}`;
      
      return uploadMediaFile(
        file,
        title,
        media_type,
        (progress) => {
          setUploadProgress((prev) => ({
            ...prev,
            [fileId]: progress,
          }));
        }
      ).then((result) => {
        setUploadProgress((prev) => {
          const newProgress = { ...prev };
          delete newProgress[fileId];
          return newProgress;
        });
        return result;
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
      toast.success('File uploaded successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.detail || 'Failed to upload file');
    },
  });

  const uploadMultiple = async (files, title, media_type) => {
    const promises = Array.from(files).map((file) =>
      mutation.mutateAsync({ file, title, media_type })
    );
    
    try {
      await Promise.all(promises);
      toast.success(`${files.length} files uploaded successfully`);
    } catch {
      toast.error('Some files failed to upload');
    }
  };

  return {
    upload: mutation.mutate,
    uploadAsync: mutation.mutateAsync,
    uploadMultiple,
    isUploading: mutation.isPending,
    uploadProgress,
  };
};
