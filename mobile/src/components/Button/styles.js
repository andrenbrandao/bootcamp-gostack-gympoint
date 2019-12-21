import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  background: #ee4d64;
  align-items: center;
  justify-content: center;
  height: 45px;
  padding: 8px 15px;
  border-radius: 4px;
  border: none;
`;

export const Text = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;
