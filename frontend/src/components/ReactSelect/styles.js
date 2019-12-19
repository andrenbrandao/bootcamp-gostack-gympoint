import styled from 'styled-components';
import Select from 'react-select';

export const CustomSelect = styled(Select)`
  .react-select-container,
  .react-select__control,
  .react-select__value-container {
    height: 45px;

    input {
      height: auto;
    }
  }
`;
