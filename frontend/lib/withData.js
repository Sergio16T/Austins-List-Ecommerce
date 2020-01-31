import withApollo from 'next-with-apollo'; 
import ApolloClient from 'apollo-boost'; 
import { endpoint } from '../config'; 

function createClient({ headers}) {
    return new ApolloClient({
        uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint, 
        // on each request pass the headers and setContext change credentials to 'include' for whether the user agent should send cookies from other domains in case of CORS
        request: operation => {
            operation.setContext({
                fetchOptions: {
                    credentials: 'include', // logged in cookies present ? include.  (default value is same-origin) 
                },
                headers, 
            }); 
        },
    }); 
}

export default withApollo(createClient); 