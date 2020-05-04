import { render, screen, act } from '@testing-library/react'; 
import userEvent from '@testing-library/user-event'; 
import { MockedProvider } from '@apollo/react-testing'; 
import wait from 'waait'; 
import RequestReset, { REQUEST_RESET_MUTATION } from '../components/RequestReset'; 

const mocks = [{
    request: {
        query: REQUEST_RESET_MUTATION, 
        variables: { email: 'stapiafikes@gmail.com'}, 
    }, 
    result: {
        data: { requestReset: { message: 'Thank you!', __typename: 'SuccessMessage'}},
    },
},
];

describe('RequestReset', () => {
    it('renders the component', async()=> {
        const { container } = render(
        <MockedProvider>
            <RequestReset/>
        </MockedProvider>
        ); 
        expect(container).toMatchSnapshot(); 
    });
    it('requests a reset', async () => {
        const { container, getByText, getByPlaceholderText } = render(
            <MockedProvider mocks={mocks}>
                <RequestReset/>
            </MockedProvider>
        ); 
        userEvent.type(getByPlaceholderText('Email'), 'stapiafikes@gmail.com'); 
        userEvent.click(getByText(/Request Reset!/)); 
        const success = await screen.findByText("Success! Check your email for a reset link"); 
        expect(success).toBeInTheDocument(); 
    });
})