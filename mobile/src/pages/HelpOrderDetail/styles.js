import styled from 'styled-components/native';

export const Wrapper = styled.SafeAreaView`
  flex: 1;
  background: #f5f5f5;
`;

export const Container = styled.View`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 15px 20px;
  margin: 20px;
`;

export const AnswerContainer = styled.View`
  margin-top: 20px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-weight: bold;
  color: #444;
`;

export const HelpOrderText = styled.Text`
  margin-top: 15px;
  color: #666;
  line-height: 26px;
  font-size: 14px;
`;

export const HelpOrderDate = styled.Text`
  color: #666;
`;
