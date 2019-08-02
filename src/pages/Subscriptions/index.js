import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';

import api from '~/services/api';

import Background from '~/components/Background';
import {
  Container,
  MeetupList,
  PlaceholderContainer,
  PlaceholderText
} from './styles';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';

function Subscriptions({ isFocused }) {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('subscriptions');

      setSubscriptions(response.data);
    }

    if (isFocused) {
      loadMeetups();
    }
  }, [isFocused]);

  async function handleCancellation(id) {
    try {
      await api.delete(`subscriptions/${id}`);
      const updatedSubscriptions = [...subscriptions];
      const index = updatedSubscriptions.findIndex(sub => sub.id === id);
      updatedSubscriptions.splice(index, 1);
      setSubscriptions(updatedSubscriptions);
      Alert.alert(
        'Cancelamento Confirmado',
        'Sua inscrição nesse meetup foi cancelada.'
      );
    } catch (err) {
      Alert.alert('Erro', 'Algo deu errado.');
    }
  }

  return (
    <Background>
      <Container>
        <Header />

        {subscriptions.length ? (
          <MeetupList
            data={subscriptions}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Meetup
                meetup={item.meetup}
                onAction={() => handleCancellation(item.id)}
                buttonText="Cancelar Inscrição"
              />
            )}
          />
        ) : (
          <PlaceholderContainer>
            <PlaceholderText>Você não tem inscrições.</PlaceholderText>
          </PlaceholderContainer>
        )}
      </Container>
    </Background>
  );
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  )
};

export default withNavigationFocus(Subscriptions);
