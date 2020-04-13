import React from 'react';
import { useMutation } from 'react-apollo'; 
import gql from 'graphql-tag'; 
import styled from 'styled-components';
import RemoveFromCart from './RemoveFromCart'; 
import formatMoney from "../lib/formatMoney";
import { CURRENT_USER_QUERY } from './User';

const UPDATE_CART_ITEM_MUTATION = gql`
    mutation UPDATE_CART_ITEM_MUTATION($updateType: String!, $id: ID!) {
        updateCartItem(updateType: $updateType, id: $id) {
            id
            quantity
        }
    }
`; 

const StyledCartItem = styled.div`
display: grid; 
grid-template-columns: 1fr 2fr .5fr; 
padding: 2rem 0; 
.cartItemImage {
    width: 120px; 
}
@media (max-width: 600px) {
    padding: 1rem 0; 
    .cartItemImage {
        width: 80px; 
    }
}
`; 

const CartItemDescription = styled.div`
    padding-left: 2rem;
.cartitem_title{
    margin-top: 0; 
    font-size: 1.2rem;
}
.priceandquantity {
    display: flex; 
    flex-direction: row; 
}
`; 
const QuantityDiv = styled.div`
    display: flex;
    flex-direction: row; 
    font-size: 1.6rem; 
    padding-left: 2rem; 
    align-items: center; 
.cartItem_Quantity, .minus, .plus {
    padding:  0 .75rem; 
    margin: 0; 
}
.minus, .plus {
    outline: none; 
    border: none; 
    background: transparent; 
    font-size: 1.6rem; 
    cursor: pointer; 
}
.cartitem_price {
    font-size: 1.2rem; 
}
`; 
const CartItem = (props) => {
    const [updateCartItem, { data }] = useMutation(UPDATE_CART_ITEM_MUTATION); 
	const { item } = props.cartItem; 
	return (
		<StyledCartItem>
			<img className="cartItemImage" src={item.image}/> 
			<CartItemDescription>
				<p className="cartitem_title">{item.title}</p>
				<div className="priceandquantity">
					<p className="cartitem_price">{formatMoney(item.price)}</p>
					<QuantityDiv>
						<button className="minus" type="button" onClick={() => {
                            updateCartItem({variables: { updateType: "subtract", id: props.cartItem.id}}); 
                        }} disabled={props.cartItem.quantity === 1}>-</button>
						<p className="cartItem_Quantity">{props.cartItem.quantity}</p>
						<button className="plus" onClick={() => {
                            updateCartItem({variables: { updateType: "add", id: props.cartItem.id}}); 
                        }}>+</button>
					</QuantityDiv>
				</div>
			</CartItemDescription>
			
			<RemoveFromCart id={props.cartItem.id}/>
		</StyledCartItem>
	)
}

export default CartItem; 