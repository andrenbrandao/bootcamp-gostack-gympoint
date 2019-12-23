import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Wrapper,
  Container,
  CheckinButton,
  List,
  CheckinItem,
  CheckinTitle,
  CheckinDate,
} from './styles';

const data = [
  {
    id: 1,
    title: 'Check-in #1',
    date: 'Hoje às 14h',
  },
  {
    id: 2,
    title: 'Check-in #1',
    date: 'Hoje às 14h',
  },
  {
    id: 3,
    title: 'Check-in #1',
    date: 'Hoje às 14h',
  },
  {
    id: 4,
    title: 'Check-in #1',
    date: 'Hoje às 14h',
  },
  {
    id: 5,
    title: 'Check-in #1',
    date: 'Hoje às 14h',
  },
  {
    id: 6,
    title: 'Check-in #1',
    date: 'Hoje às 14h',
  },
  {
    id: 7,
    title: 'Check-in #1',
    date: 'Hoje às 14h',
  },
  {
    id: 8,
    title: 'Check-in #1',
    date: 'Hoje às 14h',
  },
  {
    id: 9,
    title: 'Check-in #1',
    date: 'Hoje às 14h',
  },
  {
    id: 10,
    title: 'Check-in #1',
    date: 'Hoje às 14h',
  },
  {
    id: 11,
    title: 'Check-in #1',
    date: 'Hoje às 14h',
  },
];

export default function Checkin() {
  return (
    <Wrapper>
      <Container>
        <CheckinButton>Novo check-in</CheckinButton>
        <List
          data={data}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <CheckinItem>
              <CheckinTitle>{item.title}</CheckinTitle>
              <CheckinDate>{item.date}</CheckinDate>
            </CheckinItem>
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
