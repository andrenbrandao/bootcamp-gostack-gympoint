import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MdChevronLeft, MdCheck } from 'react-icons/md';

import api from '~/services/api';

import { Container, Controls, Button } from './styles';

export default function StudentEdit({ match }) {
  const {
    params: { id },
  } = match;

  const [student, setStudent] = useState({});

  useEffect(() => {
    async function loadStudent() {
      const response = await api.get(`/students/${id}`);

      setStudent(response.data);
    }

    loadStudent();
  }, [id]);

  return (
    <Container>
      <header>
        <h1>Edição de aluno</h1>

        <Controls>
          <Button as={Link} to="/students" className="secondary">
            <MdChevronLeft size={20} color="#fff" />
            VOLTAR
          </Button>

          <Button>
            <MdCheck size={20} color="#fff" />
            SALVAR
          </Button>
        </Controls>
      </header>
    </Container>
  );
}

StudentEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
