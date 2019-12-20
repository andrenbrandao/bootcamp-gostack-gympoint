import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import api from '~/services/api';

import {
  Container,
  Content,
  Table,
  Modal,
  Button,
  FormGroup,
  Message,
} from './styles';

Modal.setAppElement('#root');

const schema = Yup.object().shape({
  helpOrderAnswer: Yup.string()
    .required('Insira uma resposta')
    .typeError('Insira uma resposta'),
});

export default function HelpOrderList() {
  const [helpOrders, setHelpOrders] = useState([]);
  const [selectedHelpOrder, setSelectedHelpOrder] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function loadHelpOrders() {
      const response = await api.get('/help-orders');

      setHelpOrders(response.data);
    }

    loadHelpOrders();
  }, []);

  function handleAnswerClick(id) {
    const selected = helpOrders.find(helpOrder => helpOrder.id === id);

    setSelectedHelpOrder(selected);
    setShowModal(true);
  }

  async function handleSubmit({ helpOrderAnswer }) {
    try {
      const { id } = selectedHelpOrder;

      await api.post(`/help-orders/${id}/answers`, {
        answer: helpOrderAnswer,
      });

      setShowModal(false);
      setHelpOrders(helpOrders.filter(helpOrder => helpOrder.id !== id));
      toast.success('Resposta enviada com sucesso');
    } catch (err) {
      toast.error('Houve um erro ao enviar a resposta');
    }
  }

  return (
    <>
      <Container>
        <header>
          <h1>Pedidos de auxílio</h1>
        </header>

        <Content>
          {helpOrders.length === 0 ? (
            <Message>Não há novos pedidos de auxílio</Message>
          ) : (
            <Table>
              <thead>
                <tr>
                  <th>ALUNO</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {helpOrders.map(helpOrder => (
                  <tr key={helpOrder.id}>
                    <td>{helpOrder.student.name}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleAnswerClick(helpOrder.id)}
                      >
                        responder
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Content>
      </Container>
      <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)}>
        <section>
          <div>
            <strong>PERGUNTA DO ALUNO</strong>
            <p>{selectedHelpOrder.question}</p>
          </div>
          <div>
            <Form id="helpOrderForm" schema={schema} onSubmit={handleSubmit}>
              <FormGroup>
                <Input
                  id="helpOrderAnswer"
                  name="helpOrderAnswer"
                  label="SUA RESPOSTA"
                  placeholder="Insira aqui sua resposta"
                  multiline
                />
              </FormGroup>

              <Button type="submit">Responder aluno</Button>
            </Form>
          </div>
        </section>
      </Modal>
    </>
  );
}
