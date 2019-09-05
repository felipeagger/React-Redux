import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
//import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(<App />, document.getElementById('root'));

/*
class Main extends Component {
    render() {
      return (
        <BrowserRouter>
          <App />
        </BrowserRouter>
      );
    }
}


ReactDOM.render(<Main />, document.getElementById('root'));
*/

serviceWorker.unregister();
