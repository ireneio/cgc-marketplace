import { NftListingInfo } from '@/pages/nft/listing/[id]';
import { useForm } from 'react-hook-form';
import Button from '../Shared/Button';
import Input from '../Shared/Input';
import Tag from '../Shared/Tag';

const ListingActionPanel = ({
  info,
  loading,
}: {
  info: NftListingInfo;
  loading: boolean;
}) => {
  const { register, getValues } = useForm({
    mode: 'onChange',
    defaultValues: {
      price: '',
    },
  });

  const handleList = () => {
    // TODO
    const price = getValues('price');
  };

  const handleUnlist = () => {
    // TODO
  };

  return (
    <Tag className="px-[24px] py-[24px]">
      <div>
        <div className="text-[18px]">
          {info.is_listed ? 'Listed' : 'Not Listed'}
        </div>
        {!info.is_listed ? (
          <div className="mt-[24px] text-[#FFFFFF] text-[14px] flex items-center">
            <Input id="price" {...register('price')} className="w-[100px]" />
            <div className="mt-[2px] ml-[6px]">
              <img
                src="/img/icon_unit_sol.png"
                alt="sol"
                width={16}
                height={16}
              />
            </div>
          </div>
        ) : (
          <></>
        )}
        {info.is_listed ? (
          <div className="mt-[24px] text-[#FFFFFF] text-[14px] w-[160px]">
            <Button onClick={() => handleUnlist()} disabled={loading}>
              Unlist
            </Button>
          </div>
        ) : (
          <div className="mt-[24px] text-[#FFFFFF] text-[14px] w-[160px]">
            <Button onClick={() => handleList()} disabled={loading}>
              List Now
            </Button>
          </div>
        )}
        <div className="text-[#AAAAAA] mt-[12px]">
          By Proceeding, You agree to our{' '}
          <span className="underline">Terms</span> and{' '}
          <span className="underline">Privacy</span>{' '}
        </div>
      </div>
    </Tag>
  );
};

export default ListingActionPanel;
