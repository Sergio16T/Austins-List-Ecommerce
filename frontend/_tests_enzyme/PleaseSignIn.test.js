import { mount } from 'enzyme'; 
import PleaseSignIn from '../components/PleaseSignIn'; 
import { CURRENT_USER_QUERY } from '../components/User'; 
import { MockedProvider } from '@apollo/react-testing'; 
import { mockUser} from '../lib/testUtilities'; 
import { act } from 'react-dom/test-utils'; 
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

describe('<PleaseSignIn/>', () => {
    it('renders the sign in dialog to logged out users ', async () => {
        const wrapper = mount(
            <MockedProvider mocks={notSignedInMocks}>
                <PleaseSignIn/>
            </MockedProvider>
        ); 
        
        await wait(); 
        act( () => {
             wrapper.update(); 
        }); 
        console.log(wrapper.debug()); 
        expect(wrapper.text()).toContain("Sign In"); 
        expect(wrapper.find('SignIn').exists()).toBe(true); 
    }); 
    it('renders the child component when the user is signed in', async () => {
        const Child = () => <p>Child Component</p>; 
        const wrapper = mount(
            <MockedProvider mocks={signedInMocks}>
                <PleaseSignIn>
                    <Child/>
                </PleaseSignIn>
            </MockedProvider>
        ); 
        await wait(); 
        act( () => {
            wrapper.update(); 
       }); 
        console.log(wrapper.debug()); 
        expect(wrapper.find('Child').exists()).toBe(true); 
    });
})