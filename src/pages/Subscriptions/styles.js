import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
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
