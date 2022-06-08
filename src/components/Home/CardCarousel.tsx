import { useAppSelector } from '@/store';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import FloatingCard from '../Shared/FloatingCard';

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        background: 'transparent',
        zIndex: 12,
        right: '0px',
        height: '100%',
        backgroundColor: 'rgba(255,255,255,.2)',
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        background: 'transparent',
        zIndex: 10,
        left: '0px',
        height: '100%',
        backgroundColor: 'rgba(255,255,255,.2)',
      }}
      onClick={onClick}
    />
  );
}

const CardCarousel = ({ items }: { items: any[] }) => {
  const router = useRouter();
  const sideBarPath = useAppSelector((state) => state.layout.navigation.path);
  const [width, setWidth] = useState(0);
  const [currentHoverId, setCurrentHoverId] = useState('-1');

  useEffect(() => {
    setCurrentHoverId('-1');
  }, [sideBarPath, router.pathname]);

  useEffect(() => {
    const cb = () => {
      const width = Math.max(document.body.getBoundingClientRect().width, 0);
      setWidth(width);
    };

    if (window) {
      // window.addEventListener('resize', cb);
      cb();
    }
    return () => {
      // window.removeEventListener('resize', cb);
    };
  }, []);

  const [settings, setSettings] = useState({
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  });

  useEffect(() => {
    const show = Math.floor((width - 225) / 319.41);
    setSettings((prev) => ({
      ...prev,
      slidesToShow: show,
    }));
  }, [width]);

  const handleGoDetail = (slug: string) => {
    router.push(`/collection/${slug}`);
  };

  return (
    <div className="relative z-[4]">
      <Slider {...settings}>
        {items.map((item, index) => {
          return (
            <div
              key={index}
              id={String(index)}
              className="pl-[0] pr-[12px] h-[176.49px] w-[319.41px]"
              onClick={() => handleGoDetail(item.slug)}
            >
              <FloatingCard
                isFloatRight={index % settings.slidesToShow === 0}
                logo={item.logoSrc}
                currentHoverId={currentHoverId}
                id={String(index)}
                bg={item.splashSrc}
                bgOnHover={item.videoSrc}
                title={item.description}
                categories={item.genre}
                network={'SOL'}
                marketCap={'10000'}
                coinSupply={'100000000000'}
                onPlay={() => handleGoDetail(item.slug)}
                onCardClick={() => handleGoDetail(item.slug)}
                onMouseOver={() => setCurrentHoverId(String(index))}
                onMouseLeave={() => setCurrentHoverId('-1')}
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default CardCarousel;
