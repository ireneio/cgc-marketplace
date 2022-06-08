import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const ImageCarousel = ({ images }: { images: string[] }) => {
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
        renderIndicator={(onClick, selected) => {
          return (
            <div
              className="w-[80px] h-[5px] rounded-[5px] inline-block mr-[12px] cursor-pointer"
              style={{ backgroundColor: selected ? '#FFFFFF' : '#26173D' }}
              onClick={onClick}
            ></div>
          );
        }}
      >
        {images.map((item, index) => {
          return (
            <div key={index} className="relative rounded-[5px]">
              <div
                className="absolute w-full h-full z-[2] opacity-[.62] rounded-[5px]"
                style={{
                  background: `radial-gradient(61.02% 182.1% at 82.63% 36.94%, rgba(253, 32, 142, 0.075) 0%, rgba(167, 16, 124, 0.75) 61.36%, rgba(83, 1, 106, 0.75) 100%)`,
                }}
              ></div>
              <img
                src={item}
                className="bg-cover w-full min-h-80 bg-[#181818] aspect-w-1 aspect-h-1 rounded-[5px] overflow-hidden transform transition duration-500 hover:cursor-pointer"
                alt={item}
                width="100%"
              />
              {/* <div className="w-[300px] h-[170px]">
                <video muted width={300} autoPlay>
                  <source src={item} type="video/mp4" />
                </video>
              </div> */}
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
