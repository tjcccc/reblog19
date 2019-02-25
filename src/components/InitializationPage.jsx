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
      <div className='container responsive-container'>
        <h1>{terms.title.initialization}</h1>
        <form className='config-form'>
          <h2>{terms.title.blogSetting}</h2>
          <div className='form-element-group'>
            <label>{terms.label.blogName}</label>
            <input type='text' placeholder={terms.placeholder.setBlogName} />
            <p className='input-warning' hidden={!this.state.isValidationChecked || this.state.validInput.blogName}>{terms.validation.blogName}</p>
          </div>
          <div className='form-element-group'>
            <label>{terms.label.authorName}</label>
            <input type='text' placeholder={terms.placeholder.setAuthorName} />
            <p className='input-warning' hidden={!this.state.isValidationChecked || this.state.validInput.author}>{terms.validation.name}</p>
          </div>
          <h2>{terms.title.createAdminAccount}</h2>
          <div className='form-element-group'>
            <label>{terms.label.username}</label>
            <input type='text' placeholder={terms.placeholder.setUsername} />
            <p className='input-warning' hidden={!this.state.isValidationChecked || this.state.validInput.username}>{terms.validation.name}</p>
          </div>
          <div className='form-element-group'>
            <label>{terms.label.mail}</label>
            <input type='email' placeholder={terms.placeholder.setEmail} />
            <p className='input-warning' hidden={!this.state.isValidationChecked || this.state.validInput.mail}>{terms.validation.email}</p>
          </div>
          <div className='form-element-group'>
            <label>{terms.label.password}</label>
            <input type='password' placeholder={terms.placeholder.setPassword} />
            <p className='input-warning' hidden={!this.state.isValidationChecked || this.state.validInput.password}>{terms.validation.password}</p>
          </div>
          <div className='form-element-group'>
            <label>{terms.label.confirmPassword}</label>
            <input type='password' placeholder={terms.placeholder.confirmSetPassword} />
            <p className='input-warning' hidden={!this.state.isValidationChecked || this.state.validInput.confirmPassword}>{terms.validation.confirmPassword}</p>
          </div>
          <div className='form-button-group'>
            <button type='button'>{terms.label.submitCreatingAccount}</button>
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
