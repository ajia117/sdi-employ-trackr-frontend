import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/Index/Index.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
window.ren = false;
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route path='/' component={props => <App {...props}/>}></Route>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);