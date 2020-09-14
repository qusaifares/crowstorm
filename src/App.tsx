import React, { useEffect } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Cart from './components/Cart/Cart';
import Products from './components/Products/Products';
import Product from './components/Product/Product';
import { useStateValue } from './store/StateProvider';
const App = () => {
  const [{ pageTitle }, dispatch] = useStateValue();
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
        <Route path='/' component={Home} />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
