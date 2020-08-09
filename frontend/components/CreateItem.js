import React, { Component } from 'react';
import { Mutation } from 'react-apollo'; 
import Router from 'next/router'; 
import gql from'graphql-tag'; 
import { StyledFormWrapper, StyledForm} from './styles/FormStyles'; 
import Spinner from './Spinner'; 
import { ALL_ITEMS_QUERY } from './Items'; 
import { PAGINATION_QUERY } from './Pagination'; 
import WithPagination from './WithPagination'; 
import { UploadPhotosDropNClick } from './Photos'; 

const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
        $title: String! 
        $description: String!
        $price: Int! 
        $image: [String]!
        $largeImage: [String]!
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
        price: '', 
        description: '',
        image: [],
        largeImage: [],
        errorMessage: '',
        uploadError: ''
    }

    dropFile = (files) => {
        if(!files.length) {
            this.setState({ fileError: 'No Files Provided'}); 
            return; 
        }
        this.setState({ spinner: true }); 
        const data = new FormData(); 
        data.append('file', files[0]); 
        data.append('upload_preset', 'AustinArts'); 
        this.handleUpload(data); 
    }
    uploadFile = (e) => {
        const files = e.target.files; 
        const data = new FormData(); 
        data.append('file', files[0]); 
        data.append('upload_preset', 'AustinArts'); 
        this.handleUpload(data); 
    
    }
    handleUpload = async (data) => {
        let images = [...this.state.image]; 
        let largeImages = [...this.state.largeImage]; 
        if(largeImages.length >= 6) return; 

        this.setState({ spinner: true }); 

        try {
            const res = await fetch('https://api.cloudinary.com/v1_1/dddnhychw/image/upload', {
                method: 'POST', 
                body: data  
            }); 
            const file = await res.json(); 
            if(file.hasOwnProperty('error')) throw file.error.message; 

            images.push(file.secure_url); 
            largeImages.push(file.eager[0].secure_url); 
            this.setState({
                image: images, 
                largeImage: largeImages, 
                spinner: false,
                fileError: ''
            }); 
            this.fileInput.value= ""; 
        }
        catch(err) {
            console.log(err); 
            this.setState({
                fileError: err, 
                spinner: false
            }); 
            return; 
        }
    }
    handleInput = (e) => {
        let regEx = /^\d+(\.\d{0,2})?$/; 
        const { value, type, name } = e.target; 
        let val = type === 'number' && value.length ? parseFloat(value) : value;  
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
    deletePhoto = (index) => {
        console.log(index); 
        const images = [...this.state.image]; 
        const largeImages = [...this.state.largeImage]; 
        images.splice(index, 1); 
        largeImages.splice(index,1); 

        this.setState({
            image: images, 
            largeImage: largeImages
        }); 
    }
    render() {
        let regEx2= /^\d+(\.\d{0,1})$/; 
        const { errorMessage } = this.state; 
        const setPrice = regEx2.test(this.state.price) ? this.state.price.toFixed(2) : this.state.price; 
        let page = Math.ceil((this.props.count+1)/4) 
        const skip =  page * 4 - 4;
        return (
            <Mutation 
            mutation={CREATE_ITEM_MUTATION} 
            variables={{...this.state, price: setPrice * 100}}
            refetchQueries={[
                { query: PAGINATION_QUERY }, 
                { query: ALL_ITEMS_QUERY, variables: {skip: skip} }, 
                { query: ALL_ITEMS_QUERY, variables: {skip: (page-1) * 4 - 4 }}
            ]}>
                {(createItem, {loading, error}) => (
                    <StyledFormWrapper>
                        <div className="formContainer">
                            <StyledForm 
                            data-test="form"
                            onSubmit={ async (e)=> {
                                e.preventDefault(); 
                                this.setState({ spinner: true });
                                let res = await createItem().catch(err => {
                                    if(err) {
                                        this.setState({ 
                                            spinner: false, 
                                            error: true
                                        }); 
                                        console.log(err.message); 
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
                                        // option 2 direct user to item page
                                        //pathname: "/item"
                                        // query: {id: res.data.createItem.id}
                                    }); 
                                }
                            }} 
                            errorMessage = {errorMessage}
                            >
                                <Spinner spinner={this.state.spinner}/>
                                {error && <p className="errorMessage">{error.message.replace("GraphQL error:", "")}</p>}
                                <fieldset disabled={loading} aria-busy={loading}>
                                    <div className="formheader">
                                            <h1 id="form_H1">Upload New Item</h1>
                                        </div>
                                    <UploadPhotosDropNClick
                                     inputRef={(el) => this.fileInput = el}
                                     dropFile={this.dropFile}
                                     uploadFile={this.uploadFile}
                                     image={this.state.image}
                                     largeImage={this.state.largeImage}
                                     description={this.state.description}
                                     deletePhoto={this.deletePhoto}
                                     fileError={this.state.fileError}
                                    />
                                    {/* <h2>Item Details</h2> */}
                                    <label htmlFor="title">
                                        Title
                                        <input
                                        type ="text" 
                                        id ="title" 
                                        name="title" 
                                        // placeholder="Title" 
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
                                        // placeholder="Price" 
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
                                        // placeholder="Enter a Description" 
                                        value={this.state.description}
                                        onChange={this.handleInput}
                                        required  
                                        />
                                    </label>
                                    <button type="submit" disabled={errorMessage ? true : false} aria-disabled={errorMessage ? true : false}> Submit </button>
                                </fieldset>
                            </StyledForm>
                        </div>
                    </StyledFormWrapper>
                )}
            </Mutation> 
        );
    }
}


export default WithPagination(CreateItem);
export { CreateItem, CREATE_ITEM_MUTATION }; 







    // uploadFile = async (e) => {
    //     let images = [...this.state.image]; 
    //     let largeImages = [...this.state.largeImage]; 

    //     if(largeImages.length >= 6) return; 

    //     console.log('uploading file'); 
    //     this.setState({ spinner: true }); 
    //     const files = e.target.files; 
    //     const data = new FormData(); 
    //     data.append('file', files[0]); 
    //     data.append('upload_preset', 'AustinArts'); 

    //     const res = await fetch('https://api.cloudinary.com/v1_1/dddnhychw/image/upload', {
    //         method: 'POST', 
    //         body: data  
    //     }); 
    //     const file = await res.json(); 
    //     console.log(file); 

    //     try {
    //         images.push(file.secure_url); 
    //         largeImages.push(file.eager[0].secure_url); 
    //         // this.setState({
    //         //     image: file.secure_url, 
    //         //     largeImage: file.eager[0].secure_url,
    //         //     spinner: false
    //         // }); 
    //         this.setState({
    //             image: images, 
    //             largeImage: largeImages, 
    //             spinner: false
    //         }); 
    //         this.fileInput.value= ""; 
    //     }
    //     catch(err) {
    //         this.setState({uploadError: err.message}); 
    //     }
    // }


{/* <label htmlFor="file" >
        Upload Images
        <input
        type ="file" 
        id ="file" 
        name="file" 
        placeholder="upload an image" 
        ref={(el) => this.fileInput = el}
        onChange={this.uploadFile}
        />
    </label>    
{this.state.largeImage && 
    <PhotosWrapper images={this.state.image}
    description={this.state.description}/>
} */}