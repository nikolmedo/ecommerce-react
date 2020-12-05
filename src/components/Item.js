import React from 'react';
import { Link } from 'react-router-dom';

function Item({ item }) {
    return (
        <>
            <div className="col-md-4">
                <Link style={{textDecoration:"none"}} to={'/item/' + item.id}>
                    <div className="card" key={ item.id }>
                        <div className="card-header d-flex align-items-center justify-content-center" style={{ height:"300px" }}>
                            <img alt="Imagen del producto" className="img-fluid" style={{ maxHeight: "100%" }} src={ item.pictureUrl }/>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{ item.title }</h5>
                            <h5 className="text-muted">$ { item.price }</h5>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    );
}

export default Item;