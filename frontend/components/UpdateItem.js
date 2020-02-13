import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag'; 
import { StyledForm, StyledFormWrapper } from './styles/FormStyles'; 

//need to write query for single item to fill out the form with values from the current item use id from props
const UPDATE_ITEM_MUTATION = gql`
    mutation UPDATE_ITEM_MUTATION(
        $title: String
        $price: Int 
        $description: String 
        ) {
        updateItem(
            title: $title
            price: $price
            description: $description
            )
            {
                id
            }
        }
`; 

class UpdateItem extends Component {
    render() {
        return (
            <StyledFormWrapper>
                <div className="formContainer">
                <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
                    {(updateItem, {error, loading}) => (
                    <StyledForm onSubmit={updateItem}>
                        <fieldset disabled={loading}>
                            <label htmlFor="title">
                                Title
                                <input 
                                type="text"
                                name="title"
                                id="title"
                                placeholder="title"
                                />
                            </label>
                            <label htmlFor="price">
                                Price
                                <input
                                type="number"
                                name="price"
                                id="price"
                                placeholder="price"
                                />
                            </label>
                            <label htmlFor="description">
                                Description
                                <textarea
                                name="description"
                                id="description"
                                placeholder="Enter a Description"
                                />
                            </label>
                            <button type="submit">Save Changes</button>
                        </fieldset>
                    </StyledForm>
                    )}
                </Mutation>
           </div>
           </StyledFormWrapper>
        );
    }
}

export default UpdateItem;