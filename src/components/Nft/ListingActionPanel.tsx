import { NftListingInfo } from '@/pages/nft/listing/[id]';
import { useForm } from 'react-hook-form';
import Button from '../Shared/Button';
import Input from '../Shared/Input';
import Select from '../Shared/Select';
import Tag from '../Shared/Tag';
import DatePicker from 'react-datepicker';
import dayjs from 'dayjs';

import 'react-datepicker/dist/react-datepicker.css';

const maxAuctionEndDate = new Date(dayjs().add(30, 'days').toISOString());

const ListingActionPanel = ({
  info,
  loading,
}: {
  info: NftListingInfo;
  loading: boolean;
}) => {
  const { register, getValues, setValue, watch } = useForm({
    mode: 'onChange',
    defaultValues: {
      price: '',
      option: 'sell',
      startDate: '',
      endDate: '',
    },
  });

  const handleLink = (href: string) => {
    window.open(href, '_blank');
  };

  const isAuction = watch('option') === 'auction';

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
            <Select
              options={[
                { text: 'Sell', value: 'sell' },
                { text: 'Auction', value: 'auction' },
              ]}
              onChange={(val) => setValue('option', val)}
            ></Select>
          </div>
        ) : (
          <></>
        )}
        {!info.is_listed && isAuction && (
          <div className="mt-[24px] text-[#FFFFFF] text-[14px] flex flex-wrap items-center">
            <div>
              <DatePicker
                selected={
                  watch('startDate') === ''
                    ? null
                    : new Date(watch('startDate'))
                }
                placeholderText="Start Date"
                minDate={new Date()}
                maxDate={maxAuctionEndDate}
                showTimeSelect
                onChange={(date: Date) =>
                  setValue('startDate', date.toISOString())
                }
              />
            </div>
            <div className="mt-[24px] basis-[100%] xl:basis-[50%] xl:mt-0 xl:ml-[12px]">
              <DatePicker
                selected={
                  watch('endDate') === '' ? null : new Date(watch('endDate'))
                }
                placeholderText="End Date"
                minDate={new Date()}
                maxDate={maxAuctionEndDate}
                showTimeSelect
                onChange={(date: Date) =>
                  setValue('endDate', date.toISOString())
                }
              />
            </div>
          </div>
        )}
        {!info.is_listed ? (
          <div className="mt-[24px] text-[#FFFFFF] text-[14px] flex items-center">
            <Input
              id="price"
              {...register('price')}
              className="w-[180px]"
              type="number"
              placeholder={isAuction ? 'Floor Price' : 'Price'}
            />
            <div className="mt-[2px] ml-[6px]">
              <img
                src="/img/icon_unit_sol.svg"
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
            <Button
              onClick={() => handleList()}
              disabled={
                loading ||
                !watch('price') ||
                isNaN(Number(watch('price'))) ||
                Number(watch('price')) <= 0 ||
                (isAuction && (!watch('startDate') || !watch('endDate'))) ||
                dayjs(watch('startDate')) > dayjs(watch('endDate'))
              }
            >
              List Now
            </Button>
          </div>
        )}
        <div className="text-[#AAAAAA] mt-[12px]">
          By Proceeding, You agree to our{' '}
          <span
            className="underline cursor-pointer text-[#FFFFFF]"
            onClick={() =>
              handleLink('https://catheongaming.com/terms-of-service')
            }
          >
            Terms
          </span>{' '}
          and{' '}
          <span
            className="underline cursor-pointer text-[#FFFFFF]"
            onClick={() =>
              handleLink('https://catheongaming.com/privacy-policy')
            }
          >
            Privacy
          </span>{' '}
        </div>
      </div>
    </Tag>
  );
};

export default ListingActionPanel;
