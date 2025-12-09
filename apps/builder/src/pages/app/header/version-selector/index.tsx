import { ChevronDown } from 'lucide-react';
import { usePageVersions } from '@/features/page/quries/page-versions.query';
import { usePageStore } from '@/features/page/store';
import { Button, Popover, PopoverContent, PopoverTrigger } from '@redotlabs/ui';
import VersionButton from './version-button';

const VersionSelector = () => {
  const { selectedVersion } = usePageStore();
  const { data: pageVersions } = usePageVersions();

  const currentVersion = pageVersions?.content?.[selectedVersion];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="text"
          size="sm"
          className="flex items-center gap-2 px-3! py-1.5!"
        >
          <span className="text-sm font-medium">
            {currentVersion
              ? `v${selectedVersion + 1}: ${currentVersion.remark}`
              : '-'}
          </span>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className="w-fit">
        <div className="max-h-64 overflow-y-auto">
          {pageVersions?.content?.map((version, index) => (
            <VersionButton key={version.id} version={version} index={index} />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default VersionSelector;
