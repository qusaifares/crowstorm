import React, { useEffect } from 'react';
import './App.css';
import { Switch, Route, useHistory } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Cart from './components/Cart/Cart';
import Products from './components/Products/Products';
import Product from './components/Product/Product';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import { useStateValue } from './store/StateProvider';
import { ActionType } from './store/reducer';

const { REACT_APP_SERVER_URL } = process.env;

const App = () => {
  const [{ user, pageTitle }, dispatch] = useStateValue();
  const history = useHistory();

  const persist = async () => {
    const email = localStorage.getItem('email');
    const body: BodyInit = JSON.stringify({
      email
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
        `${REACT_APP_SERVER_URL}/users/persist/`,
        options
      );
      const data = await res.json();

      if (!data._id) throw data;

      dispatch({ type: ActionType.SET_USER, user: data });
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    persist();
  }, []);

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);
  return (
    <div className='app'>
      <Header />
      <Switch>
        <Route path='/products' component={Products} />
        <Route
          path='/product/:id'
          render={(routerProps) => <Product match={routerProps.match} />}
        />
        <Route path='/cart' component={Cart} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Signup} />
        <Route path='/' component={Home} />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
