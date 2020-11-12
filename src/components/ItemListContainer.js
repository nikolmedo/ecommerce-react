import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetailContainer from './ItemDetailContainer';
// import { Spinner } from 'react-bootstrap';
import ItemList from './ItemList';
import Loader from './Loader';

function ItemListContainer({ title }) {
  const { idCategory } = useParams();
  console.log(idCategory);
  useEffect(() => {
    getItems().then( result => {
      setProductos(result);
      setShowLoading(false);
    })
  }, []);
  const [productos, setProductos] = useState();
  const [showLoading, setShowLoading] = useState(true);
  const getItems = () => new Promise((res, rej) => {
      setTimeout(function(){
        const prod = [
          { id: 1, title: 'Prod 1', description: 'Prod 1 - des', price: 1500, stock: 12, pictureUrl: 'https://infoservice-cba.com.ar/wp-content/uploads/2019/07/Disco-Rigido-Solido-Ssd-A400-120gb-Kingston-Sata-Interno-7mm.jpg'},
          { id: 2, title: 'Prod 2', description: 'Prod 2 - des', price: 200, stock: 15, pictureUrl: 'https://infoservice-cba.com.ar/wp-content/uploads/2019/07/Disco-Rigido-Solido-Ssd-A400-120gb-Kingston-Sata-Interno-7mm.jpg'},
          { id: 3, title: 'Prod 3', description: 'Prod 3 - des', price: 9500, stock: 19, pictureUrl: 'https://infoservice-cba.com.ar/wp-content/uploads/2019/07/Disco-Rigido-Solido-Ssd-A400-120gb-Kingston-Sata-Interno-7mm.jpg'}
        ];
        res(prod);
      }, 3000);
  });
  return (
      <>
        <Loader isLoading={showLoading} />
        { !showLoading ? 
          <div className="container">
            <div className="page-header">
              <h1>
                {title}
              </h1>
            </div>
            <div className="row">
                  <ItemList items={productos} /> 
            </div>
          </div> : ''
        }
      </>
  );
}
export default ItemListContainer;