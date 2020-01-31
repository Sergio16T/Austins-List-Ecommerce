import React, { Component } from 'react';
import { Query } from 'react-apollo'; 
import gql from 'graphql-tag';
import Item from './Item';
import { ItemStyles } from './styles/ItemStyles'; 
import styled from 'styled-components';

const ALL_ITEMS_QUERY = gql`
    query ALL_ITEMS_QUERY {
        items {
            id
            title
            price
            description
            image 
            largeImage
        }
    }
`; 

const StyledItemContainer = styled.div`
    display: grid; 
    grid-template-columns: 1fr 1fr; 
    grid-gap: 60px; 
    padding: 5%; 
    max-width: 1000px;
    margin: 0 auto; 
    background-color: transparent; 
    padding-top: 250px;  
    text-align: center; 
`; 

const StyledLoadMessage = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 10px;
    height: 20px;
    width: 400px;
    transform: translate(-50%, -50%);
    background: white;
    #itemTitle {
        padding: 10px; 
    }
`; 
const Wrapper = styled.div``; 

class Items extends Component {
    render() {
        return (
            <Wrapper>
            <ItemStyles>
                <Query query={ALL_ITEMS_QUERY}
                >
                    {({ data, error, loading }) => { 
                        if (loading) return null; 
                        if (error) return <p> Error: {error.message}</p>
                        console.log('payload', data);
                        return <StyledItemContainer>
                                   {data.items.map(item => (
                                       <Item key={item.id} item={item}/>           
                                   ))}
                                </StyledItemContainer>  
                    }}
                </Query>
            </ItemStyles>
            </Wrapper>
        );
    }
}

export default Items;