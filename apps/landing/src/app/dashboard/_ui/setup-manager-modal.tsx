'use client';

import { Button, Callout, toast } from '@redotlabs/ui';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  RHFInput,
} from '@repo/ui';
import { Loader2, ShieldCheck, ArrowRight } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateAppManager } from '@/shared/api/queries/app';
import { getCmsUrl } from '@/shared/utils/get-cms-url';

const schema = z
  .object({
    name: z.string().min(1, '이름을 입력해주세요.'),
    email: z
      .string()
      .min(1, '이메일을 입력해주세요.')
      .email('이메일 형식이 올바르지 않습니다.'),
    password: z
      .string()
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
      .regex(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
        '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.'
      ),
    passwordConfirm: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

type FormData = z.infer<typeof schema>;

interface SetupManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  appId: number;
  name: string;
  subdomain: string;
}

export default function SetupManagerModal({
  isOpen,
  onClose,
  appId,
  name,
  subdomain,
}: SetupManagerModalProps) {
  const createMutation = useCreateAppManager();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: FormData) => {
    createMutation.mutate(
      {
        appId,
        name: data.name,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          // 성공 후 CMS로 이동
          window.open(getCmsUrl(subdomain), '_blank');
          onClose();
        },
        onError: (error) => {
          toast.error(error?.message);
        },
      }
    );
  };

  const disabled = !form.formState.isValid || createMutation.isPending;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="size-12 bg-primary-100 rounded-full flex items-center justify-center">
              <ShieldCheck className="size-6 text-primary-600" />
            </div>
          </div>
          <DialogTitle className="text-2xl text-center">
            초기 관리자 설정
          </DialogTitle>
          <DialogDescription className="text-center">
            <strong>{name}</strong> CMS를 사용하기 위한 관리자 계정을 생성하세요
          </DialogDescription>
        </DialogHeader>

        {/* 안내 카드 */}
        <Callout
          color="info"
          className="mb-4"
          icon="ℹ️"
          title="초기 관리자 계정이란?"
          content={
            <ul className="space-y-1.5 text-xs text-blue-700">
              <li className="flex items-start gap-2">
                <ArrowRight size={14} className="mt-0.5 flex-shrink-0" />
                <span>
                  CMS에 접속하여 콘텐츠를 관리할 수 있는 최고 권한 계정
                </span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight size={14} className="mt-0.5 flex-shrink-0" />
                <span>
                  이 계정으로 로그인하여 추가 관리자를 초대할 수 있습니다
                </span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight size={14} className="mt-0.5 flex-shrink-0" />
                <span>생성 후 변경할 수 없으니 신중하게 입력해주세요</span>
              </li>
            </ul>
          }
        />

        {/* 폼 */}
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <RHFInput
                name="name"
                label="관리자 이름"
                type="text"
                placeholder="홍길동"
              />
              <p className="text-xs text-gray-500">
                CMS에서 표시될 이름입니다.
              </p>
            </div>

            <div className="space-y-2">
              <RHFInput
                name="email"
                label="관리자 이메일"
                type="email"
                placeholder="admin@example.com"
              />
              <p className="text-xs text-gray-500">
                CMS 로그인에 사용할 이메일 주소입니다.
              </p>
            </div>

            <div className="space-y-2">
              <RHFInput
                name="password"
                label="비밀번호"
                type="password"
                placeholder="영문, 숫자, 특수문자 포함 8자 이상"
              />
              <p className="text-xs text-gray-500">
                안전한 비밀번호를 설정해주세요.
              </p>
            </div>

            <RHFInput
              name="passwordConfirm"
              label="비밀번호 확인"
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
            />

            {/* 주의사항 */}
            <Callout
              color="warning"
              icon="⚠️"
              title="주의사항"
              content={
                <p className="text-xs text-amber-700">
                  관리자 계정은 한 번만 생성할 수 있으며, 이메일은 변경할 수
                  없습니다. 비밀번호는 CMS에서 변경 가능합니다.
                </p>
              }
            />

            {/* 버튼 */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outlined"
                onClick={onClose}
                disabled={createMutation.isPending}
              >
                나중에
              </Button>
              <Button type="submit" disabled={disabled}>
                {createMutation.isPending ? (
                  <>
                    <Loader2 className="size-5 animate-spin mr-2" />
                    생성 중...
                  </>
                ) : (
                  <>
                    관리자 계정 생성
                    <ArrowRight className="size-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
