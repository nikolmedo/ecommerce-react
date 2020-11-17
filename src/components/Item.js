import React from 'react';
import { Link } from 'react-router-dom';

function Item({ item }) {
    return (
        <>
            <div className="col-md-4">
                <Link style={{textDecoration:"none"}} to={'/item/' + item.id}>
                    <div className="card" key={ item.id }>
                        <div className="card-header">
                            <img className="img-fluid" src={ item.pictureUrl }/>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">$ { item.price } - { item.title }</h5>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    );
}

export default Item;