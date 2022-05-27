const Avatar = () => {
  return (
    <div
      className="w-[102px] h-[102px] rounded-[50%] flex items-center justify-center"
      style={{
        background: 'linear-gradient(180deg, #F41786 0%, #A713ED 100%)',
      }}
    >
      <div className="w-[100px] h-[100px] rounded-[50%] flex items-center justify-center bg-[#0C001C]">
        <img
          src="/img/cgc-logo-no-text.png"
          alt="cgc logo"
          width={52}
          height={52}
        />
      </div>
    </div>
  );
};

export default Avatar;
