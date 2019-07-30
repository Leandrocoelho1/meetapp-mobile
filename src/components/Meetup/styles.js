import styled from 'styled-components/native';

import Button from '../Button';

export const Container = styled.View`
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 20px;
`;

export const Banner = styled.Image.attrs({
  resizeMode: 'cover'
})`
  width: 100%;
  height: 150px;
`;

export const Content = styled.View`
  padding: 20px 18px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
`;

export const Detail = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 6px;
`;

export const DetailText = styled.Text`
  font-size: 13px;
  color: #999;
  margin-left: 10px;
`;

export const ActionButton = styled(Button).attrs(props => ({
  enabled: !props.past
}))`
  margin-top: 5px;
`;
