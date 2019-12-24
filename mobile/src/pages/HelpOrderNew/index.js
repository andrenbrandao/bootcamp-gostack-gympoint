import React, { useEffect, useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';

import { Container, Form, FormInput, SubmitButton } from './styles';

export default function HelpOrderNew({ navigation }) {
  const { id } = useSelector(state => state.user.profile);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    try {
      setLoading(true);

      if (question === '') {
        Alert.alert('Erro ao submeter pedido', 'Insira uma pergunta');
        setLoading(false);
        return;
      }

      await api.post(`/students/${id}/help-orders`, {
        question,
      });

      setLoading(false);
      Alert.alert('Sucesso', 'Pedido de auxílio submetido');
      setQuestion('');
      navigation.navigate('HelpOrder');
    } catch (err) {
      setLoading(false);
      Alert.alert(
        'Erro ao submeter pedido',
        'Não foi possível submeter o pedido de auxílio',
      );
    }
  }

  return (
    <Container>
      <Form>
        <FormInput
          textAlignVertical="top"
          multiline
          placeholder="Inclua seu pedido de auxílio"
          value={question}
          onChangeText={setQuestion}
        />
      </Form>
      <SubmitButton loading={loading} onPress={handleSubmit}>
        Enviar pedido
      </SubmitButton>
    </Container>
  );
}

HelpOrderNew.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('HelpOrder');
      }}>
      <Icon name="chevron-left" size={24} color="#000" />
    </TouchableOpacity>
  ),
});
