import React, { useState, useEffect } from 'react';
import './Signup.css';
import { Link, Redirect } from 'react-router-dom';
import { FormControl, TextField, FormHelperText } from '@material-ui/core';

import CustomButton from '../Buttons/CustomButton';
import AuthButton from '../AuthButton/AuthButton';
import GoogleLogo from '../icons/GoogleLogo';
// import TwitterLogo from '../icons/TwitterLogo';
// import FacebookLogo from '../icons/FacebookLogo';

import { ActionType } from '../../store/reducer';
import { useStateValue } from '../../store/StateProvider';

import { googleAuth } from '../../helpers/auth';
import { signup } from '../../helpers/api';

const { PUBLIC_URL } = process.env;
interface Props {}

const Signup: React.FC<Props> = () => {
  const [{ user }, dispatch] = useStateValue();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorText, setErrorText] = useState<string | null>();

  useEffect(() => {
    const signupTitle = 'Sign Up | CrowStorm';
    document.title = signupTitle;
  }, []);

  const submitSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorText(null);
    const signupData = {
      name: {
        first: firstName,
        last: lastName
      },
      email,
      password
    };
    try {
      const data = await signup(signupData);

      if (!data._id) throw data;

      dispatch({ type: ActionType.SET_USER, user: data });
    } catch (error) {
      setErrorText(error.message);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const data = await googleAuth();
      dispatch({ type: ActionType.SET_USER, user: data });
    } catch (error) {
      console.log(error);
    }
  };

  if (user?._id && window.location.pathname === '/register')
    return <Redirect to='/' />;

  return (
    <div className='signup'>
      <FormControl>
        <form onSubmit={submitSignup} className='signup__signupForm'>
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
          <div className='signup__socialButtons'>
            {/* <AuthButton
              onClick={facebookAuth}
              icon={FacebookLogo}
              className='authButton__facebook'
            /> */}
            <AuthButton onClick={handleGoogleAuth} icon={GoogleLogo} />
            {/* <AuthButton
              onClick={twitterAuth}
              className='authButton__twitter'
              icon={TwitterLogo}
            /> */}
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
