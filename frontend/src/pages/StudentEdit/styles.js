import styled, { css } from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  margin: 30px 50px;
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    justify-content: space-between;
  }
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;

  a + button {
    margin-left: 15px;
  }
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  background: #ee4d64;
  font-weight: bold;
  color: #fff;
  font-size: 14px;
  padding: 8px 15px;
  border-radius: 4px;
  transition: background 0.2s;
  height: 36px;
  border: none;

  &:hover {
    background: ${darken(0.08, '#ee4d64')};
  }

  &:disabled {
    cursor: default;
    opacity: 0.65;
  }

  svg {
    margin-right: 5px;
  }

  &.secondary {
    background: #ccc;

    &:hover {
      background: ${darken(0.08, '#ccc')};
    }
  }
`;
