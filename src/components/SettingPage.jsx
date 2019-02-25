import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import terms from '../config/terms';

class SettingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validInput: {
        blogName: false,
        author: false,
        username: false,
        password: false,
        confirmPassword: false
      },
      isValidationChecked: false
    };
  }

  render = () => {
    const { isAdmin } = this.props;

    const adminSetting = () => isAdmin ? (
      <div>
        <h2>{terms.title.blogSetting}</h2>
        <div className='form-element-group'>
          <label>{terms.label.blogName}</label>
          <input type='text' placeholder='' />
          <p className='input-warning' hidden={!this.state.isValidationChecked || this.state.validInput.blogName}>{terms.validation.blogName}</p>
        </div>
        <div className='form-element-group'>
          <label>{terms.label.authorName}</label>
          <input type='text' placeholder='' />
          <p className='input-warning' hidden={!this.state.isValidationChecked || this.state.validInput.author}>{terms.validation.name}</p>
        </div>
      </div>
    ) : null;

    return (
      <div className='container responsive-container'>
        <h1>{terms.title.setting}</h1>
        <form className='config-form'>
          {adminSetting}
          <h2>{terms.title.accountSetting}</h2>
          <div className='form-element-group'>
            <label>{terms.label.username}</label>
            <input type='text' placeholder='' />
            <p className='input-warning' hidden={!this.state.isValidationChecked || this.state.validInput.username}>{terms.validation.name}</p>
          </div>
          <div className='form-element-group'>
            <label>{terms.label.password}</label>
            <input type='password' placeholder='' />
            <p className='input-warning' hidden={!this.state.isValidationChecked || this.state.validInput.password}>{terms.validation.password}</p>
          </div>
          <div className='form-element-group'>
            <label>{terms.label.confirmPassword}</label>
            <input type='password' placeholder='' />
            <p className='input-warning' hidden={!this.state.isValidationChecked || this.state.validInput.confirmPassword}>{terms.validation.confirmPassword}</p>
          </div>
          <div className='form-button-group'>
            <button>{terms.label.update}</button>
          </div>
        </form>
      </div>
    )
  };
}

SettingPage.propTypes = {
  validInput: PropTypes.shape({
    blogName: PropTypes.bool,
    author: PropTypes.bool,
    username: PropTypes.bool,
    password: PropTypes.bool,
    confirmPassword: PropTypes.bool
  }),
  isValidationChecked: PropTypes.bool,
  isAdmin: PropTypes.bool
}

const mapStateToProps = state => ({
  isAdmin: state.login.isAdmin
});

export default connect(mapStateToProps, null)(SettingPage);
