import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadMediaFile } from '@/api/media';
import { toast } from 'sonner';

export const useUpload = () => {
  const queryClient = useQueryClient();
  const [uploadProgress, setUploadProgress] = useState({});

  const mutation = useMutation({
    mutationFn: async ({ file, metadata }) => {
      const formData = new FormData();
      formData.append('file', file);
      
      if (metadata) {
        Object.entries(metadata).forEach(([key, value]) => {
          formData.append(key, value);
        });
      }

      const fileId = `${file.name}-${Date.now()}`;
      
      return uploadMediaFile(formData, (progress) => {
        setUploadProgress((prev) => ({
          ...prev,
          [fileId]: progress,
        }));
      }).then((result) => {
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
      toast.error(error.response?.data?.message || 'Failed to upload file');
    },
  });

  const uploadMultiple = async (files, metadata) => {
    const promises = Array.from(files).map((file) =>
      mutation.mutateAsync({ file, metadata })
    );
    
    try {
      await Promise.all(promises);
      toast.success(`${files.length} files uploaded successfully`);
    } catch (error) {
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
