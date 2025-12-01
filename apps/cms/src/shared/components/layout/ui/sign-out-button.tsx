import { useSignOut } from '@/shared/api/queries/auth/sign-in';
import { Button } from '@redotlabs/ui';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@repo/ui';
import { LogOut } from 'lucide-react';
import React from 'react';

const SignOutButton = () => {
  const signOutMutation = useSignOut();

  const onSignOut = () => {
    signOutMutation.mutate();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="text"
          className="w-full p-0 h-fit flex justify-start items-center gap-3 px-4 py-2 text-sm text-gray-700"
          size="sm"
        >
          <LogOut size={16} />
          로그아웃
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">로그아웃</DialogTitle>
          <DialogDescription className="font-medium text-gray-700">
            로그아웃하시겠습니까?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outlined" size="sm">
              취소
            </Button>
          </DialogClose>
          <Button variant="contained" size="sm" onClick={onSignOut}>
            로그아웃
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SignOutButton;
