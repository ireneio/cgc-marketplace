import { getBase64 } from '@/utils/imageHelper';
import { useState } from 'react';

const defaultLogo = '/img/cgc_icon.png';

const Avatar = () => {
  const [currentImage, setCurrentImage] = useState<unknown>(defaultLogo);
  const handleFileInput = async (e: any) => {
    if (e.target.files && e.target.files.length) {
      const data = await getBase64(e.target.files[0]);
      setCurrentImage(data);
    }
  };

  return (
    <div
      className="w-[102px] h-[102px] rounded-[50%] flex items-center justify-center"
      style={{
        background: 'linear-gradient(180deg, #F41786 0%, #A713ED 100%)',
      }}
    >
      <input
        type="file"
        name=""
        id="avatar_input"
        className="hidden"
        onChange={(e) => handleFileInput(e)}
      />
      <label
        htmlFor="avatar_input"
        className="cursor-pointer w-[100px] h-[100px] rounded-[50%] flex items-center justify-center bg-[#0C001C]"
      >
        <img src={String(currentImage)} alt="cgc logo" width={52} height={52} />
      </label>
    </div>
  );
};

export default Avatar;
