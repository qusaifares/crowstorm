import { auth, googleProvider } from '../config/firebase';
import { IUser } from '../customTypes/customTypes';
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
    console.log(userData);
    const options: RequestInit = {
      method: 'POST',
      body: JSON.stringify(userData),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await fetch(`${REACT_APP_SERVER_URL}/users/google`, options);
    console.log(res);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
