import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Footer extends Component {
  render = () => {
    const { blogInfo } = this.props;
    return (
      <footer>
        <p><span>&copy;</span><span>2019</span><b>{blogInfo.author}</b> | <b>{blogInfo.name}</b></p>
        <p className='license'>
          <a rel='license noopener noreferrer' href='http://creativecommons.org/licenses/by-nc/4.0/' target='_blank'><img alt='Creative Commons License' src='https://i.creativecommons.org/l/by-nc/4.0/88x31.png' /></a>
          <br />
          This work is licensed under a <a rel='license noopener noreferrer' href='http://creativecommons.org/licenses/by-nc/4.0/' target='_blank'>CC BY-NC 4.0</a>.
        </p>
        <p>
          Powered by <a rel='noopener noreferrer' href='https://github.com/tjcccc/reblog19' target='_blank'>reblog19</a>
        </p>
      </footer>
    );
  }
}

Footer.propTypes = {
  blogInfo: PropTypes.shape({
    name: PropTypes.string,
    author: PropTypes.string
  }),
}

export default connect()(Footer);
