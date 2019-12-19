import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MdChevronLeft, MdCheck } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import Select from 'react-select';
import { formatPrice } from '~/utils/format';
import NumberFormatInput from '~/components/NumberFormatInput';
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
    .required('O aluno é obrigatório'),
  plan_id: Yup.number()
    .integer()
    .positive()
    .required('O plano é obrigatório'),
  start_date: Yup.date().required('A data de início é obrigatória'),
});

export default function MembershipEdit({ match }) {
  const {
    params: { id },
  } = match;

  const [membership, setMembership] = useState({});
  const [studentOptions, setStudentOptions] = useState({});
  const [planOptions, setPlanOptions] = useState({});
  const [data, setData] = useState({});

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
      const students = response.data;

      setStudentOptions(
        students.map(student => ({ id: student.id, title: student.name }))
      );
    }

    async function loadPlans() {
      const response = await api.get('/plans');
      const plans = response.data;

      setPlanOptions(plans.map(plan => ({ id: plan.id, title: plan.title })));
    }

    loadStudents();
    loadPlans();
  }, []);

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
        <Form id="membershipForm" schema={schema} initialData={data}>
          <FormGroup>
            <ReactSelect
              id="student"
              name="student"
              options={studentOptions}
              label="ALUNO"
              placeholder="Buscar aluno"
              required
            />
          </FormGroup>

          <FormRow>
            <FormGroup>
              <ReactSelect
                id="plan"
                name="plan"
                options={planOptions}
                label="Plano"
                placeholder="Selecione o plano"
                required
              />
            </FormGroup>

            <FormGroup>
              <DatePicker
                id="start_date"
                name="start_date"
                label="DATA DE INÍCIO"
                placeholderText="Escolha a data"
                required
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
