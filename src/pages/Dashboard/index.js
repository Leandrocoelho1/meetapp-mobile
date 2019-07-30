import React, { useState, useMemo, useEffect } from 'react';
import { TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, subDays, addDays } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import Background from '~/components/Background';
import { Container, DateSelector, DateText, MeetupList } from './styles';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';

export default function Dashboard() {
  const [date, setDate] = useState(new Date());
  const [meetups, setMeetups] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [lastPageReached, setLastPageReached] = useState(false);
  const [didMount, setDidMount] = useState(false);

  const formattedDate = useMemo(
    () => format(date, "d ' de ' MMMM", { locale: pt }),
    [date]
  );

  function handleSubDay() {
    setDate(subDays(date, 1));
  }

  function handleAddDay() {
    setDate(addDays(date, 1));
  }

  function handleScroll() {
    if (lastPageReached || loading) return;
    setLoading(true);
    setPage(page + 1);
  }

  useEffect(() => {
    async function loadMore() {
      const response = await api.get('meetups', { params: { date, page } });

      if (response.data.length) {
        setMeetups([...meetups, ...response.data]);
        setLoading(false);
        if (response.data.length < 10) {
          setLastPageReached(true);
        }
      } else {
        setLastPageReached(true);
      }
    }

    if (didMount) {
      loadMore();
    }
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('meetups', { params: { date } });

      setMeetups(response.data);
      setDidMount(true);
      setLastPageReached(false);
      setPage(1);
    }

    loadMeetups();
  }, [date]);

  function renderLoader() {
    if (!loading) return null;

    return <ActivityIndicator size="small" color="#fff" />;
  }

  async function handleSubscription(id) {
    const response = await api.post(`subscriptions/${id}`);
    Alert.alert('Sucesso', 'Você se inscreveu para esse Meetup');

    console.tron.warn(response.data);
  }

  return (
    <Background>
      <Container>
        <Header />

        <DateSelector>
          <TouchableOpacity onPress={handleSubDay}>
            <Icon name="chevron-left" size={30} color="#fff" />
          </TouchableOpacity>
          <DateText>{formattedDate}</DateText>
          <TouchableOpacity onPress={handleAddDay}>
            <Icon name="chevron-right" size={30} color="#fff" />
          </TouchableOpacity>
        </DateSelector>

        {/* { meetups ? } */}

        <MeetupList
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Meetup
              meetup={item}
              onAction={() => handleSubscription(item.id)}
              buttonText="Realizar Inscrição"
            />
          )}
          onEndReached={handleScroll}
          onEndReachedThreshold={0.2}
          ListFooterComponent={renderLoader}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="list" size={20} color={tintColor} />
  )
};
