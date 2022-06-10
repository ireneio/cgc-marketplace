const Divider = ({ color }: { color?: string }) => {
  return (
    <div
      className={'w-full h-[2px]'}
      style={{ backgroundColor: color ? color : '#290030' }}
    ></div>
  );
};

export default Divider;
