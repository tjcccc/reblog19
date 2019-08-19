import React, { Component } from 'react'
import PropTypes, { instanceOf } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withCookies, Cookies } from 'react-cookie';
import logger from '../utilities/logger';
import { getAuthorization } from '../services/authorization.service';
import { signIn } from '../redux/authorization/actions';
import terms from '../config/terms';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mail: '',
      password: '',
      validInput: {
        mail: false,
        password: false
      },
      isValidationChecked: false
    };
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  signUserIn = (loginData) => {
    // Store authorization data to cookie
    const { cookies } = this.props;
    cookies.set('token', loginData.token, {
      path: '/',
      maxAge: loginData.tokenExpiration * 24 * 60 * 60
    });

    this.props.onSignIn(loginData);
  }

  login = async (event) => {
    event.preventDefault();
    const mail = this.state.mail;
    const password = this.state.password;

    if (mail.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    const authorization = await getAuthorization(mail, password);
    const [loginData] = [authorization.data.data.login];

    // logger.info(loginData);
    // logger.info(loginData.token);

    if (loginData.isLoginSuccessful) {
      this.signUserIn(loginData);
      this.props.history.goBack();
    } else {
      // TODO: Real warning.
      logger.warn('Login failed.');
    }

    return authorization.data;
  }

  render = () => {
    return (
      <div className='container responsive-container'>
        <h1>{terms.title.login}</h1>
        <form className='config-form' onSubmit={this.login}>
          <div className='form-element-group'>
            <label>{terms.label.mail}</label>
            <input name='mail' type='email' placeholder={terms.placeholder.emailForLogin} onChange={this.handleInput} />
            <p className='input-warning' hidden={!this.state.isValidationChecked || this.state.validInput.mail}>{terms.validation.email}</p>
          </div>
          <div className='form-element-group'>
            <label>{terms.label.password}</label>
            <input name='password' type='password' placeholder={terms.placeholder.passwordForLogin} onChange={this.handleInput} />
          </div>
          <div className='form-element-group one-line'>
            <input type='checkbox' htmlFor='remember-me' />
            <label name='remember-me' id='remember-me'>{terms.label.rememberMe}</label>
          </div>
          <div className='form-button-group'>
            <button type='submit'>{terms.label.signIn}</button>
          </div>
        </form>
      </div>
    )
  };

}

LoginPage.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
  validInput: PropTypes.shape({
    mail: PropTypes.bool,
    password: PropTypes.bool
  }),
  isValidationChecked: PropTypes.bool,
  onSignIn: PropTypes.func.isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired
  })
}

const mapDispatchToProps = (dispatch) => ({
  onSignIn: (loginData) => {
    dispatch(signIn(loginData));
  }
});

export default withRouter(withCookies(connect(null, mapDispatchToProps)(LoginPage)));
