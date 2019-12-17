import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { toast } from 'react-toastify';

import { formatPrice, formatMonth } from '~/utils/format';
import api from '~/services/api';

import { Container, Controls, Content, Table, Button } from './styles';

export default function PlanList() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('/plans');

      const data = response.data.map(plan => ({
        ...plan,
        priceFormatted: formatPrice(plan.price),
        durationFormatted: formatMonth(plan.duration),
      }));

      setPlans(data);
    }

    loadPlans();
  }, []);

  async function handleDelete(id) {
    if (window.confirm('Você tem certeza que deseja deletar esse plano?')) {
      try {
        await api.delete(`/plans/${id}`);

        setPlans(plans.filter(s => s.id !== id));
        toast.success('Plano removido com sucesso');
      } catch (err) {
        console.tron.log(err);
        toast.error('Houve um erro ao remover o plano');
      }
    }
  }

  return (
    <Container>
      <header>
        <h1>Gerenciando planos</h1>

        <Controls>
          <Button as={Link} to="/plans/new">
            <MdAdd size={20} color="#fff" />
            CADASTRAR
          </Button>
        </Controls>
      </header>

      <Content>
        <Table>
          <thead>
            <tr>
              <th>TÍTULO</th>
              <th>DURAÇÃO</th>
              <th>VALOR P/ MÊS</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {plans.map(plan => (
              <tr key={plan.id}>
                <td>{plan.title}</td>
                <td>{plan.durationFormatted}</td>
                <td>{plan.priceFormatted}</td>
                <td>
                  <Link to={`/plans/${plan.id}/edit`}>editar</Link>
                  <button type="button" onClick={() => handleDelete(plan.id)}>
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
