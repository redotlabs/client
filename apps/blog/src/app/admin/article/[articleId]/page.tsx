'use client';

import AdminHeader from '@/shared/components/layout/admin/header';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { RHFInput, RHFCheckbox } from '@repo/ui';
import CategoryForm from '../ui/form/category-form';
import TagForm from '../ui/form/tag-form';
import ThumbnailForm from '../ui/form/thumbnail-form';
import Link from 'next/link';
import { PATH } from '@/shared/constants/routes';
import { ChevronLeft } from 'lucide-react';
import { useAdminArticleDetail } from '@/shared/api/queries/article/detail';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import ArticleSaveButton from '../ui/article-save-button';
import ArticlePublishButton from '../ui/article-publish-button';
import ContentForm from '../ui/form/content-form';
import { EditorProvider } from '@/shared/components/ui';
import ArticleStatusBadge from '../../ui/article-status-badge';

const articleSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요.'),
  content: z.string().min(1, '내용을 입력해주세요.'),
  thumbnail: z.string().nullable(),
  categoryId: z.number().nullable(),
  tags: z.array(z.string()),
  isPublic: z.boolean(),
});

const defaultValues = {
  title: '',
  content: '',
  thumbnail: '',
  categoryId: null,
  tags: [],
  isPublic: false,
};

const ArticleEditPage = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const { data: article, isLoading } = useAdminArticleDetail(+articleId);

  const form = useForm<z.infer<typeof articleSchema>>({
    resolver: zodResolver(articleSchema),
    defaultValues,
  });

  const onSubmit = (data: z.infer<typeof articleSchema>) => {
    console.log(data);
  };

  useEffect(() => {
    if (article) {
      form.reset({
        title: article.title,
        content: article.content,
        thumbnail: article.thumbnail,
        categoryId: article.category?.id ?? null,
        tags: article.tags,
        isPublic: article.isPublic,
      });
    }
  }, [article, form]);

  return (
    <>
      <AdminHeader />
      <main className="p-8 container mx-auto">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Link href={PATH.admin.root} replace>
            <ChevronLeft />
          </Link>
          글쓰기
          {article?.status && <ArticleStatusBadge status={article.status} />}
        </h1>

        <FormProvider {...form}>
          <EditorProvider
            articleId={+articleId}
            initialContent={article?.content ?? ''}
            options={{ editable: true }}
          >
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-8"
            >
              <section className="mt-8 flex justify-end items-center gap-2">
                <ArticleSaveButton />
                <ArticlePublishButton />
              </section>

              <section className="mt-8">
                <div className="flex justify-end font-semibold">
                  <RHFCheckbox name="isPublic" label="공개" size="md" />
                </div>
              </section>

              <RHFInput
                name="title"
                label="제목"
                placeholder="제목을 입력해주세요."
              />

              <CategoryForm />

              <TagForm />

              <ThumbnailForm />

              <ContentForm />
            </form>
          </EditorProvider>
        </FormProvider>
      </main>
    </>
  );
};

export default ArticleEditPage;
