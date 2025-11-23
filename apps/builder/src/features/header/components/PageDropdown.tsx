import { useState, useRef, useEffect } from "react";
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
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <span className="text-sm font-medium">
          {currentPage?.name || "Page"}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

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
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="text-sm font-medium">{page.name}</span>
                  {currentPageId === page.id && (
                    <svg
                      className="w-4 h-4 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  )}
                </div>
                {pages.length > 1 && (
                  <button
                    onClick={(e) => handlePageDelete(e, page.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-100 text-gray-500 hover:text-red-600 transition-all"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-1" />

          {/* New Page Button */}
          <button
            onClick={handlePageCreate}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            새 페이지 만들기
          </button>

          {/* Divider */}
          <div className="border-t border-gray-200 my-1" />

          {/* Page Settings Toggle */}
          <button
            onClick={handleToggleSettings}
            className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              현재 페이지 설정
            </div>
            <svg
              className={`w-4 h-4 transition-transform ${
                showSettings ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Page Settings Form */}
          {showSettings && currentPage && (
            <div className="px-4 py-3 bg-gray-50 space-y-3">
              {/* Page Name */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  페이지 이름
                </label>
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="페이지 이름"
                />
              </div>

              {/* Page Path */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  URL Path
                </label>
                <input
                  type="text"
                  value={editingPath}
                  onChange={(e) => setEditingPath(e.target.value)}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="/path"
                />
                <p className="text-xs text-gray-500 mt-1">
                  반드시 /로 시작해야 합니다
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={handleCancelSettings}
                  className="flex-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleSaveSettings}
                  className="flex-1 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
                >
                  저장
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
