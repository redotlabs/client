import { User } from '@/shared/types/user';

interface AvatarProps {
  user: User;
}

const Avatar = ({ user }: AvatarProps) => {
  const { name, profileImageUrl } = user;

  return (
    <div className="flex items-center gap-2">
      <img
        src={profileImageUrl ?? ''}
        alt={name}
        className="size-6 rounded-full object-cover"
      />
      <span className="text-sm font-medium">{name}</span>
    </div>
  );
};

export default Avatar;
