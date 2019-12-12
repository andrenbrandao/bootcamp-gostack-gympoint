import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background-color: #ee4d64;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;
  background: #fff;
  padding: 40px 25px;
  border-radius: 4px;
  color: #444;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 20px;

    label {
      font-weight: bold;
      text-transform: uppercase;
      text-align: left;
      font-size: 14px;
      margin: 0 0 20px;

      span {
        margin-top: 10px;
        font-size: 11px;
        color: #ee4d64;
      }
    }

    input {
      width: 100%;
      border: 1px solid #ddd;
      border-radius: 4px;
      height: 45px;
      padding: 0 10px;
      display: block;
      margin-top: 5px;
      font-size: 16px;

      &::placeholder {
        color: #999;
      }
    }

    button {
      background: #ee4d64;
      font-weight: bold;
      color: #fff;
      font-size: 16px;
      padding: 13px;
      border: none;
      border-radius: 4px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.08, '#ee4d64')};
      }

      &:disabled {
        cursor: default;
        background: #ee4d64;
        opacity: 0.65;
      }
    }
  }
`;
