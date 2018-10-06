import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import { fetchCurrentUser } from '../actions';
import Header from './header';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        {renderRoutes(this.props.route.routes)}
      </React.Fragment>
    );
  }
}
function loadData({ dispatch }) {
  dispatch(fetchCurrentUser());
}
export default {
  component: App,
  loadData,
};
