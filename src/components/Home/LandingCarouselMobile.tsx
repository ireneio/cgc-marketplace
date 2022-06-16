import { useGetCollectionsV2 } from '@/hooks/services_collections';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Button from '../Shared/Button';
import CarouselMask from '../Shared/CarouselMask';
import Skeleton from '../Shared/Skeleton';

const LandingCarouselMobile = ({ carouselItems }: { carouselItems: any[] }) => {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const { loading } = useGetCollectionsV2();

  const handlePlay = (href: string) => {
    console.log('handlePlay', name);
    // setOpenFrame(true);
    window.open(href, 'popup');
  };

  const handleMoreInfo = (name: string) => {
    router.push(`/collection/${name}`).then();
  };

  return (
    <div>
      {loading && (
        <div className="relative w-full">
          <Skeleton className="w-full h-[calc(30vh+236px)] bg-[#290030]" />
        </div>
      )}
      {!loading && !carouselItems.length && (
        <div className="relative w-full px-[24px] rounded-[5px] bg-[#290030]">
          <img
            src={'/img/cgc_logo_white.png'}
            alt="cgc logo"
            className="object-contain h-[30vh]"
          />
        </div>
      )}
      {!loading && carouselItems.length && (
        <>
          <Carousel
            ariaLabel="Carousel"
            useKeyboardArrows
            selectedItem={current}
            onChange={(index) => {
              setCurrent(index);
            }}
            swipeable
            stopOnHover
            showStatus={false}
            showArrows={false}
            showIndicators={true}
            showThumbs={false}
            infiniteLoop
            autoPlay
            width="100%"
            emulateTouch
            renderIndicator={(onClick: any, selected: any) => {
              return (
                <div
                  className="w-[80px] h-[5px] rounded-[5px] inline-block mr-[12px] cursor-pointer"
                  style={{ backgroundColor: selected ? '#FFFFFF' : '#26173D' }}
                  onClick={onClick}
                />
              );
            }}
          >
            {carouselItems.map(
              ({ id, imageUrl, name, href, description, logo }) => {
                return (
                  <div key={id} className="relative rounded-[5px]">
                    <CarouselMask />
                    <img
                      src={imageUrl}
                      className="bg-cover w-full h-[30vh] bg-[#181818] aspect-w-1 aspect-h-1 rounded-[5px] overflow-hidden transform transition duration-500 hover:cursor-pointer object-cover"
                      alt={name}
                    />
                  </div>
                );
              },
            )}
          </Carousel>
          <div className="w-full mt-[24px]">
            <div className="mb-[24px]">
              <img
                src={carouselItems[current]?.logo}
                className="h-[60px] max-w-[80vw] object-contain bg-transparent overflow-hidden transform transition duration-500"
                alt={''}
              />
            </div>
            <div className="mb-[24px]">
              <div className="text-[#FFFFFF] font-thin text-[14px] h-[63px] overflow-hidden">
                {carouselItems[current]?.description.slice(0, 150)}
              </div>
            </div>
            <div className="text-[#FFFFFF] flex items-center">
              <Button onClick={() => handlePlay(carouselItems[current]?.href)}>
                Play
              </Button>
              <div className="ml-[16px]">
                <div
                  className="py-[8px] px-[24px] bg-transparent bg-opacity-30 rounded-[5px] cursor-pointer hover:underline"
                  onClick={(e: any) => {
                    e.stopPropagation();
                    handleMoreInfo(carouselItems[current]?.name);
                  }}
                >
                  More Info
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LandingCarouselMobile;
