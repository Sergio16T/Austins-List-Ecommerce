import React, { Component } from 'react';
import styled from 'styled-components';
import User from './User'; 
import CartItem from './CartItem'; 
import calculateTotal from '../lib/calculateTotal'; 
import formatMoney from "../lib/formatMoney"; 

const CartWrapper = styled.div`
    position: fixed; 
    height: 100%; 
    transform: ${props => props.isOpen ? "translateX(0)" : "translateX(100%)" }; 
    background: ${props => props.theme.offWhite}; 
    right: 0; 
    top: 0; 
    z-index: 5; 
    border-left: 2px solid ${props => props.theme.purple}; 
    transition: all 0.3s;
    overflow: hidden; 
		padding: 2rem; 
		.cartHeader {
			display: flex;
		}
		#closeX {
			opacity: .6; 
			cursor: pointer; 
			position: absolute;
			font-size: 2.4rem;  
			top: 10px; 
			right: 20px; 
			background: transparent; 
			border: none;
			outline: none; 
			&:hover {
				opacity: 1; 
			}
		}
		.deleteCartItem {
			display: flex; 
			opacity: .4; 
			cursor: pointer; 
			font-size: 1.8rem;  
			background: transparent; 
			border: none;
			outline: none; 
			&:hover {
				color: red; 
				opacity: 1; 
			}
		}
		#totalPrice{ 
			font-size: 1.8rem; 
		}
		@media (max-width: 600px) {
			padding: 1rem; 
		}
`; 

class Cart extends Component {
    render() {
        return (
					<User>
						{({data, loading, error}) => { 
							if(loading) return null; 
							const { user } = data;
							console.log('userPayload', user); 
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
								<div>
									<p id="totalPrice">{formatMoney(calculateTotal(user.cart))}</p>
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