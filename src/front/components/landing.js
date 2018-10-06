import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

class Landing extends Component {
  renderUser = () => {
    if (this.props.user.length > 0) {
      return this.props.user.map(val => <li key={val.id}>{val.name}</li>);
    }
  }

  render() {
    return (
            <React.Fragment>
              <Helmet>
                <title>Nested Title</title>
                <meta name="description" content="Nested component" />
            </Helmet>
            <div className="center-align">
              <h3>Welcome</h3>
              <p>Check awesome feature</p>
            </div>
            </React.Fragment>
    );
  }
}


export default {
  component: Landing,
};
