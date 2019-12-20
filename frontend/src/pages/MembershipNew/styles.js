import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  max-width: 800px;

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

export const Content = styled.div`
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  margin-top: 20px;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
  }
`;

export const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;

  > div + div {
    margin-left: 10px;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  flex: 1;

  label {
    font-weight: bold;
    text-transform: uppercase;
    text-align: left;
    font-size: 14px;
    margin-bottom: 5px;
    flex: 1;
  }

  > span {
    font-weight: bold;
    text-transform: uppercase;
    margin-top: 10px;
    font-size: 11px;
    color: #ee4d64;
  }

  input {
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 4px;
    height: 45px;
    padding: 0 10px;
    display: block;
    font-size: 16px;

    &::placeholder {
      color: #999;
    }

    &:disabled {
      background: #f5f5f5;
    }
  }
`;

export const Loading = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  font-size: 18px;
  color: #888;
`;
