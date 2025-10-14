/*
임시 ID 및 메타데이터 생성으로, 추후에 백엔드 연동 작업 시 대체될 로직
*/

export const generateId = (): string => {
  return `block_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
};

export const createDefaultMetadata = () => ({
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});
