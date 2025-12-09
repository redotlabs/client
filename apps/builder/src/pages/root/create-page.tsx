import { useCreatePageVersion } from '@/shared/api/queries/app';
import { Button, toast } from '@redotlabs/ui';
import { Loader } from '@repo/ui';
import { FilePlus } from 'lucide-react';

const CreatePage = () => {
  const createMutation = useCreatePageVersion();

  const onCreate = () => {
    createMutation.mutate(
      {
        status: 'DRAFT',
        remark: '초기 페이지 생성',
        retained: [],
        added: [
          {
            title: '초기 페이지',
            description: '초기 페이지 설명',
            path: '/',
            content: {
              sections: [],
            },
            isProtected: false,
          },
        ],
      },
      {
        onSuccess: () => {
          toast.success('페이지가 성공적으로 생성되었습니다.');
        },
        onError: (error) => {
          toast.error(
            error instanceof Error
              ? error.message
              : '페이지 생성 중 오류가 발생했습니다.'
          );
        },
      }
    );
  };

  return (
    <main className="flex items-center justify-center min-h-svh bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex flex-col items-center gap-8 max-w-md w-full px-6">
        {/* Icon Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-blue-100 rounded-full blur-2xl opacity-50 animate-pulse" />
          <div className="relative bg-white rounded-full p-6 shadow-lg">
            <FilePlus className="w-16 h-16 text-blue-600" />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col items-center gap-3 text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            첫 페이지를 만들어보세요
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            웹사이트 빌더를 시작하려면 초기 페이지를 생성해야 합니다.
            <br />
            아래 버튼을 클릭하여 시작하세요.
          </p>
        </div>

        {/* Action Section */}
        <div className="flex flex-col items-center gap-4 w-full">
          <Button
            onClick={onCreate}
            disabled={createMutation.isPending}
            className="w-full flex items-center justify-center gap-2"
            size="lg"
          >
            {createMutation.isPending ? (
              <Loader className="text-white" />
            ) : (
              <>
                <FilePlus className="w-5 h-5" />
                페이지 생성하기
              </>
            )}
          </Button>

          {/* Helper Text */}
          <p className="text-sm text-gray-500 text-center">
            생성된 페이지는 나중에 수정할 수 있습니다
          </p>
        </div>
      </div>
    </main>
  );
};

export default CreatePage;
