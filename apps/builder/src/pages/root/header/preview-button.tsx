import { usePageStore } from '@/features/page/store';
import { Button } from '@redotlabs/ui';
import { useEditorContext } from '@repo/builder/editor';
import { Eye } from 'lucide-react';

export const PreviewButton = () => {
  const { state } = useEditorContext();
  const { currentPageKey, storedPagesMap } = usePageStore();
  const currentPage = currentPageKey ? storedPagesMap[currentPageKey] : null;

  const handlePreview = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    // Default preview behavior
    const payload = {
      ...currentPage,
      content: state.content,
    };
    localStorage.setItem('preview-page-data', JSON.stringify(payload));
    window.open('/builder/preview', '_blank');
  };

  return (
    <Button
      variant="outlined"
      size="sm"
      onClick={handlePreview}
      className="flex items-center gap-1.5"
    >
      <Eye className="w-4 h-4" />
      미리보기
    </Button>
  );
};

export default PreviewButton;
