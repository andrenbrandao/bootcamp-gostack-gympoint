import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdChevronLeft, MdCheck } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { formatPrice } from '~/utils/format';
import NumberFormatInput from '~/components/NumberFormatInput';
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
  title: Yup.string().required('O título é obrigatório'),
  duration: Yup.number()
    .integer()
    .positive('Insira uma duração válida')
    .required('A duração é obrigatória')
    .typeError('Insira uma duração válida'),
  price: Yup.number()
    .positive('Insira um preço válido')
    .required('O preço é obrigatório')
    .typeError('Insira um preço válido'),
});

export default function PlanEdit() {
  const [priceValue, setPriceValue] = useState(0);
  const [durationValue, setDurationValue] = useState(0);
  const [totalPrice, setTotalPrice] = useState(formatPrice(0.0));

  async function handleSubmit({ title, duration, price }) {
    try {
      await api.post('/plans', {
        title,
        duration,
        price,
      });

      toast.success('Plano cadastrado com sucesso');
      history.push('/plans');
    } catch (err) {
      toast.error('Houve um erro ao cadastrar o plano');
    }
  }

  function handleDurationChange({ value }) {
    setDurationValue(value);
    setTotalPrice(formatPrice(value * priceValue));
  }

  function handlePriceChange({ value }) {
    setPriceValue(value);
    setTotalPrice(formatPrice(durationValue * value));
  }

  return (
    <Container>
      <header>
        <h1>Cadastro de plano</h1>

        <Controls>
          <Button as={Link} to="/plans" className="secondary">
            <MdChevronLeft size={20} color="#fff" />
            VOLTAR
          </Button>

          <Button type="submit" form="planForm">
            <MdCheck size={20} color="#fff" />
            SALVAR
          </Button>
        </Controls>
      </header>

      <Content>
        <Form id="planForm" schema={schema} onSubmit={handleSubmit}>
          <FormGroup>
            <Input id="title" name="title" label="TÍTULO DO PLANO" />
          </FormGroup>
          <FormRow>
            <FormGroup>
              <NumberFormatInput
                format="##"
                id="duration"
                name="duration"
                label="DURAÇÃO (EM MESES)"
                onChange={handleDurationChange}
              />
            </FormGroup>

            <FormGroup>
              <NumberFormatInput
                decimalScale={2}
                fixedDecimalScale
                prefix="R$ "
                decimalSeparator=","
                id="price"
                name="price"
                label="PREÇO MENSAL"
                onChange={handlePriceChange}
              />
            </FormGroup>

            <FormGroup>
              <Input
                id="totalPrice"
                name="totalPrice"
                value={totalPrice}
                label="PREÇO TOTAL"
                disabled
              />
            </FormGroup>
          </FormRow>
        </Form>
      </Content>
    </Container>
  );
}
