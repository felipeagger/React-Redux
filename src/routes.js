import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import Detalhe from './pages/Detalhe';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/posts/:id" component={Detalhe} />
    </Switch>
  );
}
