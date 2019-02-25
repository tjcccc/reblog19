import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import terms from '../config/terms';

class InitializationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validInput: {
        blogName: false,
        author: false,
        username: false,
        mail: false,
        password: false,
        confirmPassword: false
      },
      isValidationChecked: false
    };
  }

  displayName = 'PostPage';

  render = () => {
    // const { validInput } = this.props;

    return (
      <div className='container'>
        <h1>{terms.initializationTitle}</h1>
        <form className='config-form'>
          <h2>{terms.blogSettingTitle}</h2>
          <div className='form-element-group'>
            <label>{terms.blogNameLabel}</label>
            <input type='text' placeholder='Set your blog name.' />
            <p className='input-warning' hidden={!this.state.isValidationChecked || this.state.validInput.blogName}>{terms.blogNameValidation}</p>
          </div>
          <div className='form-element-group'>
            <label>{terms.authorNameLabel}</label>
            <input type='text' placeholder='Set the author name of this blog.' />
            <p className='input-warning' hidden={!this.state.isValidationChecked || this.state.validInput.author}>{terms.nameValidation}</p>
          </div>
          <h2>{terms.createAdminAccountTitle}</h2>
          <div className='form-element-group'>
            <label>{terms.usernameLabel}</label>
            <input type='text' placeholder='Set the username for sign in.' />
            <p className='input-warning' hidden={!this.state.isValidationChecked || this.state.validInput.username}>{terms.nameValidation}</p>
          </div>
          <div className='form-element-group'>
            <label>{terms.mailLabel}</label>
            <input type='email' placeholder='Set the E-Mail.' />
            <p className='input-warning' hidden={!this.state.isValidationChecked || this.state.validInput.mail}>{terms.emailValidation}</p>
          </div>
          <div className='form-element-group'>
            <label>{terms.passwordLabel}</label>
            <input type='password' placeholder='Input password.' />
            <p className='input-warning' hidden={!this.state.isValidationChecked || this.state.validInput.password}>{terms.passwordValidation}</p>
          </div>
          <div className='form-element-group'>
            <label>{terms.confirmPasswordLabel}</label>
            <input type='password' placeholder='Input the same password again.' />
            <p className='input-warning' hidden={!this.state.isValidationChecked || this.state.validInput.confirmPassword}>{terms.confirmPasswordValidation}</p>
          </div>
          <div className='form-button-group'>
            <button type='button'>{terms.submitCreatingAccountLabel}</button>
          </div>
        </form>
      </div>
    );
  };
}

InitializationPage.propTypes = {
  validInput: PropTypes.shape({
    blogName: PropTypes.bool,
    author: PropTypes.bool,
    username: PropTypes.bool,
    mail: PropTypes.bool,
    password: PropTypes.bool,
    confirmPassword: PropTypes.bool
  }),
  isValidationChecked: PropTypes.bool
}

export default connect()(InitializationPage);
