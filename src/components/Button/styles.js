import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  height: 50px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  background: #f94d6a;
`;

export const Text = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
`;
