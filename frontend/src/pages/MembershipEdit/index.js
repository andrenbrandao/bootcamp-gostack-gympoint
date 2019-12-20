import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MdChevronLeft, MdCheck } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { format, parseISO, addMonths } from 'date-fns';
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
  Loading,
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

  const [loading, setLoading] = useState(true);
  const [duration, setDuration] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [planOptions, setPlanOptions] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState({});
  const [selectedStudent, setSelectedStudent] = useState({});

  useEffect(() => {
    async function loadMembership() {
      const response = await api.get(`/memberships/${id}`);

      const { plan, student, start_date, end_date } = response.data;
      setSelectedPlan({ ...plan, id: plan.id, title: plan.title });
      setSelectedStudent({
        ...student,
        id: student.id,
        title: student.name,
      });
      const endDateFormatted = format(parseISO(end_date), 'dd/MM/yyyy', {
        locale: ptBR,
      });
      setDuration(plan.duration);
      setStartDate(parseISO(start_date));
      setEndDate(endDateFormatted);
      setTotalPrice(formatPrice(plan.price * plan.duration));
      setLoading(false);
    }

    loadMembership();
  }, [id]);

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('/plans');

      setPlanOptions(
        response.data.map(plan => ({ ...plan, id: plan.id, title: plan.title }))
      );
    }

    loadPlans();
  }, []);

  async function handleSubmit({ student_id, plan_id, start_date }) {
    try {
      await api.put(`/memberships/${id}`, {
        student_id,
        plan_id,
        start_date,
      });

      toast.success('Matrícula atualizada com sucesso');
      history.push('/memberships');
    } catch (err) {
      toast.error('Houve um erro ao atualizar a matrícula');
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

  async function handleLoadStudents(inputValue) {
    const response = await api.get('/students', { params: { q: inputValue } });

    const options = response.data.map(student => ({
      ...student,
      id: student.id,
      title: student.name,
    }));

    return options;
  }

  function handlePlanChange(plan) {
    const { duration: newDuration, price } = plan;
    setSelectedPlan(plan);
    setDuration(newDuration);
    setTotalPrice(formatPrice(price * newDuration));
    updateEndDate(newDuration, startDate);
  }

  function handleStartDateChange(date) {
    setStartDate(date);
    updateEndDate(duration, date);
  }

  function handleStudentChange(student) {
    setSelectedStudent(student);
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
        {loading ? (
          <Loading>Carregando...</Loading>
        ) : (
          <Form id="membershipForm" schema={schema} onSubmit={handleSubmit}>
            <FormGroup>
              <AsyncSelect
                id="student_id"
                name="student_id"
                value={selectedStudent}
                label="ALUNO"
                placeholder="Buscar aluno"
                loadOptions={handleLoadStudents}
                onChange={handleStudentChange}
              />
            </FormGroup>

            <FormRow>
              <FormGroup>
                <ReactSelect
                  id="plan_id"
                  name="plan_id"
                  value={selectedPlan}
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
        )}
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
