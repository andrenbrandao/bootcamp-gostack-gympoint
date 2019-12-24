import React, { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { parseISO, formatRelative } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import {
  Wrapper,
  Container,
  HelpOrderText,
  Title,
  HelpOrderDate,
  Header,
  AnswerContainer,
} from './styles';

export default function HelpOrderDetail({ navigation }) {
  const data = navigation.getParam('data', null);
  console.tron.log(data);

  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.created_at), new Date(), {
      locale: ptBR,
      addSuffix: true,
    });
  }, [data.created_at]);

  return (
    <Wrapper>
      <Container>
        <Header>
          <Title>PERGUNTA</Title>
          <HelpOrderDate>{dateParsed}</HelpOrderDate>
        </Header>
        <HelpOrderText>{data.question}</HelpOrderText>
        {data.answer ? (
          <AnswerContainer>
            <Title>RESPOSTA</Title>
            <HelpOrderText>{data.answer}</HelpOrderText>
          </AnswerContainer>
        ) : null}
      </Container>
    </Wrapper>
  );
}

HelpOrderDetail.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('HelpOrder');
      }}>
      <Icon name="chevron-left" size={24} color="#000" />
    </TouchableOpacity>
  ),
});
