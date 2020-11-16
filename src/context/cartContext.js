import React, { useContext, useState } from 'react';

export const CartContext = React.createContext([]);
export const useValueContext = () => useContext(CartContext);


export default function CartProvider({ children = [], defaultCart = [] }) {
    const [cart, setCart] = useState(defaultCart);
    const [quantityItems, setQuantityItems] = useState(0);
    // Nuestro almacen de estado de compra
    // Funciona como nuestra propia API

    // Por ejemplo
    function addItem(item, quantity) {
        // revisa si existe el producto
        let obj = cart.find(o => o.item.id === item.id);
        if (obj == undefined) {
            setQuantityItems(Number(quantityItems) + Number(quantity));
            setCart([...cart, { item, quantity }]);
        }
    }

    function removeItem(itemId) {
        // Remueve un item por id y actualiza el estado
        var filteredArray = cart.filter(e => e.item.id !== itemId);
        setCart(filteredArray);
        recalculate(filteredArray);
    }

    function recalculate(filteredArray) {
        let quantity = 0;
        filteredArray.map((item) => quantity += Number(item.quantity) );
        setQuantityItems(Number(quantity));
    }

    function clearCart() {
        setCart([]);
    }

    return <CartContext.Provider value={{ cart, quantityItems, addItem, removeItem, clearCart }}>
        {children}
    </CartContext.Provider>
}
