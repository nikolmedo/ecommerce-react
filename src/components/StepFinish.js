import React from 'react';


function StepFinish({ orderId=0 }) {
    // Se muestra el ID de la orden generada (Paso 5)
    return(
        <>
        <div className="alert alert-success" role="alert">
            ¡Compra realizada con éxito!<br/>
            <span className="font-weight-bold text-muted">Su ID de compra es:</span> { orderId }
        </div>
        </>
    );
}

export default StepFinish;