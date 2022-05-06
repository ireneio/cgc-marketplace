import tw from 'twin.macro';
import styled from '@emotion/styled';

export const CollectionContainer = styled.div`
  ${tw`
    mt-8
  `}
`;

export const CollectionTitle = styled.h2`
  ${tw`
      text-3xl
      font-bold
      mx-8
      text-white
    `}
`;

export const CollectionRow = styled.div`
  ${tw`
      flex
      overflow-x-auto
      mt-4
      ml-2
      p-4
    `}
  &::-webkit-scrollbar {
    display: none;
  }
`;
