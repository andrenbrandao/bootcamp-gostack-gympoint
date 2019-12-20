import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import StudentList from '~/pages/StudentList';
import StudentEdit from '~/pages/StudentEdit';
import StudentNew from '~/pages/StudentNew';
import PlanList from '~/pages/PlanList';
import PlanEdit from '~/pages/PlanEdit';
import PlanNew from '~/pages/PlanNew';
import MembershipList from '~/pages/MembershipList';
import MembershipEdit from '~/pages/MembershipEdit';
import MembershipNew from '~/pages/MembershipNew';
import HelpOrderList from '~/pages/HelpOrderList';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/students/:id/edit" component={StudentEdit} isPrivate />
      <Route path="/students/new" component={StudentNew} isPrivate />
      <Route path="/students" component={StudentList} isPrivate />
      <Route path="/plans/:id/edit" component={PlanEdit} isPrivate />
      <Route path="/plans/new" component={PlanNew} isPrivate />
      <Route path="/plans" component={PlanList} isPrivate />
      <Route
        path="/memberships/:id/edit"
        component={MembershipEdit}
        isPrivate
      />
      <Route path="/memberships/new" component={MembershipNew} isPrivate />
      <Route path="/memberships" component={MembershipList} isPrivate />
      <Route path="/help-orders" component={HelpOrderList} isPrivate />
    </Switch>
  );
}
