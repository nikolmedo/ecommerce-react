import React from 'react';
import { Link } from 'react-router-dom';
// import ItemCount from './ItemCount';

function Item({ item }) {
    function add() { }
    return (
        <>
            <div className="col-md-4">
                <Link style={{textDecoration:"none"}} to={'/item/' + item.id}>
                    <div className="card" key={ item.id }>
                        <div className="card-header">
                            {/* <h5 className="card-title">{ item.title }</h5> */}
                            <img className="img-fluid" src={ item.pictureUrl }/>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">$ { item.price } - { item.title }</h5>
                            {/* <div className="row">
                                <div className="col-md-6">
                                    <img className="img-fluid" src={ item.pictureUrl }/>
                                </div>
                                <div className="col-md-6">
                                    <h5 className="card-title">$ { item.price }</h5>
                                    <div className="card" style={{ width:"100%" }}>
                                        <div className="card-body">
                                            <ItemCount stock={ item.stock } initial="2" onAdd={add} />
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        {/* <div className="card-footer">
                            <ItemCount stock={ item.stock } initial="2" onAdd={add} />
                        </div> */}
                    </div>
                </Link>
            </div>
        </>
    );
}

export default Item;