import React from 'react';


function StepPersonalData({ nextStep={}, nameInput={}, lastInput={}, phoneInput={}, mailInput={}, mailConfirmInput={} }) {

    function goToPayment() {
        nextStep();
    }

    // Formulario de datos personales del comprador (Paso 2)
    let disabled = nameInput.value === '' || lastInput.value === '' || phoneInput.value === '' || mailInput.value === '' || mailInput.value !== mailConfirmInput.value;
    return(
        <>
            <h1 style={{ marginTop:"20px" }}>Datos personales</h1>
            <div className="row">
                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="name">Nombre</label>
                        <input type="text" className="form-control" id="name" { ...nameInput } />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="lastname">Apellido</label>
                        <input type="text" className="form-control" id="lastname" { ...lastInput } />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="phone">Teléfono</label>
                        <input type="text" className="form-control" id="phone" { ...phoneInput } />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="mail">Mail</label>
                        <input type="text" className="form-control" id="mail" { ...mailInput } />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="mailConfirm">Confirmar mail</label>
                        <input type="text" className="form-control" id="mailConfirm" { ...mailConfirmInput } />
                    </div>
                </div>
            </div>
            <button className="btn btn-primary" disabled={disabled} onClick={goToPayment}>Continuar</button>
        </>
    )
}

export default StepPersonalData;