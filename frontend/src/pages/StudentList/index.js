import React from 'react';
import { Link } from 'react-router-dom';
import { MdAdd, MdSearch } from 'react-icons/md';

import {
  Container,
  SearchInput,
  StudentControls,
  Content,
  StudentTable,
} from './styles';

export default function StudentList() {
  return (
    <Container>
      <header>
        <h1>Gerenciando alunos</h1>

        <StudentControls>
          <button type="button">
            <MdAdd size={20} color="#fff" />
            CADASTRAR
          </button>
          <SearchInput>
            <MdSearch size={18} color="#999" />
            <input name="search" placeholder="Buscar aluno" />
          </SearchInput>
        </StudentControls>
      </header>

      <Content>
        <StudentTable>
          <thead>
            <tr>
              <th>NOME</th>
              <th>E-MAIL</th>
              <th>IDADE</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cha Ji-Hun</td>
              <td>example@rocketseat.com.br</td>
              <td>20</td>
              <td>
                <Link to="/#">editar</Link>
                <button type="button">apagar</button>
              </td>
            </tr>
            <tr>
              <td>Cha Ji-Hun</td>
              <td>example@rocketseat.com.br</td>
              <td>20</td>
              <td>
                <Link to="/#">editar</Link>
                <button type="button">apagar</button>
              </td>
            </tr>
            <tr>
              <td>Chomkwan Wattana</td>
              <td>example@rocketseat.com.br</td>
              <td>20</td>
              <td>
                <Link to="/#">editar</Link>
                <button type="button">apagar</button>
              </td>
            </tr>
            <tr>
              <td>Cha Ji-Hun</td>
              <td>example@rocketseat.com.br</td>
              <td>20</td>
              <td>
                <Link to="/#">editar</Link>
                <button type="button">apagar</button>
              </td>
            </tr>
          </tbody>
        </StudentTable>
      </Content>
    </Container>
  );
}
