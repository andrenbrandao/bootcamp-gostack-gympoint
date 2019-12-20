import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdChevronLeft, MdCheck } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { format, addMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from 'react-toastify';
import { formatPrice } from '~/utils/format';

import ReactSelect from '~/components/ReactSelect';
import AsyncSelect from '~/components/AsyncSelect';
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

export default function MembershipNew() {
  const [duration, setDuration] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [planOptions, setPlanOptions] = useState([]);

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('/plans');

      setPlanOptions(
        response.data.map(plan => ({ ...plan, id: plan.id, title: plan.title }))
      );
    }

    loadPlans();
  }, []);

  async function handleLoadStudents(inputValue) {
    const response = await api.get('/students', { params: { q: inputValue } });

    const options = response.data.map(student => ({
      ...student,
      id: student.id,
      title: student.name,
    }));

    return options;
  }

  async function handleSubmit({ student_id, plan_id, start_date }) {
    try {
      await api.post('/memberships', {
        student_id,
        plan_id,
        start_date,
      });

      toast.success('Matrícula cadastrada com sucesso');
      history.push('/memberships');
    } catch (err) {
      toast.error('Houve um erro ao cadastrar a matrícula');
    }
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
        <h1>Cadastro de matrícula</h1>

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
            <AsyncSelect
              id="student_id"
              name="student_id"
              label="ALUNO"
              placeholder="Buscar aluno"
              loadOptions={handleLoadStudents}
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
                selected={startDate}
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
