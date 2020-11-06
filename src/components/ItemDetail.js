import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ItemCount from './ItemCount';

function ItemDetail({ item={} }) {
    const [buying, setBuying] = useState(false);
    const [quantity, setQuantity] = useState(0);
    function add(data) {
        setBuying(true);
        setQuantity(data);
    }
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
                            { !buying ? <ItemCount stock={ item.stock } initial="2" onAdd={add} /> : 
                            <>
                                <Link style={{textDecoration:"none"}} to={'/cart'}><button type="button" className="btn btn-success">Terminar compra</button></Link>
                            </>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ItemDetail;