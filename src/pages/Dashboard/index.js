import React, {
  useState,
  useMemo,
  useEffect,
  useReducer,
  useCallback
} from 'react';
import { TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, subDays, addDays } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';
import {
  Container,
  DateSelector,
  DateText,
  MeetupList,
  PlaceholderContainer,
  PlaceholderText
} from './styles';

export default function Dashboard() {
  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastPageReached, setLastPageReached] = useState(false);
  const [meetups, dispatch] = useReducer(meetupReducer, []);

  function meetupReducer(state, action) {
    switch (action.type) {
      case 'fetchMeetups': {
        const newMeetups = [...action.payload];
        return newMeetups;
      }
      case 'fetchMoreMeetups': {
        const newMeetups = [...state, ...action.payload];
        return newMeetups;
      }
      case 'clearMeetups': {
        return [];
      }
      default:
        return state;
    }
  }

  const getInitialMeetups = useCallback(async () => {
    const queryDate = format(date, 'yyyy-MM-dd');
    setUrl(`meetups?date=${queryDate}`);
    const response = await api.get(`meetups?date=${queryDate}`);
    if (response.data.length) {
      dispatch({ type: 'fetchMeetups', payload: response.data });
    }
  }, [date]);

  const getMoreMeetups = useCallback(
    async previousUrl => {
      if (page === 1) return;

      const queryUrl = `${previousUrl}&page=${page}`;
      const response = await api.get(queryUrl);

      if (response.data.length) {
        dispatch({ type: 'fetchMoreMeetups', payload: response.data });
        setLoading(false);
        if (response.data.length < 10) {
          setLastPageReached(true);
        }
      } else {
        setLoading(false);
        setLastPageReached(true);
      }
    },
    [page]
  );

  useEffect(() => {
    getMoreMeetups(url);
  }, [getMoreMeetups, url]);

  useEffect(() => {
    getInitialMeetups();
  }, [getInitialMeetups]);

  const formattedDate = useMemo(
    () => format(date, "d ' de ' MMMM", { locale: pt }),
    [date]
  );

  function handleSubDay() {
    dispatch({ type: 'clearMeetups' });
    setDate(subDays(date, 1));
    setLastPageReached(false);
    setPage(1);
  }

  function handleAddDay() {
    dispatch({ type: 'clearMeetups' });
    setDate(addDays(date, 1));
    setLastPageReached(false);
    setPage(1);
  }

  function handleScroll() {
    if (lastPageReached || loading) return;
    setLoading(true);
    setPage(page + 1);
  }

  function renderLoader() {
    if (!loading) return null;
    return <ActivityIndicator size="small" color="#fff" />;
  }

  async function handleSubscription(id) {
    try {
      await api.post(`subscriptions/${id}`);
      Alert.alert('Sucesso', 'Você se inscreveu para esse Meetup');
    } catch (err) {
      Alert.alert('Erro', 'Algo deu errado.');
    }
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

        {meetups.length ? (
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
        ) : (
          <PlaceholderContainer>
            <PlaceholderText>Nenhum Meetup nessa data.</PlaceholderText>
          </PlaceholderContainer>
        )}
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
