import { Logo, Button } from '@redotlabs/ui';
import { Eye } from 'lucide-react';
import { useEditorContext } from '@/context';
import { deselectBlock } from '@/core/actions';
import { PageDropdown } from './PageDropdown';
import { SiteSettingsDropdown } from './SiteSettingsDropdown';

export const Header = () => {
  const { state, dispatch } = useEditorContext();

  const handleHeaderClick = () => {
    dispatch(deselectBlock());
  };

  const handlePreview = () => {
    localStorage.setItem('preview-site-data', JSON.stringify(state.site));

    window.open('/preview', '_blank');
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
        <SiteSettingsDropdown />
      </div>

      {/* Center Section */}
      <div className="flex items-center gap-2">{/* TODO: Add items */}</div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        <Button
          variant="outlined"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            handlePreview();
          }}
          className="flex items-center gap-1.5"
        >
          <Eye className="w-4 h-4" />
          Preview
        </Button>
      </div>
    </header>
  );
};
