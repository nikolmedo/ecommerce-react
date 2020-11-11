import React, { useContext, useState } from 'react';

export const CartContext = React.createContext([]);
export const useValueContext = () => useContext(CartContext);


export default function CartProvider({ children = [], defaultCart = [] }) {
    const [cart, setCart] = useState(defaultCart); // [ item1, item2, item3 ]
    // Nuestro almacen de estado de compra
    // Funciona como nuestra propia API

    // Por ejemplo
    function addItem(item, quantity) {
        // revisa si existe el producto
        let obj = cart.find(o => o.item.id === item.id);
        if (obj == undefined) {
            setCart([...cart, { item, quantity }]);
        }
        console.log(cart);
    }

    function removeItem(itemId) {
        // Remueve un item por id y actualiza el estado
        var filteredArray = cart.filter(e => e.item.id !== itemId);
        setCart(filteredArray);
    }

    function clearCart() {
        setCart([]);
    }

    return <CartContext.Provider value={{ cart, addItem, removeItem, clearCart }}>
        {children}
    </CartContext.Provider>
}
