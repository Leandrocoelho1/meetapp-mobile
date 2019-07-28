import React, { forwardRef } from 'react';

import { Container, StyledInput } from './styles';

function Input({ style, ...rest }, ref) {
  return (
    <Container style={style}>
      <StyledInput {...rest} ref={ref} />
    </Container>
  );
}

export default forwardRef(Input);
