import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types'; 
import {StyledFormWrapper, StyledForm } from "./styles/FormStyles"; 
import { CURRENT_USER_QUERY } from './User'; 

const RESET_PASSWORD_MUTATION = gql`
    mutation RESET_PASSWORD_MUTATION($resetToken: String, $password: String!, $confirmPassword: String!) {
        resetPassword(resetToken: $resetToken, password: $password, confirmPassword: $confirmPassword){
            id
            name
            email
        }
    }
`; 

class Reset extends Component {
	static propTypes = {
		resetToken: PropTypes.string.isRequired
	}
	state = {
		password: "",
		confirmPassword: ""
	}
	handleInput = (e) => {
		const {name, value } = e.target; 
		this.setState({
			[name]: value
		}); 
	}
    render() {
			return (
				<StyledFormWrapper>
					<div className="formContainer">
						<Mutation
						mutation={RESET_PASSWORD_MUTATION}
						variables={{
							resetToken: this.props.resetToken, 
							password: this.state.password, 
							confirmPassword: this.state.confirmPassword
						}}
						refetchQueries={[{ query: CURRENT_USER_QUERY }]}
						>
							{(reset, {error, loading, called}) => {
								if(loading) return null; 
								return (
								<StyledForm>
									<fieldset method="post" onSubmit ={async (e) => {
										e.preventDefault(); 
										const res = await reset(); 
										console.log(res); 
										this.setState({
											confirmPassword: "", 
											password: ""
										}); 
									}}>
										{!loading && !error && called && <p>Success! 
											Your password has been reset 
										</p>
										}
										<label htmlFor="password">
											Password
											<input
											type="password"
											name="password"
											placeholder="Password"
											value={this.state.password}
											onChange={this.handleInput}
											/>
										</label>
										<label htmlFor="confirmPassword">
											Confirm Password
											<input
											type="password"
											name="confirmPassword"
											placeholder="Confirm Password"
											value={this.state.confirmPassword}
											onChange={this.handleInput}
											/>
										</label>
									</fieldset>
									<button type="submit"> Reset Password</button>
								</StyledForm>
								)}}
						</Mutation>
							
					</div>
				</StyledFormWrapper>
			);
    }
}

export default Reset;