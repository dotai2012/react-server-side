import React, { Component } from 'react';

class Page404 extends Component {
  render() {
    if (this.props.staticContext) {
      this.props.staticContext.notFound = true;
    }
    return (
            <div>
                Page not found
            </div>
    );
  }
}

export default {
  component: Page404,
};
