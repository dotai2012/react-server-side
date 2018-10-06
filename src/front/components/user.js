import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';

class User extends Component {
  componentDidMount() {
    if (this.props.user.length === 0) {
      this.props.fetchUser();
    }
  }

  renderUser = () => this.props.user.map(val => <li key={val.id}>{val.name}</li>)

  render() {
    return (
            <div>
              {this.renderUser()}
            </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

function loadData({ dispatch }) {
  return dispatch(fetchUser());
}

export { loadData };
export default {
  loadData,
  component: connect(mapStateToProps, { fetchUser })(User),
};
