import React, { Component } from 'react';
import { Mutation } from 'react-apollo'; 
import gql from 'graphql-tag';
import Router from 'next/router'; 
import { ALL_ITEMS_QUERY } from './Items'; 
import { PAGINATION_QUERY } from './Pagination';

const DELETE_ITEM_MUTATION = gql`
    mutation DELETE_ITEM_MUTATION($id: ID!) {
        deleteItem(id: $id) {
            id
            title
        }
    }
`

let query = gql`
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

class DeleteItem extends Component {
    render() {
        return (
        <Mutation 
        mutation={DELETE_ITEM_MUTATION} 
        variables={{id: this.props.id}}
        refetchQueries={[
            {query: ALL_ITEMS_QUERY, variables:{skip: this.props.page * 4 -4}},
            {query: ALL_ITEMS_QUERY, variables:{skip: (this.props.page - 1) * 4 -4}},
            {query: ALL_ITEMS_QUERY, variables:{skip: (this.props.page + 1) * 4 -4}},
            {query: PAGINATION_QUERY },
        ]}
        >
            {(deleteItem, {error, loading}) => 
                <button onClick={async() => {
                    if(confirm("Are you sure you want to delete this item?")) { 
                    let res = await deleteItem().catch(err => {
                        alert(err.message); 
                    }); 
                    console.log('delete res', res); 
                    // Router.push({
                    //     pathname: "/items", 
                    //     query: {page: this.props.page}
                    // }); 
                    }
                }}>{this.props.children}</button>
            }
        </Mutation>
        
        );
    }
}

export default DeleteItem;