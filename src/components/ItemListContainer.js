import React, { useState } from 'react';
import ItemList from './ItemList';

function ItemListContainer({ title }) {
  const [productos, setProductos] = useState();
  const task = new Promise((res, rej) => {
      setTimeout(function(){
        const prod = [
          { id: 1, title: 'Prod 1', description: 'Prod 1 - des', price: 1500, stock: 12, pictureUrl: 'https://infoservice-cba.com.ar/wp-content/uploads/2019/07/Disco-Rigido-Solido-Ssd-A400-120gb-Kingston-Sata-Interno-7mm.jpg'},
          { id: 2, title: 'Prod 2', description: 'Prod 2 - des', price: 200, stock: 15, pictureUrl: 'https://infoservice-cba.com.ar/wp-content/uploads/2019/07/Disco-Rigido-Solido-Ssd-A400-120gb-Kingston-Sata-Interno-7mm.jpg'},
          { id: 3, title: 'Prod 3', description: 'Prod 3 - des', price: 9500, stock: 19, pictureUrl: 'https://infoservice-cba.com.ar/wp-content/uploads/2019/07/Disco-Rigido-Solido-Ssd-A400-120gb-Kingston-Sata-Interno-7mm.jpg'}
        ];
        res(prod);
      }, 3000);
  });
  task.then( result => {
    setProductos(result);
  })
  return (
      <div className="container">
          <h2>{title}</h2>
          <ItemList items={productos} />
      </div>
  );
}
export default ItemListContainer;