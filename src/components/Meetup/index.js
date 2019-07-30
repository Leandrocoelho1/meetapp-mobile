import React, { useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import DeviceInfo from 'react-native-device-info';

import { parseFromTimeZone } from 'date-fns-timezone';
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
  const userTimezone = DeviceInfo.getTimezone();
  const timeZonedDate = parseFromTimeZone(parseISO(date), {
    timeZone: userTimezone
  });
  const formattedDate = useMemo(
    () => format(timeZonedDate, "d' de 'MMMM', às 'k'h'", { locale: pt }),
    [timeZonedDate]
  );

  return (
    <Container>
      <Banner
        source={{
          uri: meetup.banner
            ? meetup.banner.url
            : `https://api.adorable.io/avatar/50/leandro.png`
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
