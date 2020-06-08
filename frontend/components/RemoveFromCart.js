import React, { Component } from 'react';
import { Mutation } from 'react-apollo'; 
import gql from 'graphql-tag'; 
import { CURRENT_USER_QUERY } from "./User"; 

const DELETE_CART_ITEM = gql`
    mutation DELETE_CART_ITEM($id: ID!) {
        deleteCartItem(id: $id) {
            id
        }
    }
`; 
class RemoveFromCart extends Component {
    render() {
        return (
            <Mutation 
            mutation={DELETE_CART_ITEM} 
            variables={{id: this.props.id}}
            refetchQueries={[{query: CURRENT_USER_QUERY }]}
            >
                {(deleteCartItem, {error, loading}) => {
                    return (
                    <button className="deleteCartItem" type="button" onClick={async () => {
                            await deleteCartItem().catch(err => alert(err.message)); 
                    }}>
                    &times;
                    </button>
                    ); 
                }}
           </Mutation>
        );
    }
}

export default RemoveFromCart;