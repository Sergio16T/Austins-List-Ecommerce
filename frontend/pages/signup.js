import React from 'react';
import SignUp from '../components/SignUp'; 
import { StyledFormWrapper } from '../components/styles/FormStyles';
import SignIn from '../components/SignIn'; 

const signup = props => {
    return (
        <StyledFormWrapper>
            <div className="formContainer accountSignUp">
                <SignIn/>
                <SignUp/> 
            </div>
        </StyledFormWrapper>
    );
};



export default signup;