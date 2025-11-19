'use client';

import { Button, Checkbox } from '@redotlabs/ui';
import { RHFInput, RHFSelect, RHFTextarea } from '@repo/ui';
import { Mail, Save, Upload, User, Bell, Key } from 'lucide-react';
import { cn } from '@redotlabs/utils';
import { useForm, FormProvider } from 'react-hook-form';

interface GeneralSettingForm {
  name: string;
  email: string;
  bio: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  inquiryNotifications: boolean;
  postNotifications: boolean;
  language: string;
  timezone: string;
}

const GeneralSettingPage = () => {
  const methods = useForm<GeneralSettingForm>({
    defaultValues: {
      name: '홍길동',
      email: 'hong@example.com',
      bio: '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      emailNotifications: true,
      pushNotifications: false,
      inquiryNotifications: true,
      postNotifications: false,
      language: 'ko',
      timezone: 'Asia/Seoul',
    },
  });

  const { handleSubmit, watch, setValue } = methods;
  const bio = watch('bio');

  const onSubmit = (data: GeneralSettingForm) => {
    console.log('Settings saved', data);
    // TODO: API 호출로 설정 저장
  };

  const handlePasswordChange = () => {
    const { newPassword, confirmPassword } = methods.getValues();
    if (newPassword !== confirmPassword) {
      alert('새 비밀번호가 일치하지 않습니다.');
      return;
    }
    console.log('Password changed');
    // TODO: API 호출로 비밀번호 변경
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <main className="p-10 container mx-auto flex-1">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">일반 설정</h1>
            <Button
              type="submit"
              variant="contained"
              className="flex items-center gap-2"
            >
              <Save size={16} />
              저장
            </Button>
          </div>

          {/* 프로필 정보 */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <User size={20} />
              프로필 정보
            </h2>
            <Card>
              <div className="space-y-6">
                <div>
                  <Label>프로필 사진</Label>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                      <User size={32} className="text-gray-400" />
                    </div>
                    <div>
                      <Button
                        variant="outlined"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <Upload size={16} />
                        사진 업로드
                      </Button>
                      <p className="text-xs text-gray-500 mt-2">
                        JPG, PNG 파일 (최대 2MB)
                      </p>
                    </div>
                  </div>
                </div>

                <RHFInput
                  name="name"
                  label="이름"
                  placeholder="이름을 입력하세요"
                />

                <RHFInput
                  label="이메일"
                  startContent={<Mail size={20} className="text-gray-400" />}
                  name="email"
                  type="email"
                  placeholder="email@example.com"
                />

                <div>
                  <RHFTextarea
                    name="bio"
                    label="소개"
                    placeholder="자신을 간단히 소개해주세요"
                    rows={3}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {bio?.length || 0}/200자
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* 비밀번호 변경 */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Key size={20} />
              비밀번호 변경
            </h2>
            <Card>
              <div className="space-y-6">
                <RHFInput
                  name="currentPassword"
                  type="password"
                  label="현재 비밀번호"
                  placeholder="현재 비밀번호를 입력하세요"
                />

                <div>
                  <RHFInput
                    name="newPassword"
                    type="password"
                    label="새 비밀번호"
                    placeholder="새 비밀번호를 입력하세요"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    최소 8자 이상, 영문/숫자/특수문자 포함
                  </p>
                </div>

                <RHFInput
                  name="confirmPassword"
                  type="password"
                  label="새 비밀번호 확인"
                  placeholder="새 비밀번호를 다시 입력하세요"
                />

                <Button
                  variant="outlined"
                  onClick={handlePasswordChange}
                  className="w-full"
                >
                  비밀번호 변경
                </Button>
              </div>
            </Card>
          </div>

          {/* 알림 설정 */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Bell size={20} />
              알림 설정
            </h2>
            <Card>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>이메일 알림</Label>
                    <p className="text-sm text-gray-500 mt-1">
                      중요한 알림을 이메일로 받습니다
                    </p>
                  </div>
                  <Switch
                    checked={watch('emailNotifications')}
                    onCheckedChange={(checked) =>
                      setValue('emailNotifications', checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>푸시 알림</Label>
                    <p className="text-sm text-gray-500 mt-1">
                      브라우저 푸시 알림을 받습니다
                    </p>
                  </div>
                  <Switch
                    checked={watch('pushNotifications')}
                    onCheckedChange={(checked) =>
                      setValue('pushNotifications', checked)
                    }
                  />
                </div>

                <div className="border-t pt-6">
                  <p className="text-sm font-medium mb-4">알림 유형</p>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>새로운 문의</Label>
                        <p className="text-sm text-gray-500 mt-1">
                          새 문의가 등록되면 알림을 받습니다
                        </p>
                      </div>
                      <Switch
                        checked={watch('inquiryNotifications')}
                        onCheckedChange={(checked) =>
                          setValue('inquiryNotifications', checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>게시글 댓글</Label>
                        <p className="text-sm text-gray-500 mt-1">
                          게시글에 댓글이 달리면 알림을 받습니다
                        </p>
                      </div>
                      <Switch
                        checked={watch('postNotifications')}
                        onCheckedChange={(checked) =>
                          setValue('postNotifications', checked)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* 언어 및 시간대 */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">언어 및 지역</h2>
            <Card>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RHFSelect
                  name="language"
                  label="언어"
                  placeholder="언어를 선택하세요"
                  options={[
                    { label: '한국어', value: 'ko' },
                    { label: 'English', value: 'en' },
                    { label: '日本語', value: 'ja' },
                    { label: '中文', value: 'zh' },
                  ]}
                />

                <RHFSelect
                  name="timezone"
                  label="시간대"
                  placeholder="시간대를 선택하세요"
                  options={[
                    { label: '서울 (GMT+9)', value: 'Asia/Seoul' },
                    { label: '뉴욕 (GMT-5)', value: 'America/New_York' },
                    { label: '런던 (GMT+0)', value: 'Europe/London' },
                    { label: '도쿄 (GMT+9)', value: 'Asia/Tokyo' },
                  ]}
                />
              </div>
            </Card>
          </div>

          {/* 하단 저장 버튼 */}
          <div className="mt-8 flex justify-end">
            <Button
              type="submit"
              variant="contained"
              className="flex items-center gap-2"
            >
              <Save size={16} />
              모든 변경사항 저장
            </Button>
          </div>
        </main>
      </form>
    </FormProvider>
  );
};

const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('border border-gray-200 rounded-lg p-6', className)}>
      {children}
    </div>
  );
};

const Label = ({
  children,
  htmlFor,
}: {
  children: React.ReactNode;
  htmlFor?: string;
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-gray-700"
    >
      {children}
    </label>
  );
};

const Switch = ({
  checked,
  onCheckedChange,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) => {
  return (
    <Checkbox
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
    />
  );
};

export default GeneralSettingPage;
