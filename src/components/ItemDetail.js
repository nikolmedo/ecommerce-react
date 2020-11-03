import React from 'react';
import ItemCount from './ItemCount';

function ItemDetail({ item={} }) {
    function add() {}
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-8">
                            <h1 className="text-left">{ item.title }</h1>
                            <p className="text-left">{ item.description }</p>
                        </div>
                        <div className="col-md-4">
                            <img className="img-fluid" src={ item.pictureUrl }/><br/>
                            <ItemCount stock={ item.stock } initial="2" onAdd={add} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ItemDetail;