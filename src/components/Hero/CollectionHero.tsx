import React from 'react';
import { testData } from '@/data/test';
import {
  HeroContainer,
  HeroDescription,
  HeroLogo,
  HeroMarginTop,
  HeroOverlayContainer,
} from '../Hero/Hero.styles';

function CollectionHero() {
  return (
    <HeroContainer background={testData.landingHeroBackground}>
      <HeroOverlayContainer>
        <HeroMarginTop />
        <HeroLogo src={testData.landingHeroLogo} />
        <HeroDescription>{testData.landingHeroSubtitle}</HeroDescription>
        <div className="w-[40%] mt-8">
          <dl className="mt-5 grid grid-cols-1 gap-1 sm:grid-cols-4 text-center">
            {testData.collectionHeroStats.map((collectionHeroStat) => (
              <div
                key={collectionHeroStat.name}
                className="px-4 py-5 bg-gray-900 shadow rounded-lg overflow-hidden sm:p-6"
              >
                <dd className="mt-1 text-3xl font-semibold text-white">
                  {collectionHeroStat.stat}
                </dd>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  {collectionHeroStat.name}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </HeroOverlayContainer>
    </HeroContainer>
  );
}

export default CollectionHero;
