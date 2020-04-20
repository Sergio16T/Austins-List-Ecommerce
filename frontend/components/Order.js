import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo'; 
import gql from 'graphql-tag'; 
import styled from 'styled-components'; 
import PropTypes from 'prop-types'; 
import Head from 'next/head';
import { format } from 'date-fns'; 
import formatMoney from '../lib/formatMoney'; 

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

const StyledOrderWrapper = styled.div`
    background: linear-gradient(to Bottom, rgba(10,10,54,1) 85px, white 0%); 
    height: 100vh; 
    position: relative;
    .orderContainer {
        padding: 200px 0; 
        width: 100%; 
        display: flex; 
        justify-content: center; 
    }
`; 
const OrderConfirmation = styled.div`
    box-shadow: ${props => props.theme.bs}; 
    max-width: 1000px; 
    width: 100%; 
    padding: 2rem; 
    width: 60%; 
    & > p {
        font-size: 1.2rem;
        /* padding-left: 2rem;  */
        padding-bottom: 1rem; 
        border-bottom: 1px solid ${props => props.theme.lightgray} 
    }
   #order_header{
       /* padding-left: 2rem;  */
       font-size: 1.6rem; 
       padding-bottom: 1rem; 
   }
    .orderItemRow {
        display: grid; 
        grid-template-columns: 1fr 2fr; 
        padding: 1rem 0; 
        align-items: center; 
        .itemDetails {
            padding-left: 2rem; 
            h2 {
                font-size: 1.4rem; 
            }
            & > p {
            font-size: 1.2rem; 
        }
        }
        .orderItemImage {
            width: 140px; 
            height: auto; 
        }
      
    }
    @media (max-width: 600px) {
        width: 75%; 
        .orderItemRow {
        grid-template-columns: 1fr; 
          .itemDetails {
              padding: 0; 
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
                                            <img className="orderItemImage" src={item.image} alt={item.title}/>
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
                    )
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