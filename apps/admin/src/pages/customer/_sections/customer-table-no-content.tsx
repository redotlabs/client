import { UnderConstruction } from '@repo/assets';

const CustomerTableNoContent = () => {
  return (
    <div className="min-h-96 flex flex-col items-center justify-center">
      <UnderConstruction className="w-[120px] h-auto" />

      <h1 className="text-center flex flex-col gap-2 text-gray-500">
        <span className="text-lg font-medium">고객이 없습니다.</span>
      </h1>
    </div>
  );
};

export default CustomerTableNoContent;
