import { testData } from '@/data/test';
import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Button from '../Shared/Button';

const PREFILL_DATA = {
  id: 'testData',
  imageUrl: testData.landingHeroBackground,
  name: 'testData',
  href: 'https://seoulstars.io/',
  logo: testData.landingHeroLogo,
  title: testData.landingHeroTitle,
  description: testData.landingHeroSubtitle,
};

const LandingCarousel = () => {
  const [carouselItems] = useState([
    {
      id: 'store_carousel_example_2',
      imageUrl: '/img/ss_1.webp',
      name: 'store_carousel_example_2',
      href: 'https://seoulstars.io/',
      logo: '/img/ss_logo.png',
      title: 'The metaverses first virtual K-Pop idol.',
      description:
        'Sing-to-earn in this exciting rhythm action and karaoke game!',
    },
    PREFILL_DATA,
    // {
    //   id: 'store_carousel_example_1',
    //   imageUrl: '/img/angrymals-cover.png',
    //   name: 'store_carousel_example_1',
    //   href: 'https://www.angrymals.io/',
    //   logo: '/img/ss_logo.png',
    //   title: 'The metaverses first virtual K-Pop idol.',
    //   description:
    //     'Sing-to-earn in this exciting rhythm action and karaoke game!',
    //   items: 1000,
    //   floor: 1.85,
    //   vol: 20000,
    //   owners: 1500,
    // },
    // {
    //   id: 'store_carousel_example_4',
    //   imageUrl: '/img/solchicks_1.png',
    //   name: 'store_carousel_example_4',
    //   href: 'https://www.solchicks.io/',
    //   logo: '/img/sc_logo.png',
    //   title: 'Play the Mini Game Now',
    //   description:
    //     'Collect, breed, and train your own unique SolChicks in a revolutionary gaming ecosystem.',
    //   items: 1000,
    //   floor: 1.85,
    //   vol: 20000,
    //   owners: 1500,
    // },
  ]);

  const handleCarouselItemClick = ({ href }: { href: string }) => {
    console.log(href);
  };

  const handlePlay = (name: string) => {
    console.log('handePlay', name);
  };

  const handleMoreInfo = (name: string) => {
    console.log('handleMoreInfo', name);
  };

  return (
    <div>
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
        // dynamicHeight
        width="100%"
        // centerMode
        // centerSlidePercentage={_centerSlidePercentage}
        emulateTouch
        renderIndicator={(
          onClick: any,
          selected: any,
          index: any,
          label: any,
        ) => {
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
          ({ id, imageUrl, name, href, description, title, logo }) => {
            return (
              <div
                key={id}
                onClick={() => handleCarouselItemClick({ href })}
                className="relative rounded-[5px]"
              >
                <div
                  className="absolute w-full h-[80vh] z-[2] opacity-[.62] rounded-[5px]"
                  style={{
                    background: `radial-gradient(61.02% 182.1% at 82.63% 36.94%, rgba(253, 32, 142, 0.075) 0%, rgba(167, 16, 124, 0.75) 61.36%, rgba(83, 1, 106, 0.75) 100%)`,
                  }}
                />
                <img
                  src={imageUrl}
                  className="bg-cover w-full h-[80vh] bg-[#181818] aspect-w-1 aspect-h-1 rounded-[5px] overflow-hidden transform transition duration-500 hover:cursor-pointer object-cover"
                  alt={name}
                />
                <div className="z-[3] absolute bottom-[45%] left-[16px] md:left-[50px] font-bold text-[32px]">
                  <img
                    src={logo}
                    className="h-[84px] w-[400px] bg-transparent aspect-w-1 aspect-h-1 rounded-[5px] overflow-hidden transform transition duration-500 aspect-none hover:cursor-pointer"
                    alt={name}
                  />
                </div>
                <div className="text-left z-[3] absolute bottom-[37%] md:bottom-[35%] left-[16px] md:left-[50px] font-bold text-[16px] md:text-[26px] lg:text-[32px] text-[#FFFFFF]">
                  {title}
                </div>
                <div className="hidden md:block text-left z-[3] absolute bottom-[30%] left-[16px] md:left-[50px] text-[#FFFFFF]">
                  {description}
                </div>
                <div className="z-[3] absolute bottom-[10%] left-[16px] md:left-[50px] text-[#FFFFFF] flex">
                  <Button onClick={() => handlePlay(name)}>Play</Button>
                  <div className="ml-[16px]">
                    <Button link onClick={() => handleMoreInfo(name)}>
                      More Info
                    </Button>
                  </div>
                </div>
                {/* <div className="absolute bottom-[10%] right-[50px] flex text-[#FFFFFF]">
                  <div>
                    <div className="font-bold text-[20px]">
                      {getNumberWithUnits(items)}
                    </div>
                    <div className="capitalize text-[12px] font-light">
                      items
                    </div>
                  </div>
                  <div className="ml-[24px] text-[#FFFFFF]">
                    <div className="font-bold text-[20px]">
                      {getNumberWithUnits(owners)}
                    </div>
                    <div className="capitalize text-[12px] font-light">
                      owners
                    </div>
                  </div>
                  <div className="ml-[24px] text-[#FFFFFF]">
                    <div className="font-bold text-[20px] flex items-center">
                      <div>{getNumberWithUnits(floor)}</div>
                      <div className="ml-[8px] flex items-center">
                        <img
                          src={'/img/icon_sol_white.png'}
                          className="h-[10px] w-[10px] bg-transparent aspect-w-1 aspect-h-1 rounded-md overflow-hidden transform transition duration-500 lg:aspect-none hover:cursor-pointer"
                          alt={'solana icon'}
                        />
                      </div>
                    </div>
                    <div className="capitalize text-[12px] font-light">
                      floor price
                    </div>
                  </div>
                  <div className="ml-[24px] text-[#FFFFFF]">
                    <div className="font-bold text-[20px] flex items-center">
                      <div>{getNumberWithUnits(vol)}</div>
                      <div className="ml-[8px] flex items-center">
                        <img
                          src={'/img/icon_sol_white.png'}
                          className="h-[10px] w-[10px] bg-transparent aspect-w-1 aspect-h-1 rounded-md overflow-hidden transform transition duration-500 lg:aspect-none hover:cursor-pointer"
                          alt={'solana icon'}
                        />
                      </div>
                    </div>
                    <div className="capitalize text-[12px] font-light">
                      volume
                    </div>
                  </div>
                </div> */}
              </div>
            );
          },
        )}
      </Carousel>
    </div>
  );
};

export default LandingCarousel;
