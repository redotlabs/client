import { Logo } from "@redotlabs/ui";
import { useEditorContext } from "@/app/context/EditorContext";
import { deselectBlock } from "@/core/actions";
import { PageDropdown } from "./PageDropdown";

export const Header = () => {
  const { dispatch } = useEditorContext();

  const handleHeaderClick = () => {
    dispatch(deselectBlock());
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 z-50 flex items-center justify-between px-4"
      onClick={handleHeaderClick}
    >
      {/* Left Section*/}
      <div className="flex items-center gap-2">
        <Logo className="h-8" />
        <PageDropdown />
      </div>

      {/* Center Section */}
      <div className="flex items-center gap-2">{/* TODO: Add items */}</div>

      {/* Right Section */}
      <div className="flex items-center gap-2">{/* TODO: Add items */}</div>
    </header>
  );
};
