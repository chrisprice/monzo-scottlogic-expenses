import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import './index.css';
import 'ace-css/css/ace.min.css';
import Container from './chrome/Container';
import App from './App';
import Auth from './Auth';
import Claim from './claim/Claim';
import Loading from './chrome/Loading';
import reducer, { loadState, saveState } from './reducer';

const store = createStore(reducer, loadState(), applyMiddleware(thunk));
store.subscribe(() => saveState(store.getState()));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Container>
        <Route exact path="/" component={App} />
        <Route path="/auth" component={Auth} />
        <Route exact path="/claim/" component={() => <Redirect to="/"/>} />
        <Route path="/claim/:id" component={Claim} />
        <Route path="/loading" component={Loading} />
      </Container>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
