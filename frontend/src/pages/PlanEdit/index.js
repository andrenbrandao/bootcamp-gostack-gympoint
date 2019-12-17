import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MdChevronLeft, MdCheck } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { formatPrice } from '~/utils/format';
import NumberFormatInput from '~/components/NumberFormatInput';
import history from '~/services/history';
import api from '~/services/api';

import { Container, Controls, Content, Button } from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório'),
  duration: Yup.number()
    .integer()
    .positive('Insira uma duração válida')
    .required('A duração é obrigatória')
    .typeError('Insira uma duração válida'),
  price: Yup.number()
    .positive('Insira um preço válido')
    .required('O preço é obrigatório'),
});

export default function PlanEdit({ match }) {
  const {
    params: { id },
  } = match;

  const [plan, setPlan] = useState({});
  const [data, setData] = useState({});
  const [totalPrice, setTotalPrice] = useState(formatPrice(0.0));

  useEffect(() => {
    async function loadPlan() {
      const response = await api.get(`/plans/${id}`);

      setPlan(response.data);
    }

    loadPlan();
  }, [id]);

  useEffect(() => {
    const { title, duration, price } = plan;

    setData({
      title,
      duration,
      price: formatPrice(price),
      priceValue: price,
      durationValue: duration,
    });

    setTotalPrice(formatPrice(price * duration));
  }, [plan]);

  async function handleSubmit({ title, duration, price }) {
    try {
      await api.put(`/plans/${id}`, {
        title,
        duration,
        price,
      });

      toast.success('Plano atualizado com sucesso');
      history.push('/plans');
    } catch (err) {
      toast.error('Houve um erro ao atualizar o plano');
    }
  }

  function handleDurationChange({ value }) {
    const { priceValue } = data;
    setData({ ...data, durationValue: value });
    setTotalPrice(formatPrice(value * priceValue));
  }

  function handlePriceChange({ value }) {
    const { durationValue } = data;
    setData({ ...data, priceValue: value });
    setTotalPrice(formatPrice(durationValue * value));
  }

  return (
    <Container>
      <header>
        <h1>Edição de plano</h1>

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
        <Form
          id="planForm"
          schema={schema}
          initialData={data}
          onSubmit={handleSubmit}
        >
          <label htmlFor="title">
            TÍTULO DO PLANO
            <Input id="title" name="title" required />
          </label>

          <div>
            <label htmlFor="duration">
              DURAÇÃO (EM MESES)
              <NumberFormatInput
                format="##"
                id="duration"
                name="duration"
                required
                onChange={handleDurationChange}
              />
            </label>

            <label htmlFor="price">
              PREÇO MENSAL
              <NumberFormatInput
                decimalScale={2}
                fixedDecimalScale
                prefix="R$ "
                decimalSeparator=","
                id="price"
                name="price"
                required
                onChange={handlePriceChange}
              />
            </label>

            <label htmlFor="totalPrice">
              PREÇO TOTAL
              <input
                id="totalPrice"
                name="totalPrice"
                value={totalPrice}
                disabled
              />
            </label>
          </div>
        </Form>
      </Content>
    </Container>
  );
}

PlanEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
