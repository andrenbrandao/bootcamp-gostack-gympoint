import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import StudentList from '~/pages/StudentList';
import StudentEdit from '~/pages/StudentEdit';
import StudentNew from '~/pages/StudentNew';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/students" exact component={StudentList} isPrivate />
      <Route path="/students/new" exact component={StudentNew} isPrivate />
      <Route path="/students/:id/edit" component={StudentEdit} isPrivate />
    </Switch>
  );
}
