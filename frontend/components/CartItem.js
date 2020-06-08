import React from 'react';
import { useMutation } from 'react-apollo'; 
import gql from 'graphql-tag'; 
import RemoveFromCart from './RemoveFromCart'; 
import formatMoney from "../lib/formatMoney";
import { StyledCartItem, CartItemDescription, QuantityDiv } from './styles/CartStyles'; 

const UPDATE_CART_ITEM_MUTATION = gql`
    mutation UPDATE_CART_ITEM_MUTATION($updateType: String!, $id: ID!) {
        updateCartItem(updateType: $updateType, id: $id) {
            id
            quantity
        }
    }
`; 


const CartItem = (props) => {
    const [updateCartItem, { data }] = useMutation(UPDATE_CART_ITEM_MUTATION); 
    const { item } = props.cartItem; 
    if(!item) { return ( 
        <StyledCartItem>
            <div></div>
            <p id="itemNA">This Item Has been Removed</p>
            <RemoveFromCart id={props.cartItem.id}/>
        </StyledCartItem> ); 
    }
	return (
		<StyledCartItem>
			<img className="cartItemImage" src={item.image[0]}/> 
			<CartItemDescription>
				<p className="cartitem_title">{item.title}</p>
				<div className="priceandquantity">
					<p className="cartitem_price">{formatMoney(item.price)}</p>
					<QuantityDiv>
						<button className="minus" type="button" onClick={() => {
                            updateCartItem({variables: { updateType: "subtract", id: props.cartItem.id}}); 
                        }} disabled={props.cartItem.quantity === 1} aria-disabled={props.cartItem.quantity === 1}>-</button>
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