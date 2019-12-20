import styled from 'styled-components';
import AsyncSelect from 'react-select/async';

export const CustomAsyncSelect = styled(AsyncSelect)`
  .react-select-container,
  .react-select__control,
  .react-select__value-container {
    height: 45px;

    input {
      height: auto;
    }
  }
`;
