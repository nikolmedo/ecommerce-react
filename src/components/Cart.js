import React, { useState } from 'react';
import { useValueContext } from '../context/cartContext';
import { getFirestore } from '../firebase';
import firebase from 'firebase/app';
import Stepper from 'bs-stepper';
import 'bs-stepper/dist/css/bs-stepper.min.css';
import { useEffect } from 'react';
import NotFound from './NotFound';
import StepPersonalData from './StepPersonalData';
import StepPayment from './StepPayment';
import StepConfirm from './StepConfirm';
import StepFinish from './StepFinish';
import StepCartInfo from './StepCartInfo';

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
    let newOrder = { buyer: {}, items: {}, total: 0, date: '', payment: {}, estado: '' };

    // Formulario del comprador
    const nameInput = useTextInput({
        defaultValue: "",
        extras: { placeholder: "Nombre" }
    });
    const lastInput = useTextInput({
        defaultValue: "",
        extras: { placeholder: "Apellido" }
    });
    const phoneInput = useTextInput({
        defaultValue: "",
        extras: { placeholder: "Teléfono" }
    });
    const mailInput = useTextInput({
        defaultValue: "",
        extras: { placeholder: "Mail" }
    });
    const mailConfirmInput = useTextInput({
        defaultValue: "",
        extras: { placeholder: "Confirmar mail" }
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
        defaultValue: "DNI",
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
    }, [cart, finishOrder]);

    // Funcion que crea la orden en Firebase (paso final)
    async function createOrder() {
        cart.map((item) => {
            total += Number(item.item.price)*Number(item.quantity);
        });
        newOrder.items = cart.map((item) => ({ id: item.item.id, title: item.item.title, description: item.item.description, price: item.item.price, quantity: Number(item.quantity) }));
        newOrder.total = total;
        newOrder.payment = payment;
        newOrder.buyer = buyer;
        newOrder.date = firebase.firestore.FieldValue.serverTimestamp();
        newOrder.estado = 'generada';

        const db = getFirestore();
        let orders = db.collection("orders");
        const id = await orders.add(newOrder);
        setOrderId(id.id);
        setFinishOrder(true);
        clearCart();
        next();
        console.log(id.id);
    }

    // Avanzar visualmente el stepper
    function next() {
        stepper.next();
    }

    // Setear datos del comprador y avanzar al siguiente paso
    function goToPayment() {
        setBuyer({ name: nameInput.value, last: lastInput.value, phone: phoneInput.value, email: mailInput.value });
        next();
    }

    // Setear datos del pago y avanzar al paso final de confirmación de compra
    function goToConfirm() {
        setPayment({ number: numTarInput.value, validate: valHastaInput.value, name: nomApeTarInput.value, docType: docTypeInput.value, docNum: docNumInput.value });
        next();
    }

    return (
        <>
            <div className="container" style={{ marginTop:"10px" }}>
                { cart.length === 0 && !finishOrder ? <>
                    <div style={{ marginTop:"40px" }} className="container">
                        <NotFound error="No hay productos" />
                    </div>
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
                            <div id="products-part" className="content" role="tabpanel" aria-labelledby="products-part-trigger">
                                <StepCartInfo nextStep={next} removeItem={removeItem} cart={cart} />
                            </div>
                            <div id="personal-part" className="content" role="tabpanel" aria-labelledby="personal-part-trigger">
                                <StepPersonalData nextStep={goToPayment} nameInput={nameInput} lastInput={lastInput} phoneInput={phoneInput} mailInput={mailInput} mailConfirmInput={mailConfirmInput} />
                            </div>
                            <div id="payment-part" className="content" role="tabpanel" aria-labelledby="payment-part-trigger">
                                <StepPayment nextStep={goToConfirm} numTarInput={numTarInput} valHastaInput={valHastaInput} nomApeTarInput={nomApeTarInput} docTypeInput={docTypeInput} docNumInput={docNumInput} />
                            </div>
                            <div id="confirm-part" className="content" role="tabpanel" aria-labelledby="confirm-part-trigger">
                                <StepConfirm nextStep={createOrder} buyer={buyer} payment={payment} cart={cart} />
                            </div>
                            <div id="finish-part" className="content" role="tabpanel" aria-labelledby="finish-part-trigger">
                                <StepFinish orderId={orderId} />
                            </div>
                        </div>
                    </div>
                </>}
            </div>
        </>
    );
}

export default Cart;