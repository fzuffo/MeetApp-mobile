import { Alert } from 'react-native';
import { call, all, takeLatest } from 'redux-saga/effects';

import api from '~/services/api';

function* createSubscription({ id }) {
  try {
    yield call(api.post, `meetups/${id}/subscriptions`);

    Alert.alert('Inscrito no meetup com sucesso.');
  } catch (err) {
    const { error } = err.response.data;
    Alert.alert(error);
  }
}

function* cancelSubscription({ id }) {
  try {
    yield call(api.delete, `meetups/${id}/subscriptions`);

    Alert.alert('Cancelado com sucesso');
  } catch (err) {
    const { error } = err.response.data;
    Alert.alert(error);
  }
}

export default all([
  takeLatest('@subscription/CREATE', createSubscription),
  takeLatest('@subscription/CANCEL', cancelSubscription),
]);
