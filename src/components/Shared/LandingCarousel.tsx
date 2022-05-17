import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Button from './Button';

const LandingCarousel = () => {
  const [carouselItems, setCarouselItems] = useState([
    {
      id: 'store_carousel_example_1',
      imageUrl: '/img/angrymals-cover.png',
      name: 'store_carousel_example_1',
      href: 'https://www.angrymals.io/',
      logo: '/img/ss_logo.png',
      title: 'The metaverses first virtual K-Pop idol.',
      description:
        'Sing-to-earn in this exciting rhythm action and karaoke game!',
    },
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
    {
      id: 'store_carousel_example_4',
      imageUrl: '/img/solchicks_1.png',
      name: 'store_carousel_example_4',
      href: 'https://www.solchicks.io/',
      logo: '/img/sc_logo.png',
      title: 'Play the Mini Game Now',
      description:
        'Collect, breed, and train your own unique SolChicks in a revolutionary gaming ecosystem.',
    },
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
            ></div>
          );
        }}
      >
        {carouselItems.map(
          ({ id, imageUrl, name, href, description, title, logo }) => {
            return (
              <div
                key={id}
                onClick={() => handleCarouselItemClick({ href })}
                className="relative"
              >
                <img
                  src={imageUrl}
                  className="w-full min-h-80 bg-[#181818] aspect-w-1 aspect-h-1 rounded-md overflow-hidden transform transition duration-500 hover:cursor-pointer"
                  alt={name}
                />
                <div className="absolute bottom-[45%] left-[50px] font-bold text-[32px]">
                  <img
                    src={logo}
                    className="h-[84px] w-[400px] bg-transparent aspect-w-1 aspect-h-1 rounded-md overflow-hidden transform transition duration-500 lg:aspect-none hover:cursor-pointer"
                    alt={name}
                  />
                </div>
                <div className="absolute bottom-[35%] left-[50px] font-bold text-[32px]">
                  {title}
                </div>
                <div className="absolute bottom-[30%] left-[50px]">
                  {description}
                </div>
                <div className="absolute bottom-[10%] left-[50px]">
                  <Button
                    className="px-[48px]"
                    onClick={() => handlePlay(name)}
                  >
                    Play
                  </Button>
                  <Button
                    link
                    className="ml-[16px] px-[48px]"
                    onClick={() => handleMoreInfo(name)}
                  >
                    More Info
                  </Button>
                </div>
              </div>
            );
          },
        )}
      </Carousel>
    </div>
  );
};

export default LandingCarousel;
