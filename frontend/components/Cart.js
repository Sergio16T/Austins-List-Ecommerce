import React, { Component } from 'react';
import User from './User'; 
import CartItem from './CartItem'; 
import calculateTotal from '../lib/calculateTotal'; 
import formatMoney from "../lib/formatMoney"; 
import styled from 'styled-components';
import CartWrapper from './styles/CartStyles'; 
import Checkout from './Checkout'; 

class Cart extends Component {
    render() {
        return (
			<User>
				{({data, loading, error}) => { 
					if(loading) return null; 
					const { user } = data;
					// console.log('userPayload', user); 
					return (
					<CartWrapper isOpen={this.props.isOpen}>
						<div className="cartHeader">
						{user ? <h2>{user.name.split(" ")[0] + "'s"} Cart</h2> : <SignInMessage/>}

							<button id="closeX" type="button" onClick={() => this.props.toggleCart(false)}>
							&times;
							</button>
						</div>
						{user && 
						<React.Fragment>
							<div className="cartBody">
								{user.cart.map(cartItem => 
									<CartItem key={cartItem.id} cartItem={cartItem}/> 
								)}
							</div>
							<div className="cartFooter">
								<div className="cartTotal">
									<p id="totalLabel">Subtotal|</p> 
									<p id="totalPrice"> {formatMoney(calculateTotal(user.cart))}</p>
								</div>
								<Checkout 
								totalAmount={calculateTotal(user.cart)} 
								cart={user.cart} email={user.email}
								toggleCart={this.props.toggleCart}
								>
									<button id="checkout_btn" type="button" onClick={() => console.log('Checkout')} disabled={!user.cart.length ? true : false} aria-disabled={!user.cart.length ? true : false}> Checkout </button>
								</Checkout>
								
							</div>
						</React.Fragment>
						}	
					</CartWrapper>
				)}}
			</User>
        
        );
    }
}

const StyledMessage = styled.div`
	padding: 2rem; 
`; 
const SignInMessage = () => {
	return (
	<StyledMessage>
		<h2>Sign in to view cart items</h2>
	</StyledMessage>
	); 
}
export default Cart;