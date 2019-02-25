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
        <h1>{terms.loginTitle}</h1>
        <form className='config-form'>
          <div className='form-element-group'>
            <label>{terms.mailLabel}</label>
            <input type='email' placeholder='E-Mail, not username.' />
          </div>
          <div className='form-element-group'>
            <label>{terms.passwordLabel}</label>
            <input type='password' placeholder='Input your password.' />
          </div>
          <div className='form-element-group one-line'>
            <input type='checkbox' htmlFor='remember-me' />
            <label name='remember-me' id='remember-me'>{terms.rememberMeLabel}</label>
          </div>
          <div className='form-button-group'>
            <button>{terms.signInLabel}</button>
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
