import React, { useEffect, useState } from 'react';
import ItemDetail from './ItemDetail';

function ItemDetailContainer() {
    const [producto, setProducto] = useState();
    const [showLoading, setShowLoading] = useState(true);
    useEffect(() => {
        getItem().then( result => {
            setProducto(result);
            setShowLoading(false);
        })
      }, []);
      const getItem = () => new Promise((res, rej) => {
        setTimeout(function(){
          const prod = [
            { id: 1, title: 'Prod 1', description: 'Prod 1 - descripción larga para mostrar', price: 1500, stock: 12, pictureUrl: 'https://infoservice-cba.com.ar/wp-content/uploads/2019/07/Disco-Rigido-Solido-Ssd-A400-120gb-Kingston-Sata-Interno-7mm.jpg'},
            { id: 2, title: 'Prod 2', description: 'Prod 2 - descripción larga para mostrar', price: 200, stock: 15, pictureUrl: 'https://infoservice-cba.com.ar/wp-content/uploads/2019/07/Disco-Rigido-Solido-Ssd-A400-120gb-Kingston-Sata-Interno-7mm.jpg'},
            { id: 3, title: 'Prod 3', description: 'Prod 3 - descripción larga para mostrar', price: 9500, stock: 19, pictureUrl: 'https://infoservice-cba.com.ar/wp-content/uploads/2019/07/Disco-Rigido-Solido-Ssd-A400-120gb-Kingston-Sata-Interno-7mm.jpg'}
          ];
          res(prod[0]);
        }, 3000);
    });
    return (
        <>
            { showLoading ? <>
                    <div style={{ marginTop:"80px" }} className="spinner-grow text-primary" role="status" display={false}>
                        <span className="sr-only">Loading...</span>
                    </div>
                </> : <>
                    <div style={{ marginTop:"40px" }} className="container">
                        <ItemDetail item={producto} />
                    </div>
                </>
            }
        </>
    );
}

export default ItemDetailContainer;