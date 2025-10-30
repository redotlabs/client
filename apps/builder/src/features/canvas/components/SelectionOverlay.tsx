interface SelectionOverlayProps {
  isSelected: boolean;
}

export const SelectionOverlay = ({ isSelected }: SelectionOverlayProps) => {
  if (!isSelected) return null;

  const Handle = ({
    position,
    cursor,
  }: {
    position: string;
    cursor: string;
  }) => (
    <div
      className={`absolute w-2 h-2 bg-white border-2 border-blue-500 rounded-full ${position} cursor-${cursor}-resize`}
    />
  );

  return (
    <>
      <div className="absolute inset-0 border-2 border-blue-500 pointer-events-none rounded" />
      <Handle position="-top-1 -left-1" cursor="nw" />
      <Handle position="-top-1 -right-1" cursor="ne" />
      <Handle position="-bottom-1 -left-1" cursor="sw" />
      <Handle position="-bottom-1 -right-1" cursor="se" />
      <Handle position="-top-1 left-1/2 -translate-x-1/2" cursor="n" />
      <Handle position="-bottom-1 left-1/2 -translate-x-1/2" cursor="s" />
      <Handle position="-left-1 top-1/2 -translate-y-1/2" cursor="w" />
      <Handle position="-right-1 top-1/2 -translate-y-1/2" cursor="e" />
    </>
  );
};
