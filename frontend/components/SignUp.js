import React, { Component } from 'react';
import { Mutation } from 'react-apollo'; 
import gql from 'graphql-tag'; 
import { StyledFormWrapper, StyledForm } from './styles/FormStyles';
import Spinner from './Spinner';  
import { CURRENT_USER_QUERY } from './User'; 

const SIGNUP_MUTATION =gql`
  mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
    signup(email: $email, name: $name, password: $password) {
      id
      name
      email
    }
  }
`;


class SignUp extends Component {
  state = {
    email: '',
    password: '',
    name: '',
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
            mutation={SIGNUP_MUTATION} 
            variables={this.state}
            refetchQueries={[{ query: CURRENT_USER_QUERY }]}
            >
              {(signup, { error, loading}) => {
                  return (
                    <StyledForm method="post" onSubmit={async (e) => {
                      e.preventDefault(); 
                      this.setState({spinner: true }); 
                      const res = await signup(); 
                      this.setState({
                        name: '', 
                        password: '', 
                        email: ''
                      }); 
                      this.setState({ spinner: false})
                    }} >
                        <Spinner spinner={this.state.spinner}/>
                        <fieldset disabled={loading} aria-busy={loading}>
                          <h2>Sign up for an account</h2>
                            <label htmlFor="name">
                                Name
                                <input
                                type ="text" 
                                // id ="name" 
                                name="name" 
                                placeholder="Name" 
                                value={this.state.name}
                                onChange={this.handleInput}
                                required  
                                />
                            </label>
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
                            <button type="submit"> Sign Up </button>
                        </fieldset>
                    </StyledForm>
                  )}}
                </Mutation>
       
        );
    }
}

export default SignUp;