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
        display: 'block',
        background: 'transparent',
        zIndex: 10,
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
        display: 'block',
        background: 'transparent',
        zIndex: 10,
      }}
      onClick={onClick}
    />
  );
}

const CardCarousel = ({ items }: { items: any[] }) => {
  const router = useRouter();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (window) {
      const width = Math.max(document.body.getBoundingClientRect().width, 0);
      setWidth(width);
    }
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
    setSettings((prev) => ({
      ...prev,
      slidesToShow: Math.floor((width - 200) / 300),
    }));
  }, [width]);

  const handleOnPlay = (id: string | number) => {
    router.push(`/collection/${id}`);
  };

  return (
    <div>
      <Slider {...settings}>
        {items.map((item, index) => {
          return (
            <div
              key={index}
              id={String(index)}
              className="mr-[12px] w-[350px] h-[235.42px]"
              onClick={() => handleOnPlay(item.id)}
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
                onCardClick={() => handleOnPlay(item.id)}
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default CardCarousel;
