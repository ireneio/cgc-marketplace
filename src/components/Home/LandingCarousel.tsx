import { useRouter } from 'next/router';
// import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import Frame from '../Game/frame';
import Button from '../Shared/Button';
import Skeleton from '../Shared/Skeleton';

const LandingCarousel = ({ carouselItems }: { carouselItems: any[] }) => {
  const router = useRouter();
  // const [openFrame, setOpenFrame] = useState(false);

  const handlePlay = (href: string) => {
    console.log('handlePlay', name);
    // setOpenFrame(true);
    window.open(href, 'popup');
  };

  const handleMoreInfo = (name: string) => {
    console.log('name', name);

    router.push(`/collection/${name}`).then();
  };

  return (
    <div>
      {!carouselItems.length && (
        <div className="relative w-full">
          <Skeleton className="w-full h-[50vh] md:h-[80vh]" />
        </div>
      )}
      <Carousel
        ariaLabel="Carousel"
        useKeyboardArrows
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
                <div
                  className="absolute w-full h-[50vh] md:h-[80vh] z-[2] opacity-[.62] rounded-[5px]"
                  style={{
                    background: `radial-gradient(61.02% 182.1% at 82.63% 36.94%, rgba(253, 32, 142, 0.075) 0%, rgba(167, 16, 124, 0.75) 61.36%, rgba(83, 1, 106, 0.75) 100%)`,
                  }}
                />
                <img
                  src={imageUrl}
                  className="bg-cover w-full h-[50vh] md:h-[80vh] bg-[#181818] aspect-w-1 aspect-h-1 rounded-[5px] overflow-hidden transform transition duration-500 hover:cursor-pointer object-cover"
                  alt={name}
                />
                <div className="absolute bottom-[3rem] z-[3] left-[50%] translate-x-[-50%] md:translate-x-0 md:left-[32px] md:right-[32px]">
                  <div className="max-w-[300px]">
                    <img
                      src={logo}
                      className="bg-contain max-w-[300px] bg-transparent aspect-w-1 aspect-h-1 rounded-[5px] overflow-hidden transform transition duration-500 aspect-none hover:cursor-pointer"
                      alt={name}
                    />
                  </div>
                  <div className="mt-[16px] drop-shadow-xl text-[18px] 2xl:text-[18px] text-left text-[#FFFFFF]">
                    {description?.slice(0, 150)}
                  </div>
                  <div className="text-[#FFFFFF] flex mt-[16px]">
                    <Button onClick={() => handlePlay(href)}>Play</Button>
                    <div className="ml-[16px]">
                      <Button
                        link
                        onClick={(e: any) => {
                          e.stopPropagation();
                          handleMoreInfo(name);
                        }}
                      >
                        More Info
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          },
        )}
      </Carousel>
      {/* {openFrame && <Frame />} */}
    </div>
  );
};

export default LandingCarousel;
