import React from 'react';
import ItemCount from './ItemCount';

function ItemListContainer({ title }) {
    return (
        <div className="container">
            <h2>{title}</h2>
            <ItemCount stock="5" initial="2"  />
            <ItemCount stock="15" initial="6"  />
            <ItemCount stock="23" initial="5"  />
        </div>
    );
}
export default ItemListContainer;