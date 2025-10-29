import { EditorContext } from '@tiptap/react';
import { useEffect, type PropsWithChildren } from 'react';
import { useEditor, UseEditorOptions } from '@tiptap/react';

// --- Tiptap Core Extensions ---
import { StarterKit } from '@tiptap/starter-kit';
import { Image } from '@tiptap/extension-image';
import { TaskItem, TaskList } from '@tiptap/extension-list';
import { TextAlign } from '@tiptap/extension-text-align';
import { Typography } from '@tiptap/extension-typography';
import { Highlight } from '@tiptap/extension-highlight';
import { Subscript } from '@tiptap/extension-subscript';
import { Superscript } from '@tiptap/extension-superscript';
import { Selection } from '@tiptap/extensions';

// --- Tiptap Node ---
import { ImageUploadNode, HorizontalRule } from '@repo/editor/components';

// --- Lib ---
import { MAX_FILE_SIZE } from '@repo/editor/lib';
import { toast } from '@redotlabs/ui';
import { onEditorImageUpload } from './utils';

export const EditorProvider = ({
  children,
  options,
  initialContent,
  articleId,
}: PropsWithChildren<{
  options?: UseEditorOptions;
  initialContent?: string;
  articleId: number;
}>) => {
  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    editorProps: {
      attributes: {
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off',
        'aria-label': 'Main content area, start typing to enter text.',
        class: 'simple-editor',
      },
    },
    editable: options?.editable ?? true,
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
        link: {
          openOnClick: false,
          enableClickSelection: true,
        },
      }),
      HorizontalRule,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,
      Selection,
      ImageUploadNode.configure({
        accept: 'image/*',
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: onEditorImageUpload(articleId),
        onError: () => toast.error('업로드에 실패했습니다.'),
      }),
    ],
    content: initialContent ?? '',
    ...options,
  });

  useEffect(() => {
    if (initialContent) {
      editor?.commands.setContent(initialContent);
    }
  }, [initialContent, editor]);

  return <EditorContext value={{ editor }}>{children}</EditorContext>;
};
