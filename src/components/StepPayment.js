import React from 'react';


function StepPayment({ nextStep={}, numTarInput={}, valHastaInput={}, nomApeTarInput={}, docTypeInput={}, docNumInput={} }) {

    function goToConfirm() {
        nextStep();
    }

    // Formulario de datos de pago (Paso 3)
    let disabled = numTarInput.value === '' || valHastaInput.value === '' || nomApeTarInput.value === '' || docTypeInput.value === '' || docNumInput.value === '';
    return(
        <>
            <h1 style={{ marginTop:"20px" }}>Datos de pago</h1>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="numTar">Número de tarjeta</label>
                        <input type="text" className="form-control" id="numTar" { ...numTarInput } />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="valHasta">Válida hasta</label>
                        <input type="text" className="form-control" id="valHasta" { ...valHastaInput } />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="nomApeTar">Nombre y apellido impreso en la tarjeta</label>
                        <input type="text" className="form-control" id="nomApeTar" { ...nomApeTarInput } />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group">
                        <div className="form-group">
                            <label htmlFor="docType">Tipo</label>
                            <select className="form-control" id="docType" { ...docTypeInput }>
                                <option value="DNI">DNI</option>
                                <option value="DNIExt">DNI Ext</option>
                                <option value="LC">LC</option>
                                <option value="LE">LE</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group">
                        <label htmlFor="docNum">Documento</label>
                        <input type="text" className="form-control" id="docNum" { ...docNumInput } />
                    </div>
                </div>
            </div>
            <button className="btn btn-primary" disabled={disabled} onClick={goToConfirm}>Continuar</button>
        </>
    )
}

export default StepPayment;