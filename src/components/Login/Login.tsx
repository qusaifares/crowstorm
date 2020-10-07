import React, { useState, useEffect } from 'react';
import './Login.css';
import { Link, Redirect } from 'react-router-dom';
import { FormControl, TextField, FormHelperText } from '@material-ui/core';

import CustomButton from '../Buttons/CustomButton';
import AuthButton from '../AuthButton/AuthButton';
import GoogleLogo from '../icons/GoogleLogo';
// import TwitterLogo from '../icons/TwitterLogo';
// import FacebookLogo from '../icons/FacebookLogo';

import { useStateValue } from '../../store/StateProvider';
import { ActionType } from '../../store/reducer';
import { signin } from '../../helpers/api';
import { googleAuth } from '../../helpers/auth';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setUser } from '../../redux/userInfoSlice';

const { PUBLIC_URL } = process.env;
interface Props {}

const Login: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorText, setErrorText] = useState<string | null>('');

  useEffect(() => {
    const loginTitle = 'Log In | CrowStorm';
    document.title = loginTitle;
  }, []);

  const submitSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorText(null);
    const signinData = {
      email,
      password
    };
    try {
      const data = await signin(signinData);

      if (!data._id) throw data;

      dispatch(setUser(data));
    } catch (error) {
      setErrorText(error.message);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const data = await googleAuth();
      dispatch(setUser(data));
    } catch (error) {
      console.log(error);
    }
  };

  if (user?._id && window.location.pathname === '/login') {
    return <Redirect to='/' />;
  }

  return (
    <div className='login'>
      <FormControl>
        <form onSubmit={submitSignin} className='login__loginForm'>
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
          <div className='login__socialButtons'>
            {/* <AuthButton
              onClick={handleGoogleAuth}
              icon={FacebookLogo}
              className='authButton__facebook'
            /> */}
            <AuthButton onClick={handleGoogleAuth} icon={GoogleLogo} />
            {/* <AuthButton
              onClick={handleGoogleAuth}
              className='authButton__twitter'
              icon={TwitterLogo}
            /> */}
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
