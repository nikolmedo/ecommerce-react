import React, { useState } from 'react';

function ItemCount({ stock, initial, onAdd }) {
    const [current, setCurrent] = useState(initial);

    function subtract() {
        if (Number(current) > 0) {
            setCurrent(Number(current) - 1);
        }
    }
    
    function add() {
        if (Number(current) < stock) {
            onAdd(Number(current) + 1);
            setCurrent(Number(current) + 1);
        }
    }

    return (
        <>
            <div className="card" style={{ width:"10rem" }}>
                <div className="card-body">
                    <h5 className="card-title">Cantidad</h5>
                    <div className="border">
                        <svg onClick={subtract} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-dash-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                        </svg>
                        <span style={{ margin:"10px" }}>{current}</span>
                        <svg onClick={add} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-plus-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                        </svg>
                    </div>
                </div>
            </div>
        </>
    );
}
export default ItemCount;