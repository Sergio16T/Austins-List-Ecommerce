import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout'; 
import { Mutation } from 'react-apollo'; 
import Router from 'next/router'; 
import Nprogress from 'nprogress'; 
import PropTypes from 'prop-types'; 
import gql from 'graphql-tag'; 
import calculateTotal from '../lib/calculateTotal'; 
import { CURRENT_USER_QUERY } from './User'; 

const CREATE_ORDER_MUTATION = gql`
    mutation CREATE_ORDER_MUTATION($token: String!) {
        createOrder(token: $token) {
            id
						total 
						charge
						items {
							id
							title
						}
        }
    }
`; 

function totalItems(cart) {
    return cart.reduce((startValue, element) => {
        return startValue + element.quantity; 
    }, 0); 
}

class Checkout extends Component {
    onToken = async (res, createOrder) => {
				console.log(res.id); 
				this.props.toggleCart(false);
				const order = await createOrder({
					variables: { token: res.id }
				}).catch(err => {
					console.log(err.message);  
				}); 
				console.log(order); 
				Router.push({
					pathname: "/order", 
					query: {id: order.data.createOrder.id}
				});
			
    }
    render() {
        return (
						<Mutation 
						mutation={CREATE_ORDER_MUTATION}
						refetchQueries={[{ query: CURRENT_USER_QUERY }]}
						>
                {(createOrder, {error, loading}) => 
							<StripeCheckout
							amount={this.props.totalAmount}
							name="Austin's List"
							description={`Order of ${totalItems(this.props.cart)} items`}
							image={this.props.cart.length && this.props.cart[0].item ? this.props.cart[0].item.image : null}
							stripeKey="pk_test_lUHGmLxt0KGqdsIN20tuXiVw00Q2OwgjiR"
							currency="USD"
							email={this.props.email}
							token={(res) => this.onToken(res, createOrder)}
							>{this.props.children}</StripeCheckout>
            }
            </Mutation>
        );
    }
}

export default Checkout;