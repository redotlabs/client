import { FileText, ChevronDown, Check, X } from 'lucide-react';
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  toast,
} from '@redotlabs/ui';
import { cn } from '@redotlabs/utils';
import {
  usePageStore,
  type PageKey,
  type TempPage,
} from '@/features/page/store';
import SettingCurrentPageButton from './setting-current-page-button';
import AddPageButton from './add-page-button';
import { useEditorContext } from '@repo/builder/editor';
import { useDialog } from '@repo/hooks';

export const PageSelector = () => {
  const { state, isDirty } = useEditorContext();
  const popover = useDialog();

  const {
    currentPageKey,
    storedPagesMap,
    appendAddedKeys,
    setStoredContentsMap,
    setCurrentPageKey,
    removeAddedKeys,
    removeStoredPagesMap,
  } = usePageStore();

  const pages = Object.values(storedPagesMap);
  const currentPage = currentPageKey ? storedPagesMap[currentPageKey] : null;

  const handlePageSelect = (pageKey: PageKey) => {
    // 현재 에디터 state 반영
    if (currentPageKey) {
      // 변경된 경우 addedKeys에 추가
      if (isDirty) {
        appendAddedKeys(currentPageKey);
      }
      setStoredContentsMap(currentPageKey, state.content);
    }
    setCurrentPageKey(pageKey);
    popover.onClose();
  };

  const handlePageDelete = (page: TempPage) => (e: React.MouseEvent) => {
    e.stopPropagation();
    const { key, path } = page;
    if (path === '/') {
      toast.error('기본 페이지는 삭제할 수 없습니다.');
      return;
    }
    if (pages && pages.length <= 1) {
      toast.error('최소 1개의 페이지는 필요합니다.');
      return;
    }

    // TODO: confirm을 Dialog로 변경하거나, 바로 삭제 후 undo 기능 추가
    if (confirm('이 페이지를 삭제하시겠습니까?')) {
      if (currentPageKey === key) {
        setCurrentPageKey(pages[0].key);
      }
      removeAddedKeys(key);
      removeStoredPagesMap(key);
      toast.success('페이지가 삭제되었습니다.');
    }
  };

  return (
    <Popover open={popover.isOpen} onOpenChange={popover.onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="text"
          size="sm"
          className="flex items-center gap-2 px-3! py-1.5!"
        >
          <FileText className="w-4 h-4" />
          <span className="text-sm font-medium">
            {currentPage?.title || 'Page'}
          </span>
          <ChevronDown
            className={cn('w-4 h-4 transition-transform', {
              'rotate-180': popover.isOpen,
            })}
          />
        </Button>
      </PopoverTrigger>

      {/* Dropdown Menu */}
      <PopoverContent align="start">
        {/* <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"> */}
        {/* Page List */}
        <div className="max-h-64 overflow-y-auto">
          {pages?.map((page) => (
            <div
              key={page.key}
              onClick={() => handlePageSelect(page.key)}
              className={cn(
                'group flex items-center justify-between px-4 py-2 cursor-pointer transition-colors',
                {
                  'bg-blue-50 text-blue-700': currentPageKey === page.key,
                  'hover:bg-gray-50 text-gray-700': currentPageKey !== page.key,
                }
              )}
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span className="text-sm font-medium">{page.title}</span>
                {currentPageKey === page.key && (
                  <Check className="w-4 h-4 text-blue-600" />
                )}
              </div>
              {pages.length > 1 && (
                <Button
                  variant="text"
                  size="sm"
                  onClick={handlePageDelete(page)}
                  className="opacity-0 group-hover:opacity-100 p-1! min-w-0! w-auto! h-auto! rounded hover:bg-red-100 text-gray-500 hover:text-red-600 transition-all"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-1" />

        <AddPageButton />

        {/* Divider */}
        <hr className="border-t border-gray-200 my-1" />

        <SettingCurrentPageButton />
      </PopoverContent>
    </Popover>
  );
};
