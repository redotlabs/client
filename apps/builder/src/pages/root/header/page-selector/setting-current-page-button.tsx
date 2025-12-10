import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  toast,
} from '@redotlabs/ui';
import { Settings } from 'lucide-react';
import { useDialog } from '@repo/hooks';
import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RHFCheckbox, RHFInput } from '@repo/ui';
import { useEffect } from 'react';
import { usePageStore } from '@/features/page/store';
import { isMultiZonePath } from '@/features/page/utils';
import { usePageStateManager } from '@/features/page/manager';

const schema = z.object({
  title: z.string().min(1, '페이지 이름을 입력해주세요.'),
  path: z
    .string()
    .min(1, 'URL Path를 입력해주세요.')
    .regex(/^\//, 'URL Path는 반드시 /로 시작해야 합니다.'),
  isProtected: z.boolean(),
});

const SettingCurrentPageButton = () => {
  const popover = useDialog();
  const { currentPageKey, setStoredPagesMap, appendAddedKeys } = usePageStore();

  const { paths, currentPage } = usePageStateManager();

  const otherPaths = paths.filter((path) => path !== currentPage?.path);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      path: '/',
      isProtected: false,
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    if (!currentPageKey) return;
    if (otherPaths.includes(data.path)) {
      toast.error('이미 존재하는 URL Path입니다.');
      return;
    }
    if (isMultiZonePath(data.path)) {
      toast.error('기본 사용 경로는 사용할 수 없습니다.');
      return;
    }
    setStoredPagesMap(currentPageKey, {
      ...currentPage!,
      ...data,
    });
    appendAddedKeys(currentPageKey!);
    popover.onClose();
    form.reset();
  };

  const onCancel = () => {
    form.reset();
    popover.onClose();
  };

  useEffect(() => {
    if (currentPage) {
      form.reset({
        title: currentPage.title,
        path: currentPage.path,
        isProtected: currentPage.isProtected,
      });
    }
  }, [currentPage]);

  return (
    <Popover open={popover.isOpen} onOpenChange={popover.onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="text"
          size="sm"
          className="w-full! flex items-center justify-between px-4! py-2! text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            현재 페이지 설정
          </div>
        </Button>
      </PopoverTrigger>

      <PopoverContent side="right" align="start" sideOffset={16}>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="px-4 py-3 bg-gray-50 space-y-3"
          >
            {/* Page Name */}
            <RHFInput
              name="title"
              label="페이지 이름"
              placeholder="페이지 이름"
              size="sm"
            />

            {/* Page Path */}
            <div>
              <RHFInput
                name="path"
                label="URL Path"
                placeholder="/path"
                size="sm"
                disabled={paths.length === 1}
              />
              <p className="text-xs text-gray-500 mt-1">
                반드시 /로 시작해야 합니다
              </p>
            </div>

            <div className="flex justify-end">
              <RHFCheckbox name="isProtected" label="보호 페이지" size="sm" />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                variant="outlined"
                size="sm"
                onClick={onCancel}
                className="flex-1"
              >
                취소
              </Button>
              <Button
                variant="contained"
                size="sm"
                type="submit"
                disabled={form.formState.isSubmitting}
                className="flex-1"
              >
                적용하기
              </Button>
            </div>
          </form>
        </FormProvider>
      </PopoverContent>
    </Popover>
  );
};

export default SettingCurrentPageButton;
