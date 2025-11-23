import { useState, useRef, useEffect, type ChangeEvent } from "react";
import { FileText, ChevronDown, Check, X, Plus, Settings } from "lucide-react";
import { Button, Input } from "@redotlabs/ui";
import { useEditorContext } from "@/app/context/EditorContext";
import { selectPage, createPage, deletePage, updatePage } from "@/core/actions";
import { getAllPages, getCurrentPageId } from "@/core/state/selectors";

export const PageDropdown = () => {
  const { state, dispatch } = useEditorContext();
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [editingName, setEditingName] = useState("");
  const [editingPath, setEditingPath] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const pages = getAllPages(state);
  const currentPageId = getCurrentPageId(state);
  const currentPage = pages.find((p) => p.id === currentPageId);

  // 설정 열 때 현재 값으로 초기화
  useEffect(() => {
    if (showSettings && currentPage) {
      setEditingName(currentPage.name);
      setEditingPath(currentPage.path);
    }
  }, [showSettings, currentPage]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePageSelect = (pageId: string) => {
    dispatch(selectPage(pageId));
    setIsOpen(false);
  };

  const handlePageCreate = () => {
    dispatch(createPage({}));
    setIsOpen(false);
  };

  const handlePageDelete = (e: React.MouseEvent, pageId: string) => {
    e.stopPropagation();
    if (pages.length <= 1) {
      alert("최소 1개의 페이지는 필요합니다.");
      return;
    }
    if (confirm("이 페이지를 삭제하시겠습니까?")) {
      dispatch(deletePage(pageId));
    }
  };

  const handleToggleSettings = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowSettings(!showSettings);
  };

  const handleSaveSettings = () => {
    if (!currentPage) return;

    if (editingName.trim() === "") {
      alert("페이지 이름은 필수입니다.");
      return;
    }

    if (editingPath.trim() === "" || !editingPath.startsWith("/")) {
      alert("Path는 /로 시작해야 합니다.");
      return;
    }

    dispatch(
      updatePage(currentPage.id, {
        name: editingName.trim(),
        path: editingPath.trim(),
      })
    );

    setShowSettings(false);
  };

  const handleCancelSettings = () => {
    setShowSettings(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Page Button */}
      <Button
        variant="text"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3! py-1.5!"
      >
        <FileText className="w-4 h-4" />
        <span className="text-sm font-medium">
          {currentPage?.name || "Page"}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          {/* Page List */}
          <div className="max-h-64 overflow-y-auto">
            {pages.map((page) => (
              <div
                key={page.id}
                onClick={() => handlePageSelect(page.id)}
                className={`
                  group flex items-center justify-between px-4 py-2 cursor-pointer transition-colors
                  ${
                    currentPageId === page.id
                      ? "bg-blue-50 text-blue-700"
                      : "hover:bg-gray-50 text-gray-700"
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span className="text-sm font-medium">{page.name}</span>
                  {currentPageId === page.id && (
                    <Check className="w-4 h-4 text-blue-600" />
                  )}
                </div>
                {pages.length > 1 && (
                  <Button
                    variant="text"
                    size="sm"
                    onClick={(e) => handlePageDelete(e, page.id)}
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

          {/* New Page Button */}
          <Button
            variant="text"
            size="sm"
            onClick={handlePageCreate}
            className="w-full! flex items-center gap-2 px-4! py-2! text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors justify-start!"
          >
            <Plus className="w-4 h-4" />
            새 페이지 만들기
          </Button>

          {/* Divider */}
          <div className="border-t border-gray-200 my-1" />

          {/* Page Settings Toggle */}
          <Button
            variant="text"
            size="sm"
            onClick={handleToggleSettings}
            className="w-full! flex items-center justify-between px-4! py-2! text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              현재 페이지 설정
            </div>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                showSettings ? "rotate-180" : ""
              }`}
            />
          </Button>

          {/* Page Settings Form */}
          {showSettings && currentPage && (
            <div className="px-4 py-3 bg-gray-50 space-y-3">
              {/* Page Name */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  페이지 이름
                </label>
                <Input
                  type="text"
                  value={editingName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEditingName(e.target.value)
                  }
                  placeholder="페이지 이름"
                  size="sm"
                />
              </div>

              {/* Page Path */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  URL Path
                </label>
                <Input
                  type="text"
                  value={editingPath}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEditingPath(e.target.value)
                  }
                  placeholder="/path"
                  size="sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  반드시 /로 시작해야 합니다
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  variant="outlined"
                  size="sm"
                  onClick={handleCancelSettings}
                  className="flex-1"
                >
                  취소
                </Button>
                <Button
                  variant="contained"
                  size="sm"
                  onClick={handleSaveSettings}
                  className="flex-1"
                >
                  저장
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
