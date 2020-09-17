import React, { useState } from 'react';
import './Signup.css';
import { Link, useHistory } from 'react-router-dom';
import { FormControl, TextField, FormHelperText } from '@material-ui/core';

import CustomButton from '../Buttons/CustomButton';
import GoogleLogo from '../icons/GoogleLogo';

import { ActionType } from '../../store/reducer';
import { useStateValue } from '../../store/StateProvider';

const { PUBLIC_URL, REACT_APP_SERVER_URL } = process.env;
interface Props {}

const Signup: React.FC<Props> = () => {
  const history = useHistory();
  const [{ user }, dispatch] = useStateValue();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorText, setErrorText] = useState<string | null>();

  const signup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorText(null);
    const body: BodyInit = JSON.stringify({
      name: {
        first: firstName,
        last: lastName
      },
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
      const res = await fetch(
        `${REACT_APP_SERVER_URL}/users/register/`,
        options
      );
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
    <div className='signup'>
      <FormControl>
        <form onSubmit={signup} className='signup__signupForm'>
          <img
            src={`${PUBLIC_URL}/images/icon-black.png`}
            alt=''
            className='signup__logo'
          />
          <h3>Welcome to CrowStorm</h3>
          <div className='signup__inputsContainer'>
            <TextField
              fullWidth
              required
              className='signup__input'
              type='text'
              label='First Name'
              InputLabelProps={{
                style: { color: 'inherit' }
              }}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              fullWidth
              required
              className='signup__input'
              type='text'
              label='Last Name'
              InputLabelProps={{
                style: { color: 'inherit' }
              }}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
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
            <FormHelperText className='signup__error' error>
              {errorText}
            </FormHelperText>
          )}
          <CustomButton type='submit'>Sign Up</CustomButton>
          <div className='signup__or'>OR</div>
          <div className='signup__socialButton'>
            <GoogleLogo />
          </div>
          <p className='signup__switchPrompt'>
            Have an account? <Link to='/login'>Log In</Link>
          </p>
        </form>
      </FormControl>
    </div>
  );
};

export default Signup;
