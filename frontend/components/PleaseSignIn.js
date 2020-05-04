import { Query } from 'react-apollo'; 
import SignIn from "./SignIn"; 
import { CURRENT_USER_QUERY } from './User'; 
import { StyledFormWrapper } from './styles/FormStyles'; 

const PleaseSignIn = props => {
    return (
        <Query query={CURRENT_USER_QUERY}>
            {({data, loading}) => {
                // console.log(data); 
                if (loading) return null; 
                if(!data.user)  { return (
                    <StyledFormWrapper data-testid="pleaseSignin">
                        <div className="formContainer">
                            <SignIn/>
                        </div>
                    </StyledFormWrapper>
                )}
                return props.children; 
            }}
        </Query>
    );
};



export default PleaseSignIn;