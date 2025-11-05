import { useMe, useSignOut } from '@/shared/api/queries/auth';
import { Button } from '@redotlabs/ui';

const Header = () => {
  const { data } = useMe();
  const signOutMutation = useSignOut();

  const onSignOut = () => {
    const ok = confirm('로그아웃하시겠습니까?');
    if (!ok) return;
    signOutMutation.mutate();
  };

  return (
    <header className="h-15 p-4 flex items-center justify-end border-b border-gray-200">
      <div className="flex items-center gap-2">
        <span className="font-medium">{data?.name}</span>
        <Button variant="text" size="sm" onClick={onSignOut}>
          로그아웃
        </Button>
      </div>
    </header>
  );
};

export default Header;
