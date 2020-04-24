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
    // this gets called as as we get response from server after mutation 
    update = (cache, payload) => {
        const data = cache.readQuery({ query: CURRENT_USER_QUERY}); 
        console.log('data', data); 
        console.log('payload', payload); 
        data.user.cart = data.user.cart.filter(cartItem => cartItem.id !== payload.data.deleteCartItem.id); 
        console.log('', data.user.cart); 
        cache.writeQuery({query: CURRENT_USER_QUERY, data: data }); 
    }
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