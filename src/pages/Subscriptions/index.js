import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Background from '~/components/Background';
import Header from '~/components/Header';

import api from '~/services/api';
import { cancelSubscription } from '~/store/modules/subscriptions/actions';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Card,
  ImageBanner,
  Title,
  SubmitButton,
  Details,
  TextInfo,
  SubscriptionsFlatList,
} from './styles';

export default function Subscriptions() {
  const dispatch = useDispatch();
  const [subscriptions, setSubscriptions] = useState('');

  useEffect(() => {
    async function loadSubscriptions() {
      const response = await api.get('meetups/subscriptions');

      setSubscriptions(response.data);
    }

    loadSubscriptions();
  }, []);

  function handleCancel(id) {
    dispatch(cancelSubscription(id));
  }

  return (
    <Background>
      <Header />
      <Container>
        <SubscriptionsFlatList
          horizontal={false}
          showsVerticalScrollIndicator={false}
          data={subscriptions}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Card>
              <ImageBanner source={{ uri: item.Meetup.File.url }} />

              <Title>{item.title}</Title>

              <Details>
                <Icon name="event" size={14} color="#999" />
                <TextInfo>{item.Meetup.date}</TextInfo>
                {/* <TextInfo>24 de Julho, às 20h</TextInfo> */}
              </Details>

              <Details>
                <Icon name="place" size={14} color="#999" />
                <TextInfo>{item.Meetup.location}</TextInfo>
                {/* <TextInfo>Rua Guilherme Gembala, 260</TextInfo> */}
              </Details>

              <Details>
                <Icon name="person" size={14} color="#999" />
                <TextInfo>Organizador: {item.User.name}</TextInfo>
              </Details>

              <SubmitButton onPress={() => handleCancel(item.id)}>
                Cancelar inscrição
              </SubmitButton>
            </Card>
          )}
        />
      </Container>
    </Background>
  );
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};
