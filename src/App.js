import React from 'react';
import { connect } from 'react-redux';
import { performAuth } from './monzo';
import Home from './home/Home';
import Summary from './summary/Summary';

const App = ({ authenticated, performAuth }) =>
  authenticated ? <Summary /> : <Home onSignIn={performAuth} />;

export default connect(
  ({ accessToken }) => ({
    authenticated: accessToken != null
  }),
  { performAuth }
)(App);
