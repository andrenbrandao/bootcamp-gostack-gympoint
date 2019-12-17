import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd, MdCheckCircle } from 'react-icons/md';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import api from '~/services/api';

import { Container, Controls, Content, Table, Button } from './styles';

export default function MembershipList() {
  const [memberships, setMemberships] = useState([]);

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('/memberships');

      const data = response.data.map(membership => ({
        ...membership,
        startDateFormatted: format(
          parseISO(membership.start_date),
          "d 'de' MMMM 'de' yyyy",
          {
            locale: ptBR,
          }
        ),
        endDateFormatted: format(
          parseISO(membership.end_date),
          "d 'de' MMMM 'de' yyyy",
          { locale: ptBR }
        ),
      }));

      setMemberships(data);
    }

    loadPlans();
  }, []);

  async function handleDelete(id) {
    if (window.confirm('Você tem certeza que deseja deletar essa matrícula?')) {
      try {
        await api.delete(`/memberships/${id}`);

        setMemberships(memberships.filter(s => s.id !== id));
        toast.success('Matrícula removida com sucesso');
      } catch (err) {
        console.tron.log(err);
        toast.error('Houve um erro ao remover a matrícula');
      }
    }
  }

  return (
    <Container>
      <header>
        <h1>Gerenciando matrículas</h1>

        <Controls>
          <Button as={Link} to="/memberships/new">
            <MdAdd size={20} color="#fff" />
            CADASTRAR
          </Button>
        </Controls>
      </header>

      <Content>
        <Table>
          <thead>
            <tr>
              <th>ALUNO</th>
              <th>PLANO</th>
              <th>INÍCIO</th>
              <th>TÉRMINO</th>
              <th>ATIVA</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {memberships.map(membership => (
              <tr key={membership.id}>
                <td>{membership.student.name}</td>
                <td>{membership.plan.title}</td>
                <td>{membership.startDateFormatted}</td>
                <td>{membership.endDateFormatted}</td>
                <td>
                  <MdCheckCircle
                    size={20}
                    color={membership.active ? '#42cb59' : '#ddd'}
                  />
                </td>
                <td>
                  <Link to={`/memberships/${membership.id}/edit`}>editar</Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(membership.id)}
                  >
                    apagar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Content>
    </Container>
  );
}
