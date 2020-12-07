import React from 'react';


function StepCartInfo({ nextStep={}, removeItem={}, cart={} }) {
    let total = 0;
    
    function next() {
        nextStep();
    }

    // Listado de items del carrito (Paso 1)
    function cartList() {
        return cart.map((item) => {
            function remove() {
                removeItem(item.item.id);
            }
            total += Number(item.item.price)*Number(item.quantity);
            return <>
                <li className="list-group-item" key={ item.item.id }>
                    <div className="row">
                        <div className="col-md-3 d-flex align-items-center justify-content-center">
                            <img alt="Imagen del producto" className="img-fluid" style={{ maxHeight: "150px" }} src={ item.item.pictureUrl }/>
                        </div>
                        <div className="col-md-6">
                            <h4 className="text-left">{ item.item.title }</h4>
                            {/* <p className="text-left">{ item.item.description }</p> */}
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

    // Contenedor del istado de items del carrito (Paso 1)
    return (
        <>
            <h1 style={{ marginTop:"20px" }}>Carrito</h1>
            <ul className="list-group">
                { cartList() }
                <li className="list-group-item active text-right">Precio total ${ total }</li>
            </ul>
            <br/>
            <div className="row">
                <div className="col-md-3 offset-md-9 text-right">
                    <button onClick={next} className="btn btn-success align-self-end">Continuar compra</button>
                </div>
            </div>
        </>
    )
}

export default StepCartInfo;