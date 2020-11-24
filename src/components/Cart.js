import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useValueContext } from '../context/cartContext';
import { getFirestore } from '../firebase';
import firebase from 'firebase/app';
import Stepper from 'bs-stepper';
import 'bs-stepper/dist/css/bs-stepper.min.css';
import { useEffect } from 'react';

function useTextInput({ defaultValue, extras }) {
    const [input, setInput] = useState(defaultValue);
    
    function onChange(evt) {
        setInput(evt.target.value);
    }
    return {
        type: "text",
        value: input,
        onChange,
        ...extras
    };
}

function Cart() {
    const { cart, removeItem, clearCart } = useValueContext();
    const [stepper, setStepper] = useState();
    const [buyer, setBuyer] = useState({});
    const [payment, setPayment] = useState({});
    const [finishOrder, setFinishOrder] = useState(false);
    const [orderId, setOrderId] = useState();
    let total = 0;
    let newOrder = { buyer: {}, items: {}, total: 0, date: '', payment: {} };

    // Formulario del comprador
    const nameInput = useTextInput({
        defaultValue: "",
        extras: { placeholder: "Nombre" }
    });
    const lastInput = useTextInput({
        defaultValue: "",
        extras: { placeholder: "Apellido" }
    });
    const mailInput = useTextInput({
        defaultValue: "",
        extras: { placeholder: "Mail" }
    });
    const phoneInput = useTextInput({
        defaultValue: "",
        extras: { placeholder: "Teléfono" }
    });

    // Formulario de la tarjeta
    const numTarInput = useTextInput({
        defaultValue: "",
        extras: { placeholder: "Número de tarjeta" }
    });
    const valHastaInput = useTextInput({
        defaultValue: "",
        extras: { placeholder: "Válida hasta" }
    });
    const nomApeTarInput = useTextInput({
        defaultValue: "",
        extras: { placeholder: "Nombre y apellido" }
    });
    const docTypeInput = useTextInput({
        defaultValue: "",
        extras: { placeholder: "Tipo" }
    });
    const docNumInput = useTextInput({
        defaultValue: "",
        extras: { placeholder: "Documento" }
    });

    useEffect(() => {
        if(cart.length !== 0 && !finishOrder) {
            let aux = new Stepper(document.querySelector('.bs-stepper'));
            setStepper(aux);
            aux.to(0);
        }
    }, [cart]);

    async function createOrder() {
        newOrder.items = cart.map((item) => ({ id: item.item.id, title: item.item.title, price: item.item.price, quantity: Number(item.quantity) }));
        newOrder.total = total;
        newOrder.payment = payment;
        newOrder.buyer = buyer;
        newOrder.date = firebase.firestore.FieldValue.serverTimestamp();

        const db = getFirestore();
        let orders = db.collection("orders");
        const id = await orders.add(newOrder);
        setOrderId(id.id);
        setFinishOrder(true);
        clearCart();
        next();
        console.log(id.id);
    }

    function next() {
        stepper.next();
    }

    function goToPayment() {
        setBuyer({ name: nameInput.value, last: lastInput.value, phone: phoneInput.value, email: mailInput.value });
        next();
    }

    function goToConfirm() {
        setPayment({ number: numTarInput.value, validate: valHastaInput.value, name: nomApeTarInput.value, docType: docTypeInput.value, docNum: docNumInput.value });
        next();
    }

    function cartList() {
        return cart.map((item) => {
            function remove() {
                removeItem(item.item.id);
            }
            total += Number(item.item.price)*Number(item.quantity);
            return <>
                <li className="list-group-item" key={ item.item.id }>
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

    function loadCart() {
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

    function loadPersonal() {
        return(
            <>
                <h1 style={{ marginTop:"20px" }}>Datos personales</h1>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="name">Nombre</label>
                            <input type="text" className="form-control" id="name" { ...nameInput } />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="lastname">Apellido</label>
                            <input type="text" className="form-control" id="lastname" { ...lastInput } />
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
                            <label htmlFor="phone">Teléfono</label>
                            <input type="text" className="form-control" id="phone" { ...phoneInput } />
                        </div>
                    </div>
                </div>
                <button className="btn btn-primary" onClick={goToPayment}>Continuar</button>
            </>
        )
    }

    function loadPayment() {
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
                            {/* <input type="text" className="form-control" id="docType" { ...docTypeInput } /> */}
                            <div className="form-group">
                                <label htmlFor="docType">Tipo</label>
                                <select className="form-control" id="docType" { ...docTypeInput }>
                                    <option>DNI</option>
                                    <option>DNI Ext</option>
                                    <option>LC</option>
                                    <option>LE</option>
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
                <button className="btn btn-primary" onClick={goToConfirm}>Continuar</button>
            </>
        )
    }

    function loadConfirm() {
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

    function loadFinish() {
        return(
            <>
            <div className="alert alert-success" role="alert">
                ¡Compra realizada con éxito!<br/>
                <span className="font-weight-bold text-muted">Su ID de compra es:</span> { orderId }
            </div>
            </>
        );
    }

    return (
        <>
            <div className="container" style={{ marginTop:"10px" }}>
                { cart.length === 0 && !finishOrder ? <>
                    <h2>No hay productos</h2> 
                    <Link to={'/'}><button className="btn btn-success">Home</button></Link>
                </> : <>
                    <div className="bs-stepper">
                        <div className="bs-stepper-header" role="tablist">
                            <div className="step" data-target="#products-part">
                                <button type="button" className="step-trigger" role="tab" aria-controls="products-part" id="products-part-trigger">
                                    <span className="bs-stepper-circle">1</span>
                                    <span className="bs-stepper-label">Revisar productos</span>
                                </button>
                            </div>
                            <div className="line"></div>
                            <div className="step" data-target="#personal-part">
                                <button type="button" className="step-trigger" role="tab" aria-controls="personal-part" id="personal-part-trigger">
                                    <span className="bs-stepper-circle">2</span>
                                    <span className="bs-stepper-label">Datos personales</span>
                                </button>
                            </div>
                            <div className="line"></div>
                            <div className="step" data-target="#payment-part">
                                <button type="button" className="step-trigger" role="tab" aria-controls="payment-part" id="payment-part-trigger">
                                    <span className="bs-stepper-circle">3</span>
                                    <span className="bs-stepper-label">Datos de pago</span>
                                </button>
                            </div>
                            <div className="line"></div>
                            <div className="step" data-target="#confirm-part">
                                <button type="button" className="step-trigger" role="tab" aria-controls="confirm-part" id="confirm-part-trigger">
                                    <span className="bs-stepper-circle">4</span>
                                    <span className="bs-stepper-label">Confirmar</span>
                                </button>
                            </div>
                            <div className="line"></div>
                            <div className="step" data-target="#finish-part">
                                <button type="button" className="step-trigger" role="tab" aria-controls="finish-part" id="finish-part-trigger">
                                    <span className="bs-stepper-circle">5</span>
                                    <span className="bs-stepper-label">Finalizado</span>
                                </button>
                            </div>
                        </div>
                        <div className="bs-stepper-content">
                            <div id="products-part" className="content" role="tabpanel" aria-labelledby="products-part-trigger">{ loadCart() }</div>
                            <div id="personal-part" className="content" role="tabpanel" aria-labelledby="personal-part-trigger">{ loadPersonal() }</div>
                            <div id="payment-part" className="content" role="tabpanel" aria-labelledby="payment-part-trigger">{ loadPayment() }</div>
                            <div id="confirm-part" className="content" role="tabpanel" aria-labelledby="confirm-part-trigger">{ loadConfirm() }</div>
                            <div id="finish-part" className="content" role="tabpanel" aria-labelledby="finish-part-trigger">{ loadFinish() }</div>
                        </div>
                    </div>
                </>}
            </div>
        </>
    );
}

export default Cart;