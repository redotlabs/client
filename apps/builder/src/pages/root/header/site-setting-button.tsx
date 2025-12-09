import { useState, useRef, useEffect, type ChangeEvent } from 'react';
import { Settings } from 'lucide-react';
import { Button, Input } from '@redotlabs/ui';
import { usePageStore } from '@/features/page/store';

export const SiteSettingButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingName, setEditingName] = useState('');
  const [editingDescription, setEditingDescription] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { currentPageKey, storedPagesMap } = usePageStore();
  const currentPage = currentPageKey ? storedPagesMap[currentPageKey] : null;

  useEffect(() => {
    if (isOpen) {
      setEditingName(currentPage?.title || '');
      setEditingDescription(currentPage?.description || '');
    }
  }, [isOpen, currentPage]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSave = () => {
    if (editingName.trim() === '') {
      alert('사이트 이름은 필수입니다.');
      return;
    }

    // dispatch(
    //   updateSite({
    //     name: editingName.trim(),
    //     description: editingDescription.trim() || undefined,
    //     favicon: editingFavicon.trim() || undefined,
    //   })
    // );

    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="text"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        title="사이트 설정"
        className="w-9! h-9! min-w-0! p-0! flex items-center justify-center"
      >
        <Settings className="w-5 h-5" />
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="px-4 py-3 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-800">사이트 설정</h3>
          </div>

          <div className="px-4 py-3 space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                사이트 이름 *
              </label>
              <Input
                type="text"
                value={editingName}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEditingName(e.target.value)
                }
                placeholder="My Awesome Site"
                size="sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                사이트 설명
              </label>
              <textarea
                value={editingDescription}
                onChange={(e) => setEditingDescription(e.target.value)}
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="사이트에 대한 간단한 설명"
                rows={3}
              />
              <p className="text-xs text-gray-500 mt-1">
                검색 엔진에 표시될 설명입니다 (선택사항)
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                variant="outlined"
                size="sm"
                onClick={handleCancel}
                className="flex-1"
              >
                취소
              </Button>
              <Button
                variant="contained"
                size="sm"
                onClick={handleSave}
                className="flex-1"
              >
                저장
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
