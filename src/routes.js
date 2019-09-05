import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Main from './pages/Main';
import Detalhe from './pages/Detalhe';

export default function Routes(){
    return (        
        <BrowserRouter>
        <Route path="/" exact component={Main} />
        <Route path="/usuario/:id" exact component={Detalhe} />
        </BrowserRouter>
    );
}