import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navigator from '../navigator';
import './header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [
        {
          title: 'Fetch user (redux-observable)',
          href: process.env.PUBLIC_URL + '/'
        },
        {
          title: 'Fetch user (redux-thunk)',
          href: process.env.PUBLIC_URL + '/redux-thunk'
        }
      ]
    };
  }

  render() {
    const { title } = this.props;

    if (!this.props) {
      return null;
    } else {
      return (
        <header id="header">
          <div className="container">
            <div className="logo-wrapper">
              <h1>{title}</h1>
            </div>
            <Navigator links={this.state.links}/>
          </div>
        </header>
      );
    }
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired
};

export default Header;