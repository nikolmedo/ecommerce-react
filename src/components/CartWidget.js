import React from 'react';
import { Link } from 'react-router-dom';
import { useValueContext } from '../context/cartContext';

function CartWidget() {
    const { quantityItems } = useValueContext();
    let hidden = quantityItems > 0 ? { display: 'block' } : { display: 'none' };
    return (
        <Link to="/cart" style={hidden}>
            <ul className="navbar-nav ml-md-auto">
                <li style={{ position: "relative" }}>
                    <span className="navbar-text">
                        <a className="nav-item nav-link mr-md-2" href="#cart">
                            <svg width="20px" height="20px" viewBox="0 0 16 16" className="bi bi-cart" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                            </svg>
                        </a>
                    </span>
                    <span className="badge badge-light" style={{ fontSize: "60%", marginLeft: "-22px", marginTop: "17px", position: "fixed" }}>{quantityItems}</span>
                </li>
            </ul>
        </Link>
    );
}
export default CartWidget;