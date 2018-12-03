import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './header.css';

class Header extends Component {
  render = () => {
    const { blog } = this.props;
    return (
      <div className="header">
        {blog.name}
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
