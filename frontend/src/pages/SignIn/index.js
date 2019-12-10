import React from 'react';

import verticalLogo from '~/assets/vertical-logo.svg';

// import { Container } from './styles';

export default function SignIn() {
  return (
    <>
      <img src={verticalLogo} alt="Gympoint" />

      <form>
        <label htmlFor="email">
          SEU E-MAIL
          <input type="email" placeholder="exemplo@email.com" />
        </label>

        <label htmlFor="password">
          SUA SENHA
          <input type="password" placeholder="**************" />
        </label>

        <button type="submit">Entrar no sistema</button>
      </form>
    </>
  );
}
