import { uploadArticleFile } from '@/shared/api/services/article/detail';
import { MAX_FILE_SIZE } from '@repo/editor/lib';

export const onEditorImageUpload =
  (articleId: number) =>
  async (
    file: File,
    onProgress?: (event: { progress: number }) => void,
    abortSignal?: AbortSignal
  ) => {
    if (!articleId) {
      throw new Error('Article ID is required');
    }

    // Validate file
    if (!file) {
      throw new Error('No file provided');
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new Error(
        `File size exceeds maximum allowed (${MAX_FILE_SIZE / (1024 * 1024)}MB)`
      );
    }

    // Check if upload was cancelled
    if (abortSignal?.aborted) {
      throw new Error('Upload cancelled');
    }

    // Start upload
    onProgress?.({ progress: 0 });

    const formData = new FormData();
    formData.append('file', file);

    try {
      const { url } = await uploadArticleFile({
        articleId,
        formData,
      });

      // Upload complete
      onProgress?.({ progress: 100 });

      return url;
    } catch (error) {
      if (abortSignal?.aborted) {
        throw new Error('Upload cancelled');
      }
      throw error;
    }
  };
