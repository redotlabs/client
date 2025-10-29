'use client';

import { Editor } from '@/shared/components/ui';

const ContentForm = () => {
  return (
    <section>
      <h2 className="text-lg font-semibold">내용</h2>

      <div className="mt-4 border border-gray-200 rounded-md p-4">
        <Editor />
      </div>
    </section>
  );
};

export default ContentForm;
