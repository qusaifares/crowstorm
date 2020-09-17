import React, { useState } from 'react';
import './Login.css';
import { Link, useHistory } from 'react-router-dom';
import { FormControl, TextField, FormHelperText } from '@material-ui/core';

import CustomButton from '../Buttons/CustomButton';
import GoogleLogo from '../icons/GoogleLogo';

import { useStateValue } from '../../store/StateProvider';
import { ActionType } from '../../store/reducer';

const { PUBLIC_URL, REACT_APP_SERVER_URL } = process.env;
interface Props {}

const Login: React.FC<Props> = () => {
  const history = useHistory();
  const [{ user }, dispatch] = useStateValue();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorText, setErrorText] = useState<string | null>('');

  const signin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorText(null);
    const body: BodyInit = JSON.stringify({
      email,
      password
    });
    const options: RequestInit = {
      method: 'POST',
      body,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await fetch(`${REACT_APP_SERVER_URL}/users/login/`, options);
      const data = await res.json();

      if (!data._id) throw data;

      dispatch({ type: ActionType.SET_USER, user: data });
      localStorage.setItem('email', data.email);
      history.push('/');
    } catch (error) {
      setErrorText(error.message);
    }
  };
  return (
    <div className='login'>
      <FormControl>
        <form onSubmit={signin} className='login__loginForm'>
          <img
            src={`${PUBLIC_URL}/images/icon-black.png`}
            alt=''
            className='login__logo'
          />
          <h3>Welcome to CrowStorm</h3>
          <div className='login__inputsContainer'>
            <TextField
              fullWidth
              required
              className='signup__input'
              type='email'
              label='Email'
              InputLabelProps={{
                style: { color: 'inherit' }
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              fullWidth
              required
              className='signup__input'
              type='password'
              label='Password'
              InputLabelProps={{
                style: { color: 'inherit' }
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorText && (
            <FormHelperText className='login__error' error>
              {errorText}
            </FormHelperText>
          )}
          <CustomButton>Sign In</CustomButton>
          <div className='login__or'>OR</div>
          <div className='login__socialButton'>
            <GoogleLogo />
          </div>
          <p className='login__switchPrompt'>
            New to CrowStorm? <Link to='/register'>Create Account</Link>
          </p>
        </form>
      </FormControl>
    </div>
  );
};

export default Login;
