import { Logo } from '@redotlabs/ui';
import { deselectBlock, useEditorContext } from '@repo/builder/editor';
import { PageSelector } from './page-selector';
import { SiteSettingButton } from './site-setting-button';
import PreviewButton from './preview-button';
import PublishButton from './publish-button';
import DraftButton from './draft-button';
import VersionSelector from './version-selector';

export const Header = () => {
  const { dispatch } = useEditorContext();

  const handleHeaderClick = () => {
    dispatch(deselectBlock());
  };

  return (
    <header
      className="sticky top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 flex items-center justify-between p-4"
      onClick={handleHeaderClick}
    >
      {/* Left Section*/}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <Logo.Symbol className="size-8" />
          <span className="font-medium">Builder</span>
        </div>
        <PageSelector />
        <SiteSettingButton />
        <VersionSelector />
      </div>

      {/* Center Section */}
      <div className="flex items-center gap-2">{/* TODO: Add items */}</div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        <PreviewButton />
        <DraftButton />
        <PublishButton />
      </div>
    </header>
  );
};
