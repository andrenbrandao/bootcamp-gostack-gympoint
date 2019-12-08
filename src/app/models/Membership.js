import { addMonths, isBefore, isAfter } from 'date-fns';
import Sequelize, { Model } from 'sequelize';

import Plan from './Plan';

class Membership extends Model {
  static init(sequelize) {
    super.init(
      {
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        price: Sequelize.DECIMAL(10, 2),
        active: {
          type: Sequelize.VIRTUAL(Sequelize.BOOLEAN, [
            'start_date',
            'end_date',
          ]),
          get() {
            return (
              isBefore(this.get('start_date'), new Date()) &&
              isAfter(this.get('end_date'), new Date())
            );
          },
        },
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async membership => {
      if (membership.plan_id) {
        const { duration, price } = await Plan.findByPk(membership.plan_id);
        membership.end_date = addMonths(membership.start_date, duration);
        membership.price = price * duration;
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
    this.belongsTo(models.Plan, { foreignKey: 'plan_id', as: 'plan' });
  }
}

export default Membership;
