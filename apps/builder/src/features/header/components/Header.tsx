import { Logo } from "@redotlabs/ui";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 z-50 flex items-center justify-between px-4">
      {/* Left Section*/}
      <div className="flex items-center">
        <Logo className="h-8" />
      </div>

      {/* Center Section */}
      <div className="flex items-center gap-2">{/* TODO: Add items */}</div>

      {/* Right Section */}
      <div className="flex items-center gap-2">{/* TODO: Add items */}</div>
    </header>
  );
};
