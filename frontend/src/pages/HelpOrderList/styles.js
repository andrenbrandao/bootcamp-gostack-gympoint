import styled from 'styled-components';
import { darken } from 'polished';
import ReactModal from 'react-modal';

export const Container = styled.div`
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  max-width: 600px;

  header {
    display: flex;
    justify-content: space-between;
  }
`;

export const Content = styled.div`
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  margin-top: 20px;
`;

export const Table = styled.table`
  width: 100%;

  thead th {
    text-align: left;
  }

  tbody td {
    padding: 16px 0;
    border-bottom: 1px solid #eee;
    min-width: 150px;

    &:nth-child(2) {
      text-align: right;
    }

    button {
      background: none;
      color: #4d85ee;
      border: 0;

      &:hover {
        color: ${darken(0.1, '#4d85ee')};
      }
    }
  }

  tbody tr:last-child {
    td {
      border-bottom: none;
    }
  }
`;

export const Modal = styled(ReactModal)`
  position: fixed;
  padding: 20px;
  border-radius: 4px;
  background: #fff;
  width: 400px;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  div {
    display: flex;
    flex-direction: column;

    & + div {
      margin-top: 20px;
    }

    strong {
      margin-bottom: 5px;
    }

    p {
      line-height: 26px;
      color: #666;
    }
  }

  button {
    width: 100%;
    justify-content: center;
    margin-top: 21px;
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

  span {
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

  textarea {
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 4px;
    height: 80px;
    padding: 10px 10px;
    display: block;
    font-size: 16px;
    resize: none;

    &::placeholder {
      color: #999;
    }

    &:disabled {
      background: #f5f5f5;
    }
  }
`;

export const Message = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  font-size: 18px;
  color: #888;
`;
