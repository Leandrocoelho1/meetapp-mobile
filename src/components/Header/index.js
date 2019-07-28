import React from 'react';
import styled from 'styled-components/native';

import logo from '~/assets/logo.png';

const Container = styled.View`
  background-color: #000;
  padding: 20px 0;
  align-items: center;
`;

const TopBarLogo = styled.Image.attrs({
  source: logo
})`
  width: 23px;
  height: 24px;
`;

export default function Header() {
  return (
    <Container>
      <TopBarLogo />
    </Container>
  );
}
