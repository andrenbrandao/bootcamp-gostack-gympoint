import { Platform } from 'react-native';
import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  align-items: center;
  padding: 0 30px;
  background: #f5f5f5;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 20px;
`;

export const FormInput = styled.TextInput`
  margin-bottom: 10px;
  color: #444;
  border: 1px solid #ddd;
  border-radius: 4px;
  height: 300px;
  padding: 10px;
  font-size: 16px;
  background: #fff;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
  align-self: stretch;
`;
