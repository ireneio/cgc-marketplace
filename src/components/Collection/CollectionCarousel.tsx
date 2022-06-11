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
  // const [carouselItems] = useState([
  //   PREFILL_DATA,
  //   // {
  //   //   id: 'store_carousel_example_1',
  //   //   imageUrl: '/img/angrymals-cover.png',
  //   //   name: 'store_carousel_example_1',
  //   //   href: 'https://www.angrymals.io/',
  //   //   logo: '/img/logo_sstars.png',
  //   //   title: 'The metaverses first virtual K-Pop idol.',
  //   //   description:
  //   //     'Sing-to-earn in this exciting rhythm action and karaoke game!',
  //   //   items: 1000,
  //   //   floor: 1.85,
  //   //   vol: 20000,
  //   //   owners: 1500,
  //   // },
  //   // {
  //   //   id: 'store_carousel_example_4',
  //   //   imageUrl: '/img/solchicks_1.png',
  //   //   name: 'store_carousel_example_4',
  //   //   href: 'https://www.solchicks.io/',
  //   //   logo: '/img/sc_logo.png',
  //   //   title: 'Play the Mini Game Now',
  //   //   description:
  //   //     'Collect, breed, and train your own unique SolChicks in a revolutionary gaming ecosystem.',
  //   //   items: 1000,
  //   //   floor: 1.85,
  //   //   vol: 20000,
  //   //   owners: 1500,
  //   // },
  // ]);

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
          ({ id, imageUrl, name, href, description, title, logo }) => {
            return (
              <div
                key={id + dayjs().toISOString()}
                onClick={() => handleCarouselItemClick({ href })}
                className="relative rounded-[5px] h-[70vh]"
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
                <div className="z-[3] absolute bottom-[40%] left-[16px] md:left-[50px] font-bold text-[32px]">
                  <img
                    src={logo}
                    className="h-[100px] w-[400px] bg-transparent aspect-w-1 aspect-h-1 rounded-[5px] overflow-hidden transform transition duration-500 aspect-none hover:cursor-pointer"
                    alt={name}
                  />
                </div>
                <div className="hidden md:block text-left z-[3] absolute bottom-[30%] left-[16px] md:left-[50px] text-[#FFFFFF] text-xl">
                  {description}
                </div>
                <div className="z-[3] absolute bottom-[17.5%] left-[16px] md:left-[50px] text-[#FFFFFF] flex">
                  <Button onClick={() => handlePlay(name)}>Play</Button>
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
