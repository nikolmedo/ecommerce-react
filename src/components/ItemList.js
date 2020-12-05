import React from 'react';
import Item from './Item';

function ItemList({ items }) {
    if (items) {
        return items.map((prod) => <Item key={ prod.id } item={prod} />);
    } else {
        return (
            <></>
        );
    }
}

export default ItemList;