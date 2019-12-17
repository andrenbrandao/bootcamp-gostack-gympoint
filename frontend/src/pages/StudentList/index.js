import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd, MdSearch } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '~/services/api';

import {
  Container,
  SearchInput,
  StudentControls,
  Content,
  StudentTable,
  Button,
} from './styles';

export default function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('/students');

      setStudents(response.data);
    }

    loadStudents();
  }, []);

  async function handleSearch(value) {
    const response = await api.get('/students', { params: { q: value } });

    setStudents(response.data);
  }

  async function handleDelete(id) {
    if (window.confirm('Você tem certeza que deseja deletar esse aluno?')) {
      try {
        await api.delete(`/students/${id}`);

        setStudents(students.filter(s => s.id !== id));
        toast.success('Aluno removido com sucesso');
      } catch (err) {
        console.tron.log(err);
        toast.error('Houve um erro ao remover o aluno');
      }
    }
  }

  return (
    <Container>
      <header>
        <h1>Gerenciando alunos</h1>

        <StudentControls>
          <Button as={Link} to="/students/new">
            <MdAdd size={20} color="#fff" />
            CADASTRAR
          </Button>
          <SearchInput>
            <MdSearch size={18} color="#999" />
            <input
              name="search"
              placeholder="Buscar aluno"
              onChange={e => handleSearch(e.target.value)}
            />
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
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.age}</td>
                <td>
                  <Link to={`/students/${student.id}/edit`}>editar</Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(student.id)}
                  >
                    apagar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </StudentTable>
      </Content>
    </Container>
  );
}
