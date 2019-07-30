import React, { useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import {
  Container,
  Content,
  Title,
  Detail,
  DetailText,
  ActionButton,
  Banner
} from './styles';

export default function Meetup({ meetup, onAction, buttonText }) {
  const { date } = meetup;
  // const userTimezone = DeviceInfo.getTimezone();
  // const timeZonedDate = utcToZonedTime(date, userTimezone);

  const formattedDate = useMemo(
    () => format(parseISO(date), "d' de 'MMMM', às 'k'h'", { locale: pt }),
    [date]
  );

  return (
    <Container>
      <Banner
        source={{
          uri: meetup.banner
            ? meetup.banner.url
            : `https://api.adorable.io/avatar/50/${data.provider.name}.png`
        }}
      />
      <Content>
        <Title>{meetup.title}</Title>
        <Detail>
          <Icon name="today" size={14} color="#999" />
          <DetailText>{formattedDate}</DetailText>
        </Detail>
        <Detail>
          <Icon name="place" size={14} color="#999" />
          <DetailText>{meetup.location}</DetailText>
        </Detail>
        <Detail>
          <Icon name="person" size={14} color="#999" />
          <DetailText>Organizador: {meetup.user.name}</DetailText>
        </Detail>
        <ActionButton past={meetup.past} onPress={onAction}>
          {meetup.past ? 'Meetup encerrado' : buttonText}
        </ActionButton>
      </Content>
    </Container>
  );
}
