import { render, screen, act } from '@testing-library/react'; 
import PleaseSignIn from '../components/PleaseSignIn'; 
import { CURRENT_USER_QUERY } from '../components/User'; 
import { MockedProvider } from '@apollo/react-testing'; 
import { mockUser } from '../lib/testUtilities'; 
import wait from 'waait'; 


const notSignedInMocks = [{ 
    request: { query: CURRENT_USER_QUERY}, 
    result: { data: { user: null } }, 
}, 
]; 

const signedInMocks = [{
request: { query: CURRENT_USER_QUERY }, 
result: { data: { user: mockUser() } }, 
}];

describe('<PleaseSignIn/>', ()=> {
    it('renders the sign in component for logged out users', async () => {
        const { container, getByTestId } = render(
        <MockedProvider mocks={notSignedInMocks}>
            <PleaseSignIn/>
        </MockedProvider>
        ); 
        await act( async()=> {
            await wait(); 
        }); 
        expect(getByTestId('pleaseSignin')).toBeInTheDocument(); 
        expect(container).toMatchSnapshot(); 
    }); 
    it('renders the child component when user is logged in', async () => {
        const Child = () => <p>Child</p>; 
        const { container, getByText } = render(
            <MockedProvider mocks={signedInMocks}>
                <PleaseSignIn>
                    <Child/>
                </PleaseSignIn>
            </MockedProvider>
        ); 
        await act( async () => {
            await wait(); 
        });
        expect(getByText(/Child/)).toBeInTheDocument(); 
    })
})