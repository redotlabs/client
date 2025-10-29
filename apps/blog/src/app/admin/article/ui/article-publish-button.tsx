'use client';

import { updateArticle } from '@/shared/api/services/article/detail';
import { Article } from '@/shared/types/article';
import { Button, toast } from '@redotlabs/ui';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useFormContext } from 'react-hook-form';

const ArticlePublishButton = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const { mutate, isPending } = useMutation({ mutationFn: updateArticle });

  const form = useFormContext();

  const onPublish = (data: Partial<Article>) => {
    mutate(
      {
        articleId: +articleId,
        article: {
          ...data,
          status: 'PUBLISHED',
        },
      },
      {
        onSuccess: () => {
          toast.success('게시되었습니다.');
        },
        onError: (error) => {
          toast.error(error?.message || '게시에 실패했습니다.');
        },
      }
    );
  };

  return (
    <Button
      size="sm"
      onClick={form.handleSubmit(onPublish)}
      disabled={isPending}
    >
      {isPending ? '게시중...' : '게시'}
    </Button>
  );
};

export default ArticlePublishButton;
