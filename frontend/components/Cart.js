import React, { Component } from 'react';
import styled from 'styled-components';

const CartWrapper = styled.div`
    position: fixed; 
    height: 100%; 
    width: 400px; 
    transform: ${props => props.isOpen ? "translateX(0)" : "translateX(100%)" }; 
    background: ${props => props.theme.offWhite}; 
    right: 0; 
    top: 0; 
    z-index: 5; 
    border-left: 2px solid ${props => props.theme.purple}; 
    min-width: 500px; 
    transition: all 0.3s;
    overflow: hidden; 
`; 

class Cart extends Component {
    render() {
        return (
            <CartWrapper isOpen={this.props.isOpen}>
                <h2>Cart</h2>
            </CartWrapper>
        );
    }
}

export default Cart;