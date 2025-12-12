import { useUploadAdminProfileImage } from '@/shared/api/queries/admin';
import { Button, toast } from '@redotlabs/ui';
import { useFormContext, useWatch } from 'react-hook-form';
import { Image } from '@/shared/components/ui';
import { User } from 'lucide-react';

const AdminUploadProfileImage = () => {
  const { setValue } = useFormContext();
  const profileImageUrl = useWatch({ name: 'profileImageUrl' });

  const uploadMutation = useUploadAdminProfileImage();

  const onDelete = () => {
    setValue('profileImageUrl', null);
    toast.success(
      '프로필 사진이 삭제되었습니다. 수정하기 버튼을 눌러 정보를 저장해주세요.'
    );
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onUpload(file);
  };

  const onUpload = (file: File) => {
    uploadMutation.mutate(file, {
      onSuccess: ({ imageUrl }) => {
        setValue('profileImageUrl', imageUrl);
        toast.success(
          '프로필 사진이 업로드되었습니다. 수정하기 버튼을 눌러 정보를 저장해주세요.'
        );
      },
      onError: (error) => {
        toast.error(error?.message ?? '프로필 사진 업로드에 실패했습니다.');
      },
    });
  };

  return (
    <div className="flex items-end gap-2">
      <Image
        src={profileImageUrl}
        alt="프로필 사진"
        className="size-20 rounded-full"
        fallback={
          <div className="size-20 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="size-10 text-gray-400" />
          </div>
        }
      />

      {profileImageUrl && (
        <Button size="sm" variant="outlined" onClick={onDelete}>
          삭제
        </Button>
      )}
      <div>
        <Button size="sm" onClick={(e) => e.stopPropagation()}>
          <label htmlFor="profile-image-input" className="cursor-pointer">
            업로드
          </label>
        </Button>
        <input
          type="file"
          className="hidden"
          id="profile-image-input"
          onChange={onChange}
          accept="image/*"
        />
      </div>
    </div>
  );
};

export default AdminUploadProfileImage;
