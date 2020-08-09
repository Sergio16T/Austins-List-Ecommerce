import React, { Component } from 'react';
import { Mutation } from 'react-apollo'; 
import gql from 'graphql-tag';
import { ALL_ITEMS_QUERY } from './Items'; 
import { PAGINATION_QUERY } from './Pagination';
import { CURRENT_USER_QUERY } from './User';

const DELETE_ITEM_MUTATION = gql`
    mutation DELETE_ITEM_MUTATION($id: ID!) {
        deleteItem(id: $id) {
            id
            title
        }
    }
`

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
            {query: CURRENT_USER_QUERY }
        ]}
        >
            {(deleteItem, {error, loading}) => 
                <button id="deleteBtn" onClick={async() => {
                    if(confirm("Are you sure you want to delete this item?")) { 
                    let res = await deleteItem().catch(err => {
                        alert(err.message); 
                    }); 
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