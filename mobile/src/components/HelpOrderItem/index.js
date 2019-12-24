import React, { useMemo } from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { parseISO, formatRelative } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import {
  Item,
  HasAnswerGroup,
  HasAnswerText,
  HelpOrderDate,
  Question,
  Header,
} from './styles';

export default function CheckinItem({ data, navigation }) {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.created_at), new Date(), {
      locale: ptBR,
      addSuffix: true,
    });
  }, [data.created_at]);

  function handleHelpOrderPress() {
    navigation.navigate('HelpOrderDetail', { data });
  }

  return (
    <Item onPress={handleHelpOrderPress}>
      <Header>
        {data.answer ? (
          <HasAnswerGroup>
            <Icon name="check-circle" size={20} color="#42cb59" />
            <HasAnswerText color="#42cb59">Respondido</HasAnswerText>
          </HasAnswerGroup>
        ) : (
          <HasAnswerGroup>
            <Icon name="check-circle" size={20} color="#999" />
            <HasAnswerText color="#999">Sem resposta</HasAnswerText>
          </HasAnswerGroup>
        )}

        <HelpOrderDate>{dateParsed}</HelpOrderDate>
      </Header>
      <Question>{data.question}</Question>
    </Item>
  );
}
