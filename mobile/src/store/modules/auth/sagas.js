import { takeLatest, call, put, all } from 'redux-saga/effects';

import { Alert } from 'react-native';
import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `students/${id}`);

    const user = response.data;

    yield put(signInSuccess(user));
  } catch (err) {
    Alert.alert(
      'Falha na autenticação',
      'Houve um erro na autenticação, verifique seus dados.',
    );
    yield put(signFailure());
  }
}

export function signOut() {
  console.tron.log('Sign out');
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
