import React from 'react';
import Items from '../components/Items'; 


const ItemsPage = props => {
    return (
        <Items page={parseFloat(props.query.page)|| 1}/>
    );
};


export default ItemsPage;