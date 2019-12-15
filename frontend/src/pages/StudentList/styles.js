import styled from 'styled-components';
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

export const StudentControls = styled.div`
  display: flex;
  align-items: center;
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

export const SearchInput = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 36px;
  background: #fff;
  padding: 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-left: 15px;
  min-width: 235px;

  input {
    height: 100%;
    background: none;
    border: 0;
    color: #444;
    padding-left: 40px;
  }

  svg {
    height: 100%;
    position: absolute;
    top: auto;
    left: 12px;
    pointer-events: none;
  }
`;

export const Content = styled.div`
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  margin-top: 20px;
`;

export const StudentTable = styled.table`
  width: 100%;

  thead th {
    text-align: left;

    &:nth-child(3) {
      text-align: center;
    }
  }

  tbody td {
    padding: 16px 0;
    border-bottom: 1px solid #eee;
    min-width: 150px;

    &:nth-child(3) {
      text-align: center;
      min-width: 0;
      max-width: 100px;
    }

    &:nth-child(4) {
      text-align: right;
    }

    a {
      color: #4d85ee;

      &:hover {
        color: ${darken(0.1, '#4d85ee')};
      }
    }

    button {
      background: none;
      color: #ee4d64;
      border: 0;
      margin-left: 20px;

      &:hover {
        color: ${darken(0.1, '#ee4d64')};
      }
    }
  }

  tbody tr:last-child {
    td {
      border-bottom: none;
    }
  }
`;
