import React from 'react';
import { testData } from '@/data/test';
import {
  HeroMarginTop,
  HeroButton,
  HeroDescription,
  HeroLogo,
  HeroTitle,
  HeroOverlayContainer,
  HeroContainer,
} from '../Hero/Hero.styles';
import Link from 'next/link';

function LandingHero() {
  return (
    <HeroContainer background={testData.landingHeroBackground}>
      <HeroOverlayContainer>
        <HeroMarginTop />
        <HeroLogo src={testData.landingHeroLogo} />
        <HeroTitle>{testData.landingHeroTitle}</HeroTitle>
        <HeroDescription>{testData.landingHeroSubtitle}</HeroDescription>
        {testData.landingHeroButtons.map((button, i) => (
          <Link href={'/collections/solchicks'} passHref key={i}>
            <HeroButton key={i}>{button.title} </HeroButton>
          </Link>
        ))}
      </HeroOverlayContainer>
    </HeroContainer>
  );
}

export default LandingHero;
