'use client';

import { useUpdateArticle } from '@/shared/api/queries/article/detail';
import { Article } from '@/shared/types/article';
import { Button, toast } from '@redotlabs/ui';
import { useTiptapEditor } from '@repo/editor/hooks';
import { useParams } from 'next/navigation';
import { useFormContext } from 'react-hook-form';

const ArticlePublishButton = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const { mutate, isPending } = useUpdateArticle();

  const form = useFormContext();
  const { editor } = useTiptapEditor();

  const onPublish = (data: Partial<Article>) => {
    const content = editor?.getHTML();

    mutate(
      {
        articleId: +articleId,
        article: {
          ...data,
          content,
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
