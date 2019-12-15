import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MdChevronLeft, MdCheck } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import NumberFormatInput from '~/components/NumberFormatInput';
import history from '~/services/history';
import api from '~/services/api';

import { Container, Controls, Content, Button } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  age: Yup.number()
    .integer()
    .positive('Insira uma idade válida')
    .required('A idade é obrigatória')
    .typeError('Insira uma idade válida'),
  weight: Yup.number()
    .positive('Insira um peso válido')
    .required('O peso é obrigatório'),
  height: Yup.number()
    .positive('Insira uma altura válida')
    .required('A altura é obrigatória'),
});

export default function StudentEdit({ match }) {
  const {
    params: { id },
  } = match;

  const [student, setStudent] = useState({});
  const [initialData, setInitialData] = useState({});

  useEffect(() => {
    async function loadStudent() {
      const response = await api.get(`/students/${id}`);

      setStudent(response.data);
    }

    loadStudent();
  }, [id]);

  useEffect(() => {
    const { name, email, age, weight, height } = student;

    setInitialData({
      name,
      email,
      age,
      weight,
      height,
    });
  }, [student]);

  async function handleSubmit({ name, email, age, weight, height }) {
    try {
      await api.put(`/students/${id}`, {
        name,
        email,
        age,
        weight,
        height,
      });

      toast.success('Aluno atualizado com sucesso');
      history.push('/students');
    } catch (err) {
      toast.error('Houve um erro ao atualizar o aluno');
    }
  }

  return (
    <Container>
      <header>
        <h1>Edição de aluno</h1>

        <Controls>
          <Button as={Link} to="/students" className="secondary">
            <MdChevronLeft size={20} color="#fff" />
            VOLTAR
          </Button>

          <Button type="submit" form="studentForm">
            <MdCheck size={20} color="#fff" />
            SALVAR
          </Button>
        </Controls>
      </header>

      <Content>
        <Form
          id="studentForm"
          schema={schema}
          initialData={initialData}
          onSubmit={handleSubmit}
        >
          <label htmlFor="name">
            NOME COMPLETO
            <Input id="name" name="name" required />
          </label>

          <label htmlFor="email">
            ENDEREÇO DE E-MAIL
            <Input id="email" name="email" type="email" required />
          </label>

          <div>
            <label htmlFor="age">
              IDADE
              <NumberFormatInput format="##" id="age" name="age" required />
            </label>

            <label htmlFor="weight">
              PESO (em kg)
              <NumberFormatInput
                decimalScale={1}
                fixedDecimalScale
                id="weight"
                name="weight"
                required
              />
            </label>

            <label htmlFor="height">
              ALTURA (em cm)
              <NumberFormatInput
                format="###"
                id="height"
                name="height"
                required
              />
            </label>
          </div>
        </Form>
      </Content>
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
