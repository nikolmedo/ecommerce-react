import React from 'react';
import { Link } from 'react-router-dom';
import { useValueContext } from '../context/cartContext';

function Cart() {
    const { cart, removeItem } = useValueContext();
    let total = 0;
    // cart.map((item) => total += Number(item.item.price)*Number(item.quantity));

    function cartList() {
        return cart.map((item) => {
            function remove() {
                removeItem(item.item.id);
            }
            total += Number(item.item.price)*Number(item.quantity);
            return <>
                <li className="list-group-item">
                    <div className="row">
                        <div className="col-md-3 text-left">
                            <img className="img-fluid" src={ item.item.pictureUrl }/>
                        </div>
                        <div className="col-md-6">
                            <h1 className="text-left">{ item.item.title }</h1>
                            <p className="text-left">{ item.item.description }</p>
                        </div>
                        <div className="col-md-3">
                            <p className="text-left">Cantidad: { item.quantity }</p>
                            <p className="text-left">Precio unidad: ${ item.item.price }</p>
                            <p className="text-left">Precio total: ${ Number(item.item.price)*Number(item.quantity) }</p>
                            <button className="btn btn-danger" onClick={remove}>Eliminar</button>
                        </div>
                    </div>
                </li>
            </>
        });
    }

    return (
        <>
            <div className="container">
                <h1>Carrito</h1>
                { cart.length === 0 ? <>
                        <h2>No hay productos</h2> 
                        <Link to={'/'}><button className="btn btn-success">Home</button></Link>
                    </> :
                    <ul className="list-group">
                        { cartList() }
                        <li className="list-group-item active text-right">Precio total ${ total }</li>
                    </ul>
                }
            </div>
        </>
    );
}

export default Cart;