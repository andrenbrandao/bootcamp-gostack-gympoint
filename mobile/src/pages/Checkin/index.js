import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';

import CheckinItem from '~/components/CheckinItem';

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

  return (
    <Wrapper>
      <Container>
        <CheckinButton>Novo check-in</CheckinButton>
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

Checkin.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="place" size={20} color={tintColor} />
  ),
};
