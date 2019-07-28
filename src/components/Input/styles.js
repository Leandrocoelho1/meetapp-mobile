import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0 20px;
  border-radius: 4px;
  height: 50px;
  background: rgba(0, 0, 0, 0.2);
`;

export const StyledInput = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255, 255, 255, 0.5)'
})`
  font-size: 18px;
  color: #fff;
`;
