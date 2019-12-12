import React from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';

import { Container, SearchInput, StudentControls } from './styles';

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
    </Container>
  );
}
