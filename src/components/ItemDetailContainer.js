import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore } from '../firebase';
import ItemDetail from './ItemDetail';
import Loader from './Loader';

function ItemDetailContainer() {
    const [producto, setProducto] = useState();
    const [showLoading, setShowLoading] = useState(true);
    const { idItem } = useParams();

    useEffect(() => {
      setShowLoading(true);
      const db = getFirestore();
      const itemCollection = db.collection("items").doc(idItem);
      // const itemFilter = itemCollection.where('id', '==', idItem);
      itemCollection.get().then((querySnapshot) => {
        if(!querySnapshot.exists) {
          console.log('No results');
        } else {
          setProducto({id: querySnapshot.id, ...querySnapshot.data()});
        }
        setShowLoading(false);
      });
    }, [idItem]);
    
    return (
        <>
            <Loader isLoading={showLoading} />
            { !showLoading ? 
            <div style={{ marginTop:"40px" }} className="container">
                <ItemDetail item={producto} />
            </div> : ''
            }
        </>
    );
}

export default ItemDetailContainer;