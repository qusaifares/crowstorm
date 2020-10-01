import {
  auth,
  googleProvider
  // facebookProvider,
  // twitterProvider
} from '../config/firebase';
import { IUser } from './customTypes';
const { REACT_APP_SERVER_URL } = process.env;

export const googleAuth = async () => {
  try {
    const result = await auth.signInWithPopup(googleProvider);
    if (!result.user) return;
    const userData: IUser = {
      name: {
        // @ts-ignore
        first: result.additionalUserInfo?.profile?.given_name as string,
        // @ts-ignore
        last: result.additionalUserInfo?.profile?.family_name as string
      },
      email: result.user.email as string
    };
    const options: RequestInit = {
      method: 'POST',
      body: JSON.stringify(userData),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await fetch(`${REACT_APP_SERVER_URL}/users/google`, options);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// export const facebookAuth = async () => {
//   try {
//     const result = await auth.signInWithPopup(facebookProvider);
//     console.log(result);
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };

// export const twitterAuth = async () => {
//   try {
//     const result = await auth.signInWithPopup(twitterProvider);
//     console.log(result);
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };
