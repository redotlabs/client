/* eslint-disable @next/next/no-img-element */
'use client';

import { uploadArticleFile } from '@/shared/api/services/article/detail';
import { useMutation } from '@tanstack/react-query';
import { useFormContext, useWatch } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { useParams } from 'next/navigation';
import { useCallback } from 'react';
import { Loader } from '@/shared/components/ui';

const ThumbnailForm = () => {
  const { control, setValue } = useFormContext();
  const { articleId } = useParams<{ articleId: string }>();

  const thumbnail = useWatch({ control, name: 'thumbnail' });

  const { mutate, isPending } = useMutation({ mutationFn: uploadArticleFile });

  const addScreenshots = (files: File[]) => {
    if (!files) return;

    const file = files[0];
    const formData = new FormData();
    formData.append('file', file);

    mutate(
      { articleId: +articleId, formData },
      {
        onSuccess: ({ url }) => {
          setValue('thumbnail', url);
        },
      }
    );
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    addScreenshots(acceptedFiles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
    onDrop,
  });

  return (
    <section>
      <h2 className="text-lg font-semibold">썸네일</h2>

      <div className="py-4 flex items-center gap-4">
        <div {...getRootProps()} className="w-full h-40 bg-gray-200 rounded-md">
          <input {...getInputProps()} className="w-full h-full opacity-0" />
          {isPending ? (
            <Loader className="size-8" />
          ) : (
            <div className="w-full h-full flex items-center justify-center cursor-pointer">
              {thumbnail ? (
                <img
                  src={thumbnail}
                  alt="썸네일"
                  className="w-full h-full object-cover"
                />
              ) : (
                <p className="text-sm text-gray-500">끌어다 놓거나 어쩌고</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ThumbnailForm;
