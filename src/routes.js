import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from "connected-react-router";

import Main from './pages/Main';
import Detalhe from './pages/Detalhe';

import history from "./history";

export default function Routes(){
    return (        
        <ConnectedRouter history={history}>
        <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/posts/:id" exact component={Detalhe} />
        </Switch>
        </ConnectedRouter>
    );
}