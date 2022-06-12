import dayjs from 'dayjs';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Button from '../Shared/Button';

interface Item {
  id: string;
  imageUrl: string;
  name: string;
  href: string;
  logo: string;
  title: string;
  description: string;
}

const CollectionCarousel = ({ carouselItems }: { carouselItems: Item[] }) => {
  const handleCarouselItemClick = ({ href }: { href: string }) => {
    console.log(href);
  };

  const handlePlay = (name: string) => {
    console.log('handlePlay', name);
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
        width="100%"
        emulateTouch
        renderIndicator={(onClick, selected) => {
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
              <div
                key={id + dayjs().toISOString()}
                onClick={() => handleCarouselItemClick({ href })}
                className="relative rounded-[5px] h-[50vh] lg:h-[70vh]"
              >
                <div
                  className="absolute w-full h-full z-[2] opacity-[.62] rounded-[5px]"
                  style={{
                    background: `radial-gradient(61.02% 182.1% at 82.63% 36.94%, rgba(253, 32, 142, 0.075) 0%, rgba(167, 16, 124, 0.75) 61.36%, rgba(83, 1, 106, 0.75) 100%)`,
                  }}
                />
                <div className="w-full collection_video">
                  <video muted autoPlay loop className="w-full">
                    <source src={imageUrl} type="video/mp4" />
                  </video>
                </div>
                <div className="bottom-[3rem] absolute left-[50%] translate-x-[-50%] md:translate-x-0 md:left-[32px] z-[3] md:right-[32px] grid grid-cols-1 text-[#FFFFFF]">
                  <div className="max-w-[300px]">
                    <img
                      src={logo}
                      className="bg-contain max-w-[300px] bg-transparent aspect-w-1 aspect-h-1 rounded-[5px] overflow-hidden transform transition duration-500 aspect-none hover:cursor-pointer"
                      alt={name}
                    />
                  </div>
                  <div className="mt-[16px] text-left">
                    {description?.slice(0, 150)}
                  </div>
                  <div className="mt-[16px] text-[#FFFFFF] flex items-start justify-start mr-auto">
                    <Button onClick={() => handlePlay(name)}>Play</Button>
                  </div>
                </div>
              </div>
            );
          },
        )}
      </Carousel>
    </div>
  );
};

export default CollectionCarousel;
