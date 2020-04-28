import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { StyledForm, StyledFormWrapper } from "./styles/FormStyles"; 
import Spinner from "./Spinner"; 

const REQUEST_RESET_MUTATION = gql`
    mutation REQUEST_RESET_MUTATION($email: String!) {
        requestReset(email: $email) {
          message
        }
    }
`; 

class RequestReset extends Component {
    state = {
        email: ''
    }
    handleInput = (e) => {
        const {name, value} = e.target; 
        this.setState({
            [name]: value
        }); 
    }
    render() {
        return (
			<StyledFormWrapper>
				<div className="formContainer">
					<Mutation
					mutation={REQUEST_RESET_MUTATION}
					variables={this.state}
					>
					{(reset, {error, loading, called}) => { 
						return (  
						<StyledForm 
						method="post"
						data-test="form" 
						onSubmit={async (e)=> {
							e.preventDefault(); 
							this.setState({spinner: true }); 
							const success = await reset(); 
							console.log(success); 
							this.setState({
									email: '', 
									spinner: false
							}); 
						}}>
							<Spinner spinner={this.state.spinner}/>
							<fieldset disabled={loading} aria-busy={loading}>
								<h2>Request a password reset</h2>
								{!error && !loading && called && <p>Success! Check 
										your email for a reset link</p>}
								<label htmlFor="email">
										Email
										<input 
										type="email" 
										name="email" 
										placeholder="Email" 
										value={this.state.email} 
										onChange={this.handleInput}
										required
										/>
								</label>
								<button type="submit"> Request Reset!</button>
							</fieldset>
						</StyledForm>)
					}}
					</Mutation>
				</div>
			</StyledFormWrapper>
        );
    }
}

export default RequestReset;
export { REQUEST_RESET_MUTATION }; 