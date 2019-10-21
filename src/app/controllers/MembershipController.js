import { isBefore, parseISO, startOfDay } from 'date-fns';

import * as Yup from 'yup';
import Plan from '../models/Plan';
import Student from '../models/Student';
import Membership from '../models/Membership';

class MembershipController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const memberships = await Membership.findAll({
      attributes: ['id', 'start_date', 'end_date', 'price'],
      order: ['start_date'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'age', 'weight', 'height'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'duration', 'price'],
        },
      ],
    });

    return res.json(memberships);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { student_id, plan_id } = req.body;

    const studentExists = Student.findByPk(student_id);

    if (!studentExists) {
      return res
        .status(400)
        .json({ error: 'Student provided is not registered' });
    }

    const planExists = Plan.findByPk(plan_id);

    if (!planExists) {
      return res.status(400).json({ error: 'Plan provided is not registered' });
    }

    const { start_date } = req.body;

    const start_date_day = startOfDay(parseISO(start_date));
    const today = startOfDay(new Date());

    if (isBefore(start_date_day, today)) {
      return res
        .status(400)
        .json({ error: 'Membership date needs to be later than today' });
    }

    const membership = await Membership.create({
      ...req.body,
      start_date: start_date_day,
    });

    return res.json(membership);
  }
}

export default new MembershipController();