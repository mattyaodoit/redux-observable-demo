import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './_navigator.scss';

class Navigator extends Component {
  render() {
    const { links } = this.props;
    const rows = [];

    links.forEach((link, index) => {
      if(link.title) {
        rows.push(
          <NavLink key={`link-${index}`} exact activeClassName="active" to={link.href}>
            {link.title}
          </NavLink>
        );
      }
    });

    return (
      <nav>
        {rows}
      </nav>
    );
  }
}

Navigator.propTypes = {
  links: PropTypes.array.isRequired
};

export default Navigator;