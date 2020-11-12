import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from './ItemDetail';
import Loader from './Loader';

function ItemDetailContainer() {
    const [producto, setProducto] = useState();
    const [showLoading, setShowLoading] = useState(true);
    const { idItem } = useParams();
    useEffect(() => {
        getItem(idItem).then( result => {
            setProducto(result);
            setShowLoading(false);
        })
      }, []);
      const getItem = (idItem) => new Promise((res, rej) => {
        setTimeout(function(){
          const prod = [
            { id: 1, title: 'Prod 1', description: 'Prod 1 - descripción larga para mostrar', price: 1500, stock: 12, pictureUrl: 'https://infoservice-cba.com.ar/wp-content/uploads/2019/07/Disco-Rigido-Solido-Ssd-A400-120gb-Kingston-Sata-Interno-7mm.jpg'},
            { id: 2, title: 'Prod 2', description: 'Prod 2 - descripción larga para mostrar', price: 200, stock: 15, pictureUrl: 'https://infoservice-cba.com.ar/wp-content/uploads/2019/07/Disco-Rigido-Solido-Ssd-A400-120gb-Kingston-Sata-Interno-7mm.jpg'},
            { id: 3, title: 'Prod 3', description: 'Prod 3 - descripción larga para mostrar', price: 9500, stock: 19, pictureUrl: 'https://infoservice-cba.com.ar/wp-content/uploads/2019/07/Disco-Rigido-Solido-Ssd-A400-120gb-Kingston-Sata-Interno-7mm.jpg'}
          ];
          res(prod.find(o => o.id === Number(idItem)));
        }, 3000);
    });
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