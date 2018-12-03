import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './header.scss';

class Header extends Component {
  render = () => {
    const { blog } = this.props;
    return (
      <div className="header">
        <h1>{blog.name}</h1>
      </div>

    );
  };
}

Header.propTypes = {
  blog: PropTypes.shape({
    name: PropTypes.string
  })
}

export default connect()(Header);
