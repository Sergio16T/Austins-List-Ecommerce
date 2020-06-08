import React, { Component } from 'react';
import { Query } from 'react-apollo'; 
import gql from 'graphql-tag';
import Item from './Item';
import { ItemStyles, StyledItemsWithPagination, StyledItemContainer } from './styles/ItemStyles'; 
import Pagination from './Pagination'; 

const ALL_ITEMS_QUERY = gql`
    query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = 4) {
        items(skip: $skip, first: $first, orderBy: createdAt_ASC) {
            id
            title
            price
            description
            image 
            largeImage
        }
    }
`; 


class Items extends Component {
    render() {
        return (
            <ItemStyles>
                <Query query={ALL_ITEMS_QUERY}
                variables={{skip: this.props.page * 4 - 4}}
                >
                    {({ data, error, loading }) => { 
                        if (loading) return null; 
                        if (error) return null; 
                        // console.log('payload', data);
                        return (
                            <StyledItemsWithPagination>
                                <Pagination page={this.props.page}/>
                                        <StyledItemContainer>    
                                            {data.items.map(item => (
                                                <Item 
                                                key={item.id} 
                                                item={item} 
                                                page={this.props.page}
                                                toggleCart={this.props.toggleCart}
                                                />           
                                            ))}
                                        </StyledItemContainer>  
                                <Pagination page={this.props.page}/>
                            </StyledItemsWithPagination>
                        )
                    }}
                </Query>
            </ItemStyles>
        );
    }
}

export default Items;
export { ALL_ITEMS_QUERY }
