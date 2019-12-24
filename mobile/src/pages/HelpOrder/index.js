import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';

import HelpOrderItem from '~/components/HelpOrderItem';
import { Wrapper, Container, List, HelpOrderButton } from './styles';

export default function HelpOrder() {
  const { id } = useSelector(state => state.user.profile);
  const [helpOrders, setHelpOrders] = useState([]);

  useEffect(() => {
    async function loadHelpOrders() {
      const response = await api.get(`/students/${id}/help-orders`);

      setHelpOrders(response.data);
    }

    loadHelpOrders();
  }, [id]);

  return (
    <Wrapper>
      <Container>
        <HelpOrderButton onPress={() => {}}>
          Novo pedido de auxílio
        </HelpOrderButton>
        <List
          data={helpOrders}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <HelpOrderItem data={item} />}
        />
      </Container>
    </Wrapper>
  );
}

HelpOrder.navigationOptions = {
  tabBarLabel: 'Pedir ajuda',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="live-help" size={20} color={tintColor} />
  ),
};
