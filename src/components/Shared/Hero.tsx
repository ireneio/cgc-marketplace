import React from 'react';

interface HeroProps {
  heroTitle: string;
  heroSubtitle: string;
  heroButtons: any;
  heroBackground: string;
  heroLogo: string;
}

const Hero: React.FC<HeroProps> = ({
  heroTitle,
  heroSubtitle,
  heroButtons,
  heroBackground,
  heroLogo,
}): JSX.Element => {
  return (
    <div className="relative flex items-center h-screen overflow-hidden">
      <div className="absolute bottom-0 bg-gray-100" />
      <div className="w-full">
        <div className="relative h-screen sm:overflow-hidden">
          <div className="absolute inset-0">
            <img
              className="h-full w-full object-cover"
              src={heroBackground}
              alt="hero background"
            />
            <div className="absolute inset-0 bg-black opacity-50" />
          </div>
          <div className="relative h-screen">
            <div className="absolute top-1/2 transform -translate-y-1/2 pl-8">
              <div className="mb-4">
                <img src={heroLogo} alt="hero logo" className="h-16 md:h-24" />
              </div>
              <span className="text-left text-3xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl font-circularstdbold">
                <span className="block text-white">{heroTitle}</span>
              </span>
              <p className="mt-6 max-w-lg text-left text-xl text-gray-300 sm:max-w-3xl font-circularstdbook">
                {heroSubtitle}
              </p>
              <div className="mt-8 max-w-sm sm:max-w-none">
                <div className="space-y-4 sm:space-y-0 sm:inline-grid sm:grid-cols-2 sm:gap-5">
                  {heroButtons.map((button: any, i: number) => (
                    <button
                      key={i}
                      className="flex items-center justify-center px-4 py-3 border border-transparent text-base
                    font-medium rounded-md shadow-sm text-white bg-black bg-opacity-50 hover:bg-gray-100
                    hover:bg-opacity-75 hover:text-black sm:px-8 font-bold font-circularstdbold"
                    >
                      {button.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
