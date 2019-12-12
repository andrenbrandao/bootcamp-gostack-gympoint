import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { darken } from 'polished';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
  border: 1px solid #ddd;
`;

export const Content = styled.div`
  height: 64px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;
  }
`;

export const LinkContainer = styled.div`
  padding: 10px 10px 10px 0;

  a {
    color: #999;
    font-size: 15px;
    text-transform: uppercase;
    font-weight: bold;

    & + a {
      margin-left: 20px;
    }

    &:hover {
      color: ${darken(0.1, '#999')};
    }

    &.selected {
      color: #444;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;

  strong {
    color: #666;
  }

  button {
    background: none;
    color: #ee4d64;
    border: none;
    text-align: right;
    margin-top: 5px;

    &:hover {
      color: ${darken(0.1, '#ee4d64')};
    }
  }
`;

export const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  color: #ee4d64;
  text-transform: uppercase;
  font-weight: bold;
  margin-right: 20px;
  padding-right: 20px;
  border-right: 1px solid #ddd;

  img {
    margin-right: 10px;
  }
`;
