import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo'; 
import gql from 'graphql-tag'; 
import PropTypes from 'prop-types'; 
import Head from 'next/head';
import { format } from 'date-fns'; 
import formatMoney from '../lib/formatMoney'; 
import { StyledOrderWrapper, OrderConfirmation } from './styles/OrderStyles'; 

const SINGLE_ORDER_QUERY = gql`
    query SINGLE_ORDER_QUERY($id: ID!) {
        order(id: $id) {
            id
            total
            charge
            createdAt
            items {
                id
                title
                image
                price
                quantity
            }
            user {
                id
                name
                email
            }
             
        }
    }
`; 


class Order extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired
    }
    render() {
        return (
            <StyledOrderWrapper>
                <Query query={SINGLE_ORDER_QUERY} variables={{id: this.props.id}}>
                    {({data, error, loading}) => {
                        if (loading) return null; 
                        console.log('data', data); 
                        const { order } = data; 
                        const date = new Date(order.createdAt); 
                        return (
                            <div className="orderContainer">
                                <Head>
                                    <title>Austin's List - Order {order.id}</title>
                                </Head>
                                <OrderConfirmation>
                                    <h2 id="order_header">Order Confirmation</h2>
                                    <p><span className="orderLabel">Order ID: </span>{order.id}</p>
                                    <p><span className="orderLabel">Order total:</span> {formatMoney(order.total)}</p>
                                    <p><span className="orderLabel">Date:</span> {format(date, 'MMMM d, yyyy h:mm a')}</p>
                                    <div className="items">
                                        {order.items.map(item => (
                                            <div key={item.id} className="orderItemRow">
                                                <img className="orderItemImage" src={item.image[0]} alt={item.title}/>
                                                <div className="itemDetails">
                                                    <h2>Title: {item.title}</h2>
                                                    <p>Quantity: {item.quantity}</p>
                                                    <p>Each: {formatMoney(item.price)}</p>
                                                    <p>Subtotal: {formatMoney(item.quantity * item.price)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </OrderConfirmation>
                            </div>
                        );
                    }}
                </Query>
            </StyledOrderWrapper>
           
        );
    }
}

const SEND_CONFIRMATION_EMAIL_MUTATION=gql`
    mutation SEND_CONFIRMATION_EMAIL_MUTATION($email: String!, $id: ID!, $amount: Int!, $createdAt: String!) {
        sendConfirmationEmail(email: $email, id: $id, amount: $amount, createdAt: $createdAt){
            message
        }
    }
`; 
class SendEmail  extends React.Component {
    componentDidMount(){
        this.props.sendConfirmationEmail(); 
    }
    render(){
        return null; 
    }
}
export default Order;

       {/* <Mutation 
        mutation={SEND_CONFIRMATION_EMAIL_MUTATION} 
        variables={{
            id: order.id, 
            email: order.user.email, 
            amount: order.total,
            createdAt: order.createdAt
        }}>
            {(sendConfirmationEmail, {error, loading}) => {
                return <SendEmail sendConfirmationEmail={sendConfirmationEmail}/>
            }}
        
        </Mutation> */}