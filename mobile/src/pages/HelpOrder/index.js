import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';

import api from '~/services/api';

import HelpOrderItem from '~/components/HelpOrderItem';
import { Wrapper, Container, List, HelpOrderButton } from './styles';

function HelpOrder({ navigation, isFocused }) {
  const { id } = useSelector(state => state.user.profile);
  const [helpOrders, setHelpOrders] = useState([]);

  useEffect(() => {
    async function loadHelpOrders() {
      const response = await api.get(`/students/${id}/help-orders`);

      setHelpOrders(response.data);
    }

    if (isFocused) {
      loadHelpOrders();
    }
  }, [id, isFocused]);

  return (
    <Wrapper>
      <Container>
        <HelpOrderButton
          onPress={() => {
            navigation.navigate('HelpOrderNew');
          }}>
          Novo pedido de auxílio
        </HelpOrderButton>
        <List
          data={helpOrders}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <HelpOrderItem data={item} navigation={navigation} />
          )}
        />
      </Container>
    </Wrapper>
  );
}

export default withNavigationFocus(HelpOrder);
