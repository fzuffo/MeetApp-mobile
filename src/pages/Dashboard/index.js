import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import api from '~/services/api';

import { createSubscriptionRequest } from '~/store/modules/subscription/actions';

import { addDays, subDays, format } from 'date-fns';
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
  const [refreshing, setRefreshing] = useState(false);

  const dateTitle = useMemo(() => format(date, "d 'de' MMMM", { locale: pt }), [
    date,
  ]);
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

      const newData = response.data.map(meetup => ({
        ...meetup,
        dateInfo: format(new Date(meetup.date), "dd 'de' MMMM', às 'H'h' ", {
          locale: pt,
        }),
      }));
      setRefreshing(false);
      setMeetups(newData);
    }
    loadMeetups();
  }, [date, refreshing]);

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  function handleSubscription(id) {
    dispatch(createSubscriptionRequest(id));
  }

  function handleRefresh() {
    setRefreshing(true);
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
          <DateText>{dateTitle}</DateText>
          <Icon
            name="chevron-right"
            size={36}
            color="#fff"
            onPress={handleNextDay}
          />
        </DateTitle>

        <DashboardFlatList
          refreshing={refreshing}
          onRefresh={handleRefresh}
          horizontal={false}
          data={meetups}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Card>
              <ImageBanner source={{ uri: item.File.url }} />
              <Title>{item.title}</Title>

              <Details>
                <Icon name="event" size={14} color="#999" />
                <TextInfo>{item.dateInfo}</TextInfo>
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

              {!item.past ? (
                <SubmitButton onPress={() => handleSubscription(item.id)}>
                  Realizar inscrição
                </SubmitButton>
              ) : (
                <SubmitButton past={item.past}>Realizar inscrição</SubmitButton>
              )}
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
