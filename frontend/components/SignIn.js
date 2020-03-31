import React, { Component } from 'react';
import {StyledForm, StyledResetNote} from './styles/FormStyles'; 
import { Mutation } from 'react-apollo'; 
import gql from 'graphql-tag'; 
import Link from "next/link"; 
import { CURRENT_USER_QUERY } from './User'; 
import Spinner from './Spinner';  

const SIGNIN_MUTATION = gql`
    mutation SIGNIN_MUTATION($email: String!, $password: String!) {
        signin(email: $email, password: $password) {
            id
            name 
            email
        }
    }
`;


class SignIn extends Component {
    state = {
        email: '',
        password: '',
        spinner: false,
      }
      handleInput = (e) => {
        const {name, value} = e.target; 
        this.setState({
          [name]: value, 
        }); 
      }
    render() {
        return (
            <Mutation 
            mutation={SIGNIN_MUTATION} 
            variables={this.state}
            refetchQueries={[{ query: CURRENT_USER_QUERY} ]}>
                {(signin, {error, loading})=> {
                    return (
                    <StyledForm method="post" onSubmit={async (e) => {
                        e.preventDefault(); 
                        this.setState({spinner: true }); 
                        const res = await signin().catch(err => {
                            if(err) { 
                                this.setState({ spinner: false})
                                console.log(err.message); 
                            }
                        }); 
                        this.setState({
                        password: '', 
                        email: ''
                        }); 
                        this.setState({ spinner: false})
                    }} >
                        <Spinner spinner={this.state.spinner}/>
                        <fieldset disabled={loading} aria-busy={loading}>
                            <h2>Sign in</h2>
                            {error && <p className="errorMessage">{error.message.replace("GraphQL error:", "")}</p>}
                            <label htmlFor="email">
                                Email
                                <input
                                type ="text" 
                                // id ="email" 
                                name="email" 
                                placeholder="Enter your email address" 
                                value={this.state.email}
                                onChange={this.handleInput}
                                />
                            </label>
                            <label htmlFor="password">
                                Password
                                <input
                                type ="password" 
                                // id ="password" 
                                name="password" 
                                placeholder="Password" 
                                value={this.state.password}
                                onChange={this.handleInput}
                                required  
                                />
                            </label>
                            <button type="submit" > Sign In </button>
                        </fieldset>
                        <StyledResetNote>
                            <Link href="/reset">
                                <p id="resetNote">Forgot your Password? Request reset</p>
                            </Link>
                        </StyledResetNote>
                    </StyledForm>
                    )}}
            </Mutation>
        );
    }
}

export default SignIn;