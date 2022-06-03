import { CollectionInfo } from '@/pages/launchpad/[id]';
import { getNumberWithCommas } from '@/utils/formatHelper';
import dayjs from 'dayjs';
import { useState } from 'react';
import Divider from '../Shared/Divider';
import Tag from '../Shared/Tag';
import { motion } from 'framer-motion';

const IdoPanel = ({ info }: { info: CollectionInfo }) => {
  const [currentShowIndex, setCurrentShowIndex] = useState(0);

  const handleShowIndex = (val: number) => {
    if (currentShowIndex === val) {
      setCurrentShowIndex(-1);
    } else {
      setCurrentShowIndex(val);
    }
  };

  return (
    <Tag className="mt-[30px] px-[28px] py-[24px]">
      <div>
        <div>
          {info.nextIdoInfo && (
            <div
              className="text-[#FFFFFF] font-bold text-[16px] flex items-center cursor-pointer"
              onClick={() => handleShowIndex(0)}
            >
              <div>IDO COMING SOON:</div>
              <div className="ml-[8px]">
                {dayjs(info.nextTokenSaleStartDate).format('DD MMM YYYY')}-
                {dayjs(info.nextTokenSaleEndDate).format('DD MMM YYYY')}
              </div>
              <div className="ml-auto">
                {currentShowIndex === 0 && (
                  <img
                    src="/img/icon_chevron_up.png"
                    alt="chevron up"
                    width={16}
                    height={16}
                  />
                )}
                {currentShowIndex !== 0 && (
                  <img
                    src="/img/icon_chevron_down.png"
                    alt="chevron down"
                    width={16}
                    height={16}
                  />
                )}
              </div>
            </div>
          )}
          {currentShowIndex === 0 && info.nextIdoInfo && (
            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }}>
              <div className="mt-[14px]">
                <Divider />
              </div>
              <div className="mt-[18px] flex flex-wrap justify-between">
                <div className="text-[#FFFFFF] mb-[20px]">
                  <div className="text-[14px]">Price</div>
                  <div className="mt-[4px] font-bold">
                    ${getNumberWithCommas(info.nextIdoInfo.price)}
                  </div>
                </div>
                <div className="text-[#FFFFFF] mb-[20px]">
                  <div className="text-[14px]">Tokens For Sale</div>
                  <div className="mt-[4px] font-bold">
                    {getNumberWithCommas(info.nextIdoInfo.tokensForSale)}
                  </div>
                </div>
                <div className="text-[#FFFFFF] mb-[20px]">
                  <div className="text-[14px]">Raise</div>
                  <div className="mt-[4px] font-bold">
                    ${getNumberWithCommas(info.nextIdoInfo.raise)}
                  </div>
                </div>
                <div className="text-[#FFFFFF] mb-[20px]">
                  <div className="text-[14px]">Platform</div>
                  <div className="mt-[4px] font-bold flex items-center">
                    <div>
                      <img
                        src={info.nextIdoInfo.platformIcon}
                        alt={info.nextIdoInfo.platform}
                        width={14}
                        height={14}
                      />
                    </div>
                    <div className="ml-[6px]">{info.nextIdoInfo.platform}</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-[#FFFFFF]">
                  <div className="text-[14px]">Lock Up</div>
                  <div className="mt-[4px] font-bold">
                    {info.nextIdoInfo.lockUp}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {info.previousIdos.map((ido, index) => {
            const _idx = index + 1;
            return (
              <div key={index + 1} className="mt-[10px]">
                <div className="mb-[10px]">
                  <Divider />
                </div>
                <div
                  className="text-[#FFFFFF] font-bold text-[16px] flex items-center mb-[10px] cursor-pointer"
                  onClick={() => handleShowIndex(_idx)}
                >
                  <div className="flex">
                    <div className="uppercase">Private/Pre-Sale Ended: </div>
                    <div className="ml-[8px]">
                      {dayjs(ido.startDate).format('DD MMM YYYY')}-
                      {dayjs(ido.endDate).format('DD MMM YYYY')}
                    </div>
                  </div>
                  <div className="ml-auto cursor-pointer">
                    {currentShowIndex === _idx && (
                      <img
                        src="/img/icon_chevron_up.png"
                        alt="chevron up"
                        width={16}
                        height={16}
                      />
                    )}
                    {currentShowIndex !== _idx && (
                      <img
                        src="/img/icon_chevron_down.png"
                        alt="chevron down"
                        width={16}
                        height={16}
                      />
                    )}
                  </div>
                </div>
                {currentShowIndex === _idx && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                  >
                    <div className="mt-[14px]">
                      <Divider />
                    </div>
                    <div className="mt-[18px] flex flex-wrap justify-between">
                      <div className="text-[#FFFFFF] mb-[20px]">
                        <div className="text-[14px]">Price</div>
                        <div className="mt-[4px] font-bold">
                          ${getNumberWithCommas(ido.price)}
                        </div>
                      </div>
                      <div className="text-[#FFFFFF] mb-[20px]">
                        <div className="text-[14px]">Tokens For Sale</div>
                        <div className="mt-[4px] font-bold">
                          {getNumberWithCommas(ido.tokensForSale)}
                        </div>
                      </div>
                      <div className="text-[#FFFFFF] mb-[20px]">
                        <div className="text-[14px]">Raise</div>
                        <div className="mt-[4px] font-bold">
                          ${getNumberWithCommas(ido.raise)}
                        </div>
                      </div>
                      <div className="text-[#FFFFFF] mb-[20px]">
                        <div className="text-[14px]">Platform</div>
                        <div className="mt-[4px] font-bold flex items-center">
                          <div>
                            <img
                              src={ido.platformIcon}
                              alt={ido.platform}
                              width={14}
                              height={14}
                            />
                          </div>
                          <div className="ml-[6px]">{ido.platform}</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-[#FFFFFF]">
                        <div className="text-[14px]">Lock Up</div>
                        <div className="mt-[4px] font-bold">{ido.lockUp}</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Tag>
  );
};

export default IdoPanel;
