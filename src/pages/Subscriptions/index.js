import React from 'react';
import { ScrollView } from 'react-native';

import { hidden } from 'colorette';
import Background from '~/components/Background';
import Header from '~/components/Header';
import {
  Container,
  Card,
  ImageBanner,
  Title,
  Date,
  SubmitButton,
  Details,
} from './styles';

import banner from '~/assets/banner.png';

export default function Subscriptions() {
  return (
    <Background>
      <Header />
      <Container>
        <Date> 21 de outubro </Date>
        <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
          <Card>
            <ImageBanner source={banner} />
            <Title>Meetup de React Native</Title>
            <Details>24 de Julho, às 20h</Details>
            <Details>Rua Guilherme Gembala, 260</Details>
            <Details>Organizador: Diego Fernandes</Details>
            <SubmitButton>Cancelar inscrição</SubmitButton>
          </Card>

          <Card>
            <ImageBanner source={banner} />
            <Title>Meetup de React Native</Title>
            <Details>24 de Julho, às 20h</Details>
            <Details>Rua Guilherme Gembala, 260</Details>
            <Details>Organizador: Diego Fernandes</Details>
            <SubmitButton>Cancelar inscrição</SubmitButton>
          </Card>
        </ScrollView>
      </Container>
    </Background>
  );
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
};
