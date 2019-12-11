import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import logo from '~/assets/logo.svg';

import { Container, Content, Profile, LogoLink, LinkContainer } from './styles';

export default function Header() {
  const profile = useSelector(state => state.user.profile);

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
            <Link to="/">sair do sistema</Link>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
