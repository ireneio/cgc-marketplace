import tw from 'twin.macro';
import styled from '@emotion/styled';

export const NavbarContainer = styled.div`
  ${tw`
    flex
    justify-between
    p-4
    fixed
    top-0
    w-full
    transition-all
    z-10
  `}

  ${(props: { dark: any }) =>
    props.dark ? tw`bg-[#141414]` : tw`bg-transparent`}

  img {
    ${tw`
      h-12
    `}
  }
`;
