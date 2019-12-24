import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Item = styled(RectButton)`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 15px 20px;
  margin: 5px 0;
`;

export const HasAnswerText = styled.Text`
  font-weight: bold;
  color: ${props => props.color};
  margin-left: 5px;
`;

export const HelpOrderDate = styled.Text`
  color: #666;
`;

export const Question = styled.Text.attrs({
  numberOfLines: 3,
})`
  margin-top: 15px;
  color: #666;
  line-height: 26px;
  font-size: 14px;
`;

export const HasAnswerGroup = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
