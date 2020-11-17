import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore } from '../firebase';
import ItemDetailContainer from './ItemDetailContainer';
// import { Spinner } from 'react-bootstrap';
import ItemList from './ItemList';
import Loader from './Loader';

function ItemListContainer({ title }) {
  useEffect(() => {
    const db = getFirestore();
    let itemCollection = db.collection("items");
    if (idCategory !== undefined) {
      itemCollection = db.collection("items").where("idCategory", "==", idCategory);
    }
    itemCollection.get().then((querySnapshot) => {
      if(querySnapshot.size === 0) {
        console.log('No hay resultados');
        setNoResult(true);
      } else {
        setNoResult(false);
      }
      setProductos(
        querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      )
      setShowLoading(false);
    });
  });
  const [productos, setProductos] = useState();
  const [showLoading, setShowLoading] = useState(true);
  const [noResult, setNoResult] = useState(false);
  const { idCategory } = useParams();
  if (noResult) {
    return ( 
    <div className="container">
      <div className="page-header">
        <h1>
          No se encontraron productos en esta categoria
        </h1>
      </div>
    </div>);
  }
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