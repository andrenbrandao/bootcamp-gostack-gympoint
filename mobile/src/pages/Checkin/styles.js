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
