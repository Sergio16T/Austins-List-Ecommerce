import React from 'react';
import Order from '../components/Order'; 

const OrderPage = props => {
    return (
        <Order id={props.query.id}/>
    );
};


export default OrderPage;