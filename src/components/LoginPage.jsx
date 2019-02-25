import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import terms from '../config/terms';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validInput: {
        mail: false,
        password: false
      },
      isValidationChecked: false
    };
  }

  render = () => {
    return (
      <div className='container responsive-container'>
        <h1>{terms.title.login}</h1>
        <form className='config-form'>
          <div className='form-element-group'>
            <label>{terms.label.mail}</label>
            <input type='email' placeholder={terms.placeholder.emailForLogin} />
          </div>
          <div className='form-element-group'>
            <label>{terms.label.password}</label>
            <input type='password' placeholder={terms.placeholder.passwordForLogin} />
          </div>
          <div className='form-element-group one-line'>
            <input type='checkbox' htmlFor='remember-me' />
            <label name='remember-me' id='remember-me'>{terms.label.rememberMe}</label>
          </div>
          <div className='form-button-group'>
            <button>{terms.label.signIn}</button>
          </div>
        </form>
      </div>
    )
  };
}

LoginPage.propTypes = {
  validInput: PropTypes.shape({
    mail: PropTypes.bool,
    password: PropTypes.bool
  }),
  isValidationChecked: PropTypes.bool
}

export default connect()(LoginPage);
