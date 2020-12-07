import React from 'react';


function StepConfirm({ nextStep={}, buyer={}, payment={}, cart={} }) {
    let total = 0;
    cart.map((item) => {
        total += Number(item.item.price)*Number(item.quantity);
    });

    function createOrder() {
        nextStep();
    }

    // Se muestran los datos cargados para que el usuario confirme la compra (Paso 4)
    return(
        <>
            <h1 style={{ marginTop:"20px" }}>Confirmar compra</h1>
            <br/>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Datos comprador</h5>
                    <div className="row">
                        <div className="col-md-6 text-left"><span className="font-weight-bold text-muted">Nombre</span>: { buyer.name }</div>
                        <div className="col-md-6 text-left"><span className="font-weight-bold text-muted">Apellido:</span> { buyer.last }</div>
                        <div className="col-md-6 text-left"><span className="font-weight-bold text-muted">Telefono:</span> { buyer.phone }</div>
                        <div className="col-md-6 text-left"><span className="font-weight-bold text-muted">Mail:</span> { buyer.email }</div>
                    </div>
                </div>
            </div>
            <br/>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Datos tarjeta</h5>
                    <div className="row">
                        <div className="col-md-6 text-left"><span className="font-weight-bold text-muted">Número:</span> { payment.number }</div>
                        <div className="col-md-6 text-left"><span className="font-weight-bold text-muted">Válido hasta:</span> { payment.validate }</div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 text-left"><span className="font-weight-bold text-muted">Nombre:</span> { payment.name }</div>
                        <div className="col-md-3 text-left"><span className="font-weight-bold text-muted">Tipo:</span> { payment.docType }</div>
                        <div className="col-md-3 text-left"><span className="font-weight-bold text-muted">Documento:</span> { payment.docNum }</div>
                    </div>
                </div>
            </div>
            <br/>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Productos</h5>
                    {cart.map((item) => (
                        <>
                            <div className="row">
                                <div className="col-md-6 text-left"><span className="font-weight-bold text-muted">Producto:</span> { item.item.title }</div>
                                <div className="col-md-6 text-right"><span className="font-weight-bold text-muted"><span className="font-weight-bold text-muted">Cantidad:</span> { item.quantity } - Precio unitario:</span> ${ item.item.price }</div>
                            </div>
                        </>
                    ))}
                    <div className="row">
                        <div className="col-md-12 text-right"><span className="font-weight-bold text-muted">Total a pagar:</span> <span className="font-weight-bold">${ total }</span></div>
                    </div>
                </div>
            </div>
            <br/>
            <button className="btn btn-primary" onClick={createOrder}>Confirmar</button>
        </>
    )
}

export default StepConfirm;