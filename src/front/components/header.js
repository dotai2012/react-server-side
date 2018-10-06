import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCurrentUser } from '../actions';

class Header extends Component {
  componentDidMount() {
    this.props.fetchCurrentUser();
  }

  authBtn = () => (this.props.auth ? <a href="/api/logout">Logout</a> : <a href="/api/auth/google">Login</a>)

  render() {
    return (
            <nav>
                <div className="nav-wrapper">
                <Link to="/" className="brand-logo">React SSR</Link>
                <ul className="right">
                <li><Link to="/user">Users</Link></li>
                <li><Link to="/admin">Admins</Link></li>
                <li>{this.authBtn()}</li>
                </ul>
                </div>
            </nav>
    );
  }
}
const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(mapStateToProps, { fetchCurrentUser })(Header);
