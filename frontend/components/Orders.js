import React, { Component } from 'react';
import { Query } from 'react-apollo'; 
import gql from 'graphql-tag'; 
import { StyledOrderWrapper } from './styles/OrderStyles'; 
import formatMoney from '../lib/formatMoney'; 
import styled from 'styled-components'; 
import { format } from 'date-fns'; 

const ORDER_LIST_QUERY = gql`
    query ORDER_LIST_QUERY {
        orders(orderBy: createdAt_DESC){
            id
            total
            charge
            createdAt
            user {
                id
                name
                email
            }
            items {
                id
                title
                description
                image
                price
                quantity
            }
        }
    }
`; 

const OrderList = styled.div`
	width: 90%; 
	max-width: 1000px; 
	.orderRow {
		display: grid; 
		grid-template-rows: 1fr; 
		padding: 10px; 
		/* border: 1px solid ${props => props.theme.lightgray};  */
		box-shadow: ${props => props.theme.bs}; 
		margin: 20px 0; 
	}
	.orderDetails {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr; 
		align-items: center; 
		& > p {
			font-size: 1.2rem; 
			padding: 10px; 
		}
	}
	
	.itemRow {
		display: grid; 
		grid-template-columns: 1fr 6fr; 
		align-items: center; 
		.itemDetails {
			padding-left: 1rem; 
			& > p {
				font-size: 1.1rem;
			}
		}
	}
	@media (max-width: 600px) {
		.orderDetails {
		grid-template-columns: 1fr; 
		grid-template-rows: 2; 
		& > p {
			padding: 0 1rem; 
		}
		}
	}
`; 

class Orders extends Component {
    render() {
		return (
			<StyledOrderWrapper>
				<Query query={ORDER_LIST_QUERY}>
					{({data, error, loading}) => {
						if (loading) return null; 
						console.log(data); 
						const { orders } = data; 
						return (
							<div className="orderContainer">
								<OrderList>
									{orders.map(order => (
										<div className="orderRow" key={order.id}>
											<div className="orderDetails">
												<p>ID: {order.id}</p>
												<p>Order Total: {formatMoney(order.total)}</p>
												<p>Date: {format(new Date(order.createdAt), "MMMM d, yyyy h:mm a")}</p>
												<p>{order.items.length} products </p>
											</div>
											<div className="items">
											{order.items.map((item, index) => (
												<div className="itemRow" key={index}>
													<img width ="120" src={item.image}/>
													<div className="itemDetails">
														<h2>{item.title}</h2>
														<p> Quantity: {item.quantity}</p>
														<p> Each: {formatMoney(item.price)}</p>
													</div>
												</div>
											))}
											</div>
										</div>
									))}
								</OrderList>
							</div>
						)}}
				</Query>
			</StyledOrderWrapper>
		);
    }
}

export default Orders;