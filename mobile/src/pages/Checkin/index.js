import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';

import CheckinItem from '~/components/CheckinItem';
import LogoTitle from '~/components/LogoTitle';

import { Wrapper, Container, CheckinButton, List } from './styles';

export default function Checkin() {
  const { id } = useSelector(state => state.user.profile);
  const [checkins, setCheckins] = useState([]);

  useEffect(() => {
    async function loadCheckins() {
      const response = await api.get(`/students/${id}/checkins`);

      setCheckins(response.data);
    }

    loadCheckins();
  }, [id]);

  async function handleCheckin() {
    try {
      const { data } = await api.post(`students/${id}/checkins`);
      console.tron.log([...checkins, data]);
      setCheckins([data, ...checkins]);
    } catch (err) {
      if (err.response.data.error === 'Student already checked in today') {
        Alert.alert('Aluno já fez check-in', 'Você já fez um check-in hoje');
      } else if (
        err.response.data.error === 'Student can only checkin 5 times per week'
      ) {
        Alert.alert(
          'Limite de check-ins atingido',
          'Você só pode efetuar 5 check-ins por semana',
        );
      }
    }
  }

  return (
    <Wrapper>
      <Container>
        <CheckinButton
          onPress={() => {
            handleCheckin();
          }}>
          Novo check-in
        </CheckinButton>
        <List
          data={checkins}
          keyExtractor={item => String(item.id)}
          renderItem={({ item, index }) => (
            <CheckinItem data={item} number={checkins.length - index} />
          )}
        />
      </Container>
    </Wrapper>
  );
}
