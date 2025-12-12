import { useConsultation } from '@/shared/api/queries/consultation';
import { useSearchParams } from 'react-router-dom';
import ConsultantSheet from './consultant-sheet';
import { useDialog } from '@repo/hooks';
import { useCallback, useEffect } from 'react';

/**
 * URL search param (id)로 트리거되는 상담 Sheet
 */
const ConsultationSheetByParamId = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sheet = useDialog();

  const consultationId = (() => {
    const id = searchParams.get('id');
    if (!id) return null;
    const parsedId = +id;
    if (isNaN(parsedId)) return null;
    return parsedId;
  })();

  const { data } = useConsultation(consultationId);

  // url param 지우고 close 로직 추가
  const onOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        setSearchParams((prev) => {
          prev.delete('id');
          return prev;
        });
      }
      sheet.onOpenChange(open);
    },
    [searchParams]
  );

  useEffect(() => {
    if (data) {
      sheet.onOpen();
    }
  }, [data]);

  if (!data) return null;

  return (
    <ConsultantSheet
      consultation={data}
      isOpen={sheet.isOpen}
      onOpenChange={onOpenChange}
    />
  );
};

export default ConsultationSheetByParamId;
