import React, { Component } from 'react';
import { Query } from 'react-apollo'; 
import {SINGLE_ITEM_QUERY} from './UpdateItem'; 
import styled from 'styled-components'; 
import formatMoney from '../lib/formatMoney'; 

const ItemWrapper = styled.div`
    position: relative; 
    padding-top: 100px; 
    /* position: relative; 
    background: #FAFAFA; */
    padding: 15% 35px;  
    background: linear-gradient(to Bottom, rgba(10,10,54,1) 100px, white 0%);  
    @media (max-width: 800px) {
        /* background: linear-gradient(to Bottom, rgba(10,10,54,1) 10%, white 0%);  
        padding: 15% 0;  */
    }
`;
const SingleItemStyles = styled.div`
    max-width: 1200px;
    box-shadow: ${props => props.theme.bs}; 
    display: grid; 
    grid-template-columns: 1fr 1fr; 
    grid-column-gap: 50px; 
    grid-auto-flow: column; 
    min-height: 800px; 
    background: white; 
    .gridContainer {
        display: flex; 
        position: relative; 
        .gridBox {
            height: 420px; 
        }
    }
    .itemBox {
        display: flex;
        text-align: center;
        flex-direction: column;
    }
    .itemTitle {
        font-size: 2rem; 
    }
    .itemDesc {
        font-size: 1.2rem; 
    }
    img {
        width: 100%; 
        height: 100%; 
        object-fit: contain; 
    }
    .details {
        margin: 3rem; 
        font-size: 2rem; 
    }
    @media (max-width: 900px) {
        /* margin-top: 20%;  */
        grid-template-columns: 1fr;
        grid-template-rows: .5fr 1fr; 
        .gridBox {
            height: auto; 
        }
    }
`;

class SingleItem extends Component {
    render() {
        return (
            <Query query={SINGLE_ITEM_QUERY} variables={{id: this.props.id}}>
                {({data, error, loading}) => {
                if(loading) return null; 
                if(error) return <p>{error.message}</p>
                if(!data.item) return <p>Item not found for {this.props.id}</p>
                const item = data.item; 
                if(data) console.log(data); 
                return (
                    <ItemWrapper>
                        <SingleItemStyles>
                            <div className="gridContainer">
                                <div className="gridBox">
                                <img src={data.item.largeImage} alt={data.item.title}/>
                                </div>
                            </div>
                            <div className="itemBox">
                               <h2 className="itemTitle">Viewing {data.item.title}</h2> 
                               <p className="itemDesc">{formatMoney(data.item.price)}</p>
                            </div>
                        </SingleItemStyles>
                    </ItemWrapper>
            
                )}}
            </Query>
        );
    }
}

export default SingleItem;

