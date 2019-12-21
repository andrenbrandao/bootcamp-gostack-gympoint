import React from 'react';
import { Image } from 'react-native';

import { Container, Form, FormInput, SubmitButton } from './styles';

import logo from '~/assets/logo.png';

export default function SignIn() {
  return (
    <Container>
      <Image source={logo} />

      <Form>
        <FormInput
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="numeric"
          placeholder="Informe seu ID de cadastro"
        />
        <SubmitButton onPress={() => {}}>Entrar no sistema</SubmitButton>
      </Form>
    </Container>
  );
}
