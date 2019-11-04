/**
 *
 * LoginBox
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import './LoginBox.scss';

class LoginBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  componentDidMount() {
    this.usernameInput.focus();
  }

  handleUsernameChange = e => {
    this.setState({
      username: e.target.value,
    });
  };

  handlePasswordChange = e => {
    this.setState({
      password: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.username.length === 0 || this.state.password.length === 0) {
      return;
    }

    this.props.onSubmit({ ...this.state });
  };

  handlePasswordHint = e => {
    e.preventDefault();
    if (this.state.username.length === 0) {
      return;
    }

    this.props.onPasswordHint(this.state.username);
  };

  render() {
    return (
      <form className="login" onSubmit={this.handleSubmit}>
        <span className="login__username">
          <label className="login__username-label" htmlFor="login__username-input">
            Username
          </label>
          <input
            id="login__username-input"
            type="text"
            autoComplete="off"
            value={this.state.username}
            onChange={this.handleUsernameChange}
            ref={input => {
              this.usernameInput = input;
            }}
          />
        </span>

        <span className="login__password">
          <label className="login__password-label" htmlFor="login__password-input">
            Password
          </label>
          <input
            id="login__password-input"
            type="password"
            autoComplete="off"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
        </span>

        <span className="login__hint">
          <button className="login__hint-text" type="button" onClick={this.handlePasswordHint}>
            Password Hint
          </button>
        </span>

        <span className="login__submit">
          <input className="login__button" type="submit" value="Sign In" />
        </span>
      </form>
    );
  }
}

LoginBox.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onPasswordHint: PropTypes.func.isRequired,
};

export default LoginBox;
