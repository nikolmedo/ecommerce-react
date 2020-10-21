import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
// import $ from 'jquery';
// import Popper from 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ItemListContainer from './components/ItemListContainer';

function App() {
  return (
    <div className="App">
      <NavBar />
      <ItemListContainer title="Las ofertas de la semana"/>
    </div>
  );
}

export default App;
