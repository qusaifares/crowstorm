const { REACT_APP_SERVER_URL } = process.env;

export const signup = async (bodyObject: object) => {
  try {
    const body = JSON.stringify(bodyObject);
    const options: RequestInit = {
      method: 'POST',
      body,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await fetch(`${REACT_APP_SERVER_URL}/users/register/`, options);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const signin = async (bodyObject: object) => {
  const body = JSON.stringify(bodyObject);
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
    return data;
  } catch (error) {
    console.log(error);
  }
};
