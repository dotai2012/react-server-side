import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAdmin } from '../actions';
import CheckAuth from '../service/auth';

class Admin extends Component {
  componentDidMount() {
    this.props.fetchAdmin();
  }

  renderAdmin = () => {
    if (Array.isArray(this.props.admin)) {
      return this.props.admin.map(val => <li key={val.id}>{val.name}</li>);
    }
    return 'this.props.admin';
  }

  render() {
    return (
      <div>
        {this.renderAdmin()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  admin: state.admin,
});

function loadData({ dispatch }) {
  return dispatch(fetchAdmin());
}

export { loadData };
export default {
  loadData,
  component: connect(mapStateToProps, { fetchAdmin })(CheckAuth(Admin)),
};
