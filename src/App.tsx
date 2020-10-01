import React, { useEffect, useRef } from 'react';
import './App.css';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Cart from './components/Cart/Cart';
import Products from './components/Products/Products';
import Product from './components/Product/Product';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Checkout from './components/Checkout/Checkout';
import NotFound from './components/NotFound/NotFound';
import Orders from './components/Orders/Orders';
import OrderConfirmation from './components/OrderConfirmation/OrderConfirmation';
import { useStateValue } from './store/StateProvider';
import { ActionType } from './store/reducer';

const { REACT_APP_SERVER_URL } = process.env;

const App = () => {
  const [{ user, cart }, dispatch] = useStateValue();
  const history = useHistory();

  const isMounted = useRef(false);

  const persist = async () => {
    const email = localStorage.getItem('email');
    if (!email) return;
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
      if (!isMounted.current) return;
      dispatch({ type: ActionType.SET_USER, user: data });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?.email) localStorage.setItem('email', user.email);
  }, [user]);

  useEffect(() => {
    isMounted.current = true;
    persist();
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <div className='app'>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/products' component={Products} />
        <Route
          exact
          path='/product/:id'
          render={(props) => <Product {...props} />}
        />
        <Route exact path='/cart' component={Cart} />
        <Route exact path='/orders' component={Orders} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Signup} />
        <Route exact path='/checkout' component={Checkout} />
        <Route
          exact
          path='/confirmation'
          render={(props) => <OrderConfirmation {...props} />}
        />
        <Route exact path='*' component={NotFound} />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
