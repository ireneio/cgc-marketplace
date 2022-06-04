import { testData } from '@/data/test';
import { useRouter } from 'next/router';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import FloatingCard from '../Shared/FloatingCard';

const PREFILL_DATA = {
  id: 'testData',
  imageUrl: testData.landingHeroBackground,
  name: 'testData',
  href: 'https://seoulstars.io/',
  logo: testData.landingHeroLogo,
  title: testData.landingHeroTitle,
  description: testData.landingHeroSubtitle,
};

const CardCarousel = ({ items }: { items: any[] }) => {
  const router = useRouter();

  const handleCarouselItemClick = ({ href }: { href: string }) => {
    console.log(href);
  };

  const handlePlay = (name: string) => {
    console.log('handePlay', name);
  };

  const handleMoreInfo = (name: string) => {
    console.log('handleMoreInfo', name);
  };

  const handleOnPlay = (id: string | number) => {
    router.push(`/collection/${id}`);
  };

  return (
    <div>
      <Carousel
        ariaLabel="Carousel"
        useKeyboardArrows
        swipeable
        stopOnHover
        showStatus={false}
        showArrows={true}
        showIndicators={false}
        showThumbs={false}
        infiniteLoop
        autoPlay
        // dynamicHeight
        width="100%"
        centerMode
        centerSlidePercentage={15}
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
        {items.map((item, index) => {
          return (
            <div
              key={index}
              // style={{ left: index * (0 + 380) + 'px' }}
              className="h-[450px] flex items-center justify-center bg-transparent "
            >
              <FloatingCard
                bg={item.splashSrc}
                bgOnHover={item.videoSrc}
                title={item.description}
                categories={item.tags}
                network={'SOL'}
                marketCap={'10000'}
                coinSupply={'100000000000'}
                onPlay={() => handleOnPlay(item.id)}
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default CardCarousel;
