import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Wrapper = styled.SafeAreaView`
  flex: 1;
  background: #f5f5f5;
`;

export const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

export const CheckinButton = styled(Button)`
  margin-bottom: 15px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingBottom: 20 },
})``;

export const CheckinItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 15px 20px;
  margin: 5px 0;
`;
export const CheckinTitle = styled.Text`
  font-weight: bold;
  color: #444;
`;

export const CheckinDate = styled.Text`
  color: #666;
`;
