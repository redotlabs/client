import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  toast,
} from '@redotlabs/ui';
import { Plus } from 'lucide-react';
import { useDialog } from '@repo/hooks';
import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RHFCheckbox, RHFInput } from '@repo/ui';
import { usePageStore } from '@/features/page/store';
import { uuidv4 } from '@repo/utils';

const schema = z.object({
  title: z.string().min(1, '페이지 이름을 입력해주세요.'),
  path: z
    .string()
    .min(1, 'URL Path를 입력해주세요.')
    .regex(/^\//, 'URL Path는 반드시 /로 시작해야 합니다.'),
  isProtected: z.boolean(),
});

const AddPageButton = () => {
  const popover = useDialog();
  const {
    storedPagesMap,
    setStoredPagesMap,
    setStoredContentsMap,
    appendAddedKeys,
  } = usePageStore();

  const paths = Object.values(storedPagesMap).map((page) => page.path);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      path: '',
      isProtected: false,
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    if (paths.includes(data.path)) {
      toast.error('이미 존재하는 URL Path입니다.');
      return;
    }
    const key = uuidv4();
    setStoredPagesMap(key, { key, ...data });
    setStoredContentsMap(key, { sections: [] });
    appendAddedKeys(key);
    popover.onClose();
    form.reset();
  };

  const onCancel = () => {
    form.reset();
    popover.onClose();
  };

  return (
    <Popover open={popover.isOpen} onOpenChange={popover.onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="text"
          size="sm"
          className="w-full! flex items-center justify-between px-4! py-2! text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Plus className="size-4" />새 페이지 만들기
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
                저장
              </Button>
            </div>
          </form>
        </FormProvider>
      </PopoverContent>
    </Popover>
  );
};

export default AddPageButton;
