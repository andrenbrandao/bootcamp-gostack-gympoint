import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

import { Container, Content, Profile, LogoLink, LinkContainer } from './styles';

export default function Header() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <LogoLink to="/">
            <img src={logo} alt="Gympoint" />
            Gympoint
          </LogoLink>

          <LinkContainer>
            <NavLink to="/students" activeClassName="selected">
              Alunos
            </NavLink>
            <NavLink to="/plans" activeClassName="selected">
              Planos
            </NavLink>
            <NavLink to="/memberships" activeClassName="selected">
              Matrículas
            </NavLink>
            <NavLink to="/help-orders" activeClassName="selected">
              Pedidos de Auxílio
            </NavLink>
          </LinkContainer>
        </nav>

        <aside>
          <Profile>
            <strong>{profile.name}</strong>
            <button type="button" onClick={handleSignOut}>
              sair do sistema
            </button>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
