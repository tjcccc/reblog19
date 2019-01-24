import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
        <h1>Initialize Your Blog</h1>
        <form className='config-form'>
          <h2>Blog Setting</h2>
          <div className='form-element-group'>
            <label>BLOG NAME</label>
            <input type='text' placeholder='Set your blog name.' />
            <p className='input-warning' hidden={!this.state.isValidationChecked || this.state.validInput.blogName}>A Blog Name is necessary.</p>
          </div>
          <div className='form-element-group'>
            <label>AUTHOR NAME</label>
            <input type='text' placeholder='Set the author name of this blog.' />
            <p className='input-warning' hidden={!this.state.isValidationChecked || this.state.validInput.author}>Input name is invalid.</p>
          </div>
          <h2>Create the Administrator Account</h2>
          <div className='form-element-group'>
            <label>USERNAME</label>
            <input type='text' placeholder='Set the username for sign in.' />
            <p className='input-warning' hidden={!this.state.isValidationChecked || this.state.validInput.username}>Input name is invalid.</p>
          </div>
          <div className='form-element-group'>
            <label>MAIL</label>
            <input type='email' placeholder='Set the E-Mail.' />
            <p className='input-warning' hidden={!this.state.isValidationChecked || this.state.validInput.mail}>Input E-Mail is invalid.</p>
          </div>
          <div className='form-element-group'>
            <label>PASSWORD</label>
            <input type='password' placeholder='Input password.' />
            <p className='input-warning' hidden={!this.state.isValidationChecked || this.state.validInput.password}>Password contains invalid characters.</p>
          </div>
          <div className='form-element-group'>
            <label>CONFIRM PASSWORD</label>
            <input type='password' placeholder='Input the same password again.' />
            <p className='input-warning' hidden={!this.state.isValidationChecked || this.state.validInput.confirmPassword}>Not the same password.</p>
          </div>
          <div className='form-button-group'>
            <button type='button'>CREATE IT</button>
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
