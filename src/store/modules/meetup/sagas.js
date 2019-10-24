// import { Alert } from 'react-native';
// import { call, put, all, takeLatest } from 'redux-saga/effects';

// import api from '~/services/api';

// import {
//   meetupSelected,
//   updateMeetupSuccess,
//   createMeetupSuccess,
//   cancelMeetupSuccess,
// } from './actions';

// // import history from '~/services/history';

// function* updateMeetupRequest({ payload }) {
//   try {
//     const {
//       title,
//       description,
//       date,
//       location,
//       file_id,
//     } = payload.data.dataUpdate;

//     const meetupData = payload.data.data;

//     const response = yield call(api.put, `meetups/${meetupData.id}`, {
//       title,
//       description,
//       date,
//       location,
//       file_id,
//     });

//     yield put(updateMeetupSuccess(response.data));
//   } catch (err) {
//     Alert.alert('Falha na atualização dos dados', 'Verifique novamente.');
//   }
// }

// function* updateSuccess({ meetup }) {
//   const response = yield call(api.get, `meetups/${meetup.id}`);

//   yield put(meetupSelected(response.data));
//   Alert.alert('Meetup atualizado com sucesso.');

//   // setTimeout(function() {
//   //   // history.push('/meetup/details');
//   // }, 3800);
// }

// function* createMeetupRequest({ payload }) {
//   try {
//     const { title, description, date, location, file_id } = payload.data;

//     const response = yield call(api.post, `meetups/`, {
//       title,
//       description,
//       date,
//       location,
//       file_id,
//     });

//     yield put(createMeetupSuccess(response.data));
//     Alert.alert('Meetup criado com sucesso.');
//   } catch (err) {
//     Alert.alert(
//       'Falha na atualização dos dados.',
//       'Favor verifique novamente.'
//     );
//   }
// }

// function* createSuccess({ meetup }) {
//   console.tron.log(meetup);
//   const response = yield call(api.get, `meetups/${meetup.id}`);
//   yield put(meetupSelected(response.data));
// }

// function* cancelMeetupRequest({ payload }) {
//   const { id } = payload;

//   try {
//     yield call(api.delete, `meetups/${id}`);
//     // history.push('/dashboard');
//     yield put(cancelMeetupSuccess());
//     Alert.alert('Meetup cancelado com sucesso.');
//   } catch (err) {
//     Alert.alert('Falha ao cancelar', 'verifique novamente.');
//   }
// }

// export default all([
//   takeLatest('@meetup/UPDATE_MEETUP_REQUEST', updateMeetupRequest),
//   takeLatest('@meetup/UPDATE_MEETUP_SUCCESS', updateSuccess),

//   takeLatest('@meetup/CREATE_MEETUP_REQUEST', createMeetupRequest),
//   takeLatest('@meetup/CREATE_MEETUP_SUCCESS', createSuccess),

//   takeLatest('@meetup/CANCEL_MEETUP_REQUEST', cancelMeetupRequest),
// ]);
