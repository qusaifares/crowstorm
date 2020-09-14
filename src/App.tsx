import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import Product from './components/Product/Product';

const App = () => {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
};

export default App;
