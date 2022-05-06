import tw from 'twin.macro';
import styled from '@emotion/styled';

export const HeroMarginTop = styled.div`
  margin-top: 30vh;
`;

export const HeroContainer = styled.div`
  ${tw`p-8`}
  height: 90vh;
  background-size: cover !important;
  background-position: center !important;
  ${(props: { background: string }) =>
    `background: url('${props.background}');`}
`;

export const HeroOverlayContainer = styled.div`
  ${tw`h-screen -m-8 p-4`}
  height: 90vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const HeroTitle = styled.h1`
  ${tw`
    text-2xl
    font-bold
    mb-4
    text-white
  `}
`;

export const HeroLogo = styled.img`
  ${tw`
    mb-4
  `}
  height: 10vh;
`;

export const HeroDescription = styled.p`
  ${tw`
    font-medium
    text-lg
    mb-5
    text-white
  `}
  width: 45rem;
  max-width: 80vw;
  line-height: 1.3;
`;

export const HeroButton = styled.button`
  ${tw`
    cursor-pointer
    font-bold
    rounded
    px-8
    py-2
    mr-2
    text-white
  `}
  background-color: rgba(51, 51, 51, 0.5);
  &:hover {
    background-color: #e6e6e6;
    color: black;
    transition: all 0.2s;
  }
`;
