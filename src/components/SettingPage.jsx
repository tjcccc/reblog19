import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateAboutPage } from '../services/config.service';
import Editor from './Editor';
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
      isValidationChecked: false,
      aboutContent: '',
      isAbleToSave: false
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  updateAboutContent = async (content) => {
    const prevContent = this.props.savedAboutContent;
    this.setState({
      isAbleToSave: (content !== '' && content !== prevContent),
      aboutContent: content
    });
  };

  save = async () => {
    const { aboutContent } = this.state;
    await updateAboutPage(aboutContent);
  }

  render = () => {
    const { isAdmin, savedAboutContent } = this.props;
    const { isAbleToSave } = this.state;

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

    const tempAboutEditor = () => isAdmin ? (
      <form className='config-form' id='blog-post' onSubmit={this.handleSubmit}>
        <h2>About Page</h2>
        <article>
          <Editor
            content={savedAboutContent}
            formId='blog-post'
            handleUpdating={this.updateAboutContent}
            handleSaving={this.save}
            trigger={isAbleToSave} />
        </article>
      </form>
    ) : null;

    return (
      <div className='container responsive-container'>
        <h1>{terms.title.setting}</h1>
        <form className='config-form'>
          {adminSetting()}
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
        {tempAboutEditor()}
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
  isAdmin: PropTypes.bool,
  savedAboutContent: PropTypes.string
}

const mapStateToProps = state => ({
  isAdmin: state.authorization.isAdmin,
  savedAboutContent: state.config.about
});

export default connect(mapStateToProps, null)(SettingPage);
