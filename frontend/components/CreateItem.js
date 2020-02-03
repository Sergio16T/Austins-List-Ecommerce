import React, { Component } from 'react';
import { Mutation } from 'react-apollo'; 
import Router from 'next/router'; 
import gql from'graphql-tag'; 
import { SellStyles, StyledForm} from './styles/FormStyles'; 

const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
        $title: String! 
        $description: String!
        $price: Int! 
        ) {
        createItem(
            title: $title, 
            description: $description, 
            price: $price
            ) {
            id
        }
    }
`; 
class CreateItem extends Component {
    state = {
        title: '', 
        price: undefined, 
        description: '', 
        errorMessage: ''
    }
    handleInput = (e) => {
        let regEx = /^\d+(\.\d{0,2})?$/; 
        const { value, type, name } = e.target; 
        let val = type === 'number' && value.length ? parseFloat(value) : value; 
        console.log(regEx.test(val)); 
        try {
            if ((typeof val === 'number') && !regEx.test(val)) {
                throw new Error('Only two decimal points please'); 
            }
        }
        catch(err) {
            console.log(err.message);
            this.setState({
                errorMessage: err.message
            }); 
        }
        if ((typeof val === 'number') && regEx.test(val)) {
            this.setState({
                errorMessage: ''
            }); 
        }
        this.setState({
            [name]: val
        }); 
    
    }
    render() {
        const { errorMessage } = this.state; 
        return (
            <SellStyles>
                <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
                    {(createItem, {loading, error}) => (
                    <StyledForm onSubmit={ async (e)=> {
                        e.preventDefault(); 
                        let res = await createItem(); 
                        //console.log(res); 
                        Router.push({
                            pathname: "/item", 
                            query: {id: res.data.createItem.id}
                        }); 
                    }} errorMessage = {errorMessage}>
                        <fieldset disabled={loading} aria-busy={loading}>
                            <label htmlFor="file">
                                Image
                                <input
                                type ="file" 
                                id ="file" 
                                name="file" 
                                placeholder="upload an image" 
                            
                                />
                            </label>
                            <label htmlFor="title">
                                Title
                                <input
                                type ="text" 
                                id ="title" 
                                name="title" 
                                placeholder="title" 
                                value={this.state.title}
                                onChange={this.handleInput}
                                required  
                                />
                            </label>
                            <label htmlFor="price" id="priceLabel">
                                {errorMessage ? errorMessage : 'Price'}
                                <input
                                type ="number" 
                                id ="price" 
                                name="price" 
                                placeholder="price" 
                                value={this.state.price}
                                step=".01"
                                onChange={this.handleInput}
                                required  
                                />
                            </label>
                            <label htmlFor="description">
                                Description
                                <textarea
                                id ="description" 
                                name="description" 
                                placeholder="Enter a Description" 
                                value={this.state.description}
                                onChange={this.handleInput}
                                required  
                                />
                            </label>
                            <button type="submit"> Submit </button>
                        </fieldset>
                    </StyledForm>
                )}
                </Mutation>
            </SellStyles>
        );
    }
}

export default CreateItem;