import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo'; 
import Router from 'next/router'; 
import gql from'graphql-tag'; 
import { StyledFormWrapper, StyledForm} from './styles/FormStyles'; 
import Spinner from './Spinner'; 
import { ALL_ITEMS_QUERY } from './Items'; 
import { PAGINATION_QUERY } from './Pagination'; 

const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
        $title: String! 
        $description: String!
        $price: Int! 
        $image: String!
        $largeImage: String!
        ) {
        createItem(
            title: $title, 
            description: $description, 
            price: $price
            image: $image
            largeImage: $largeImage 
            ) {
            id
        }
    }
`; 
class CreateItem extends Component {
    state = {
        title: '', 
        price: 0, 
        description: '',
        image: '',
        largeImage: '',
        errorMessage: '',
        uploadError: ''
    }
    uploadFile = async (e) => {
        console.log('uploading file'); 
        this.setState({ spinner: true }); 
        const files = e.target.files; 
        const data = new FormData(); 
        data.append('file', files[0]); 
        data.append('upload_preset', 'AustinArts'); 

        const res = await fetch('https://api.cloudinary.com/v1_1/dddnhychw/image/upload', {
            method: 'POST', 
            body: data  
        }); 
        const file = await res.json(); 
        console.log(file); 

        try {
            this.setState({
                image: file.secure_url, 
                largeImage: file.eager[0].secure_url,
                spinner: false
            }); 
        }
        catch(err) {
            this.setState({uploadError: err.message}); 
        }
    }
    handleInput = (e) => {
        let regEx = /^\d+(\.\d{0,2})?$/; 
        const { value, type, name } = e.target; 
        let val = type === 'number' && value.length ? parseFloat(value) : value;  
        // console.log(regEx.test(val)); 
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
        let regEx2= /^\d+(\.\d{0,1})$/; 
        const { errorMessage } = this.state; 
        const setPrice = regEx2.test(this.state.price) ? this.state.price.toFixed(2) : this.state.price; 
        return (
            <StyledFormWrapper>
                <div className="formContainer">
                    <Query query={PAGINATION_QUERY}>
                        {({data, error, loading}) => {
                            if(loading) return null; 
                            const count = data.itemsConnection.aggregate.count; 
                            // console.log(count); 
                            let lastOnPage  = count/4 === 0; 
                            let page = Math.ceil((count+1)/4) 
                            // console.log(page); 
                            let skip = page * 4 - 4;
                            // console.log(skip); 
                            return (
                        <Mutation 
                        mutation={CREATE_ITEM_MUTATION} 
                        variables={{...this.state, price: setPrice * 100}}
                        refetchQueries={[
                            { query: PAGINATION_QUERY }, 
                            { query: ALL_ITEMS_QUERY, variables: {skip: skip} }, 
                            { query: ALL_ITEMS_QUERY, variables: {skip: (page-1) * 4 - 4 }}
                        ]}
                        >
                            {(createItem, {loading, error}) => (
                            <StyledForm onSubmit={ async (e)=> {
                                e.preventDefault(); 
                                this.setState({ spinner: true });
                                let res = await createItem().catch(err => {
                                    if(err) {
                                        this.setState({ 
                                            spinner: false, 
                                            error: true
                                         }); 
                                    } else {
                                        this.setState({
                                            error: false
                                        }); 
                                    }  
                                }); 
                                this.setState({ spinner: false }); 
                                console.log(res); 
                                if(!this.state.error) {
                                    Router.push({
                                        pathname: "/items", 
                                        query: {page: page}
                                        // query: {id: res.data.createItem.id}
                                    }); 
                                }
                            }} 
                            errorMessage = {errorMessage}
                            >
                                <Spinner spinner={this.state.spinner}/>
                                {error && <p className="errorMessage">{error.message.replace("GraphQL error:", "")}</p>}
                                <fieldset disabled={loading} aria-busy={loading}>
                                    <label htmlFor="file">
                                        Image
                                        <input
                                        type ="file" 
                                        id ="file" 
                                        name="file" 
                                        placeholder="upload an image" 
                                        onChange={this.uploadFile}
                                        />
                                    </label>
                                    {this.state.largeImage && <img width="250" src={this.state.image} alt={this.state.description}></img>}
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
                                    <button type="submit" disabled={errorMessage ? true : false} aria-disabled={errorMessage ? true : false}> Submit </button>
                                </fieldset>
                            </StyledForm>
                        )}
                        </Mutation> 
                    )}}
                </Query>
                </div>
            </StyledFormWrapper>
        );
    }
}

export default CreateItem;