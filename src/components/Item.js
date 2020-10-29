import React from 'react';
import ItemCount from './ItemCount';

function Item({ item }) {
    function add() { }
    return (
        <>
            <div className="card" key={ item.id }>
                <h2>{ item.title }</h2>
                <h4>$ { item.price }</h4>
                <img src={ item.pictureUrl }/>
                <ItemCount stock={ item.stock } initial="2" onAdd={add} />
            </div>
        </>
    );
}

export default Item;