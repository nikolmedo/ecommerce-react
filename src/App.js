import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
// import $ from 'jquery';
// import Popper from 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ItemListContainer from './components/ItemListContainer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Cart from './components/Cart';
import ItemDetailContainer from './components/ItemDetailContainer';

function App() {
  
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/">
            <ItemListContainer title="Las ofertas de la semana"/>
          </Route>
          <Route path="/item/:idItem">
            <ItemDetailContainer />
            {/* <ItemListContainer title="Las ofertas de la categoria" /> */}
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
