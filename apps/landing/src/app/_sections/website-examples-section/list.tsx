import { type ComponentProps } from 'react';
import WebsiteExampleCard from './card';

const WebsiteExampleList = ({
  list,
}: {
  list: ComponentProps<typeof WebsiteExampleCard>[];
}) => {
  return (
    <div className="px-8 flex flex-wrap gap-5">
      {list.map((example, index) => (
        <WebsiteExampleCard key={`${example.title}-${index}`} {...example} />
      ))}
    </div>
  );
};

export default WebsiteExampleList;
