import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import api from '~/services/api';

import { createSubscriptionRequest } from '~/store/modules/subscriptions/actions';

import { format, addDays, subDays } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Background from '~/components/Background';
import Header from '~/components/Header';

import Icon from 'react-native-vector-icons/MaterialIcons';
Icon.loadFont();

import {
  Container,
  Card,
  ImageBanner,
  Title,
  DateTitle,
  DateText,
  SubmitButton,
  Details,
  TextInfo,
  DashboardFlatList,
} from './styles';

export default function Dashboard({ navigation }) {
  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const [meetups, setMeetups] = useState('');

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );
  const dateParamApi = useMemo(
    () => format(date, 'yyyy-MM-dd', { locale: pt }),
    [date]
  );

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('meetups', {
        params: {
          date: dateParamApi,
          page,
        },
      });

      setMeetups(response.data);
    }
    loadMeetups();
  }, [date]);

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  function handleSubscription(id) {
    dispatch(createSubscriptionRequest(id));
    navigation.navigate('Subscriptions');
  }

  return (
    <Background>
      <Header />
      <Container>
        <DateTitle>
          <Icon
            name="chevron-left"
            size={36}
            color="#fff"
            onPress={handlePrevDay}
          />
          <DateText>{dateFormatted}</DateText>
          <Icon
            name="chevron-right"
            size={36}
            color="#fff"
            onPress={handleNextDay}
          />
        </DateTitle>

        <DashboardFlatList
          // horizontal={false}
          data={meetups}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Card>
              <ImageBanner source={{ uri: item.File.url }} />
              <Title>{item.title}</Title>

              <Details>
                <Icon name="event" size={14} color="#999" />
                <TextInfo>{item.date}</TextInfo>
                {/* 24 de Julho, às 20h */}
              </Details>

              <Details>
                <Icon name="place" size={14} color="#999" />
                <TextInfo>{item.location}</TextInfo>
                {/* Rua Guilherme Gembala, 260 */}
              </Details>

              <Details>
                <Icon name="person" size={14} color="#999" />
                <TextInfo>Organizador: {item.User.name}</TextInfo>
              </Details>
              <SubmitButton onPress={() => handleSubscription(item.id)}>
                Realizar inscrição
              </SubmitButton>
            </Card>
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};
