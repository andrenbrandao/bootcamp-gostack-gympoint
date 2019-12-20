import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import Mail from '../../lib/Mail';

class MembershipMail {
  get key() {
    return 'MembershipMail';
  }

  async handle({ data }) {
    const { student, membership, plan } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Gympoint: Nova Matrícula!',
      template: 'membership',
      context: {
        student: student.name,
        startDate: format(parseISO(membership.start_date), 'PPPP', {
          locale: ptBR,
        }),
        endDate: format(parseISO(membership.end_date), 'PPPP', {
          locale: ptBR,
        }),
        plan: plan.title,
        price: membership.price,
      },
    });
  }
}

export default new MembershipMail();
