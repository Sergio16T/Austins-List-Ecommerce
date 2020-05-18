import React from 'react';
import SingleItem from '../components/SingleItem'; 
import PleaseSignIn from '../components/PleaseSignIn';

const SingleItemPage = props => {
    return (
        <PleaseSignIn>
             <SingleItem 
             id={props.query.id}
             cartIsOpen={props.cartIsOpen}
             toggleCart={props.toggleCart}
             />
        </PleaseSignIn>
       
    );
};


export default SingleItemPage;