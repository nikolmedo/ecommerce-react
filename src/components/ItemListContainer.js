import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore } from '../firebase';
import ItemList from './ItemList';
import Loader from './Loader';
import NotFound from './NotFound';

function ItemListContainer({ title }) {
  const { idCategory } = useParams();
  const [productos, setProductos] = useState();
  const [showLoading, setShowLoading] = useState(true);
  const [noResult, setNoResult] = useState(false);
  const [categoryNotFound, setCategoryNotFound] = useState(false);

  useEffect(() => {
    setCategoryNotFound(false);
    setShowLoading(true);
    
    const db = getFirestore();
    let itemCollection;
    // Si viene de /category/:idCategory filtra los items que sean de esa cateogoria
    if (idCategory !== undefined) {
      let categoryCollection = db.collection("category").where("key", "==", idCategory);
      categoryCollection.get().then((querySnapshot) => {
        if(querySnapshot.size === 0) {
          setCategoryNotFound(true);
          setShowLoading(false);
        } else {
          itemCollection = db.collection("items").where("idCategory", "==", querySnapshot.docs[0].id);
          getItems(itemCollection);
        }
      })
    // Si viene de la home, muestra todos los productos
    } else {
      itemCollection = db.collection("items");
      getItems(itemCollection);
    }
  }, [idCategory]);

  function getItems(itemCollection) {
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
  }

  if (noResult) {
    return ( 
      <NotFound error={"No se encontraron productos para la categoría"} />
    );
  } else if (categoryNotFound) {
    return (
      <NotFound error={"No se encontró la categoría"} />
    );
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