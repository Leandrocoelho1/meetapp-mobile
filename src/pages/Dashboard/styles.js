import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const DateSelector = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
`;

export const DateText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  margin: 0 15px;
`;

export const PlaceholderContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const PlaceholderText = styled.Text`
  font-size: 18px;
  color: #fff;
`;

export const MeetupList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 20 }
})``;
