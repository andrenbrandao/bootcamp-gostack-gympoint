import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MdChevronLeft, MdCheck } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { format, addMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from 'react-toastify';
import { formatPrice } from '~/utils/format';

import ReactSelect from '~/components/ReactSelect';
import DatePicker from '~/components/DatePicker';
import history from '~/services/history';
import api from '~/services/api';

import {
  Container,
  Controls,
  Content,
  Button,
  FormGroup,
  FormRow,
} from './styles';

const schema = Yup.object().shape({
  student_id: Yup.number()
    .integer()
    .positive()
    .required('O aluno é obrigatório')
    .typeError('O aluno é obrigatório'),
  plan_id: Yup.number()
    .integer()
    .positive()
    .required('O plano é obrigatório')
    .typeError('O plano é obrigatório'),
  start_date: Yup.date()
    .required('A data de início é obrigatória')
    .typeError('A data de início é obrigatória'),
});

export default function MembershipEdit({ match }) {
  const {
    params: { id },
  } = match;

  const [membership, setMembership] = useState({});
  const [duration, setDuration] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [studentOptions, setStudentOptions] = useState([]);
  const [planOptions, setPlanOptions] = useState([]);

  useEffect(() => {
    async function loadMembership() {
      const response = await api.get(`/memberships/${id}`);

      setMembership(response.data);
    }

    loadMembership();
  }, [id]);

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('/students');

      setStudentOptions(
        response.data.map(student => ({
          ...student,
          id: student.id,
          title: student.name,
        }))
      );
    }

    async function loadPlans() {
      const response = await api.get('/plans');

      setPlanOptions(
        response.data.map(plan => ({ ...plan, id: plan.id, title: plan.title }))
      );
    }

    loadStudents();
    loadPlans();
  }, []);

  async function handleSubmit(data) {
    console.tron.log(data);
  }

  function updateEndDate(months, date) {
    if (date && months > 0) {
      const newDate = addMonths(date, months);
      const dateFormatted = format(newDate, 'dd/MM/yyyy', {
        locale: ptBR,
      });

      setEndDate(dateFormatted);
    }
  }

  function handlePlanChange(plan) {
    const { duration: newDuration, price } = plan;
    setDuration(newDuration);
    setTotalPrice(formatPrice(price * newDuration));
    updateEndDate(newDuration, startDate);
  }

  function handleStartDateChange(date) {
    setStartDate(date);
    updateEndDate(duration, date);
  }

  return (
    <Container>
      <header>
        <h1>Edição de matrícula</h1>

        <Controls>
          <Button as={Link} to="/memberships" className="secondary">
            <MdChevronLeft size={20} color="#fff" />
            VOLTAR
          </Button>

          <Button type="submit" form="membershipForm">
            <MdCheck size={20} color="#fff" />
            SALVAR
          </Button>
        </Controls>
      </header>

      <Content>
        <Form id="membershipForm" schema={schema} onSubmit={handleSubmit}>
          <FormGroup>
            <ReactSelect
              id="student_id"
              name="student_id"
              options={studentOptions}
              label="ALUNO"
              placeholder="Buscar aluno"
            />
          </FormGroup>

          <FormRow>
            <FormGroup>
              <ReactSelect
                id="plan_id"
                name="plan_id"
                options={planOptions}
                label="Plano"
                placeholder="Selecione o plano"
                onChange={handlePlanChange}
              />
            </FormGroup>

            <FormGroup>
              <DatePicker
                id="start_date"
                name="start_date"
                label="DATA DE INÍCIO"
                placeholderText="Escolha a data"
                onChange={handleStartDateChange}
              />
            </FormGroup>

            <FormGroup>
              <Input
                id="endDate"
                name="endDate"
                value={endDate}
                label="DATA DE TÉRMINO"
                disabled
              />
            </FormGroup>

            <FormGroup>
              <Input
                id="totalPrice"
                name="totalPrice"
                value={totalPrice}
                label="VALOR FINAL"
                disabled
              />
            </FormGroup>
          </FormRow>
        </Form>
      </Content>
    </Container>
  );
}

MembershipEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
