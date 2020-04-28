import { mount } from 'enzyme'; 
import wait from 'waait'; 
import { shallowToJson } from 'enzyme-to-json'; 
import { MockedProvider } from '@apollo/react-testing'; 
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

describe('<RequestReset/>',() => {
    it('renders and matches snapshot', async ()=> {
        const wrapper = mount(
            <MockedProvider>
                <RequestReset/>
            </MockedProvider>
        )
        // console.log(wrapper.debug()); 
        const form = wrapper.find('form[data-test="form"]'); 
        // console.log(form.debug()); 
        expect(shallowToJson(form)).toMatchSnapshot(); 
    }); 
   it('calls the mutation', async()=> {
    const wrapper = mount(
        <MockedProvider mocks={mocks}>
            <RequestReset/>
        </MockedProvider>
    ); 
    //simulate typing email input
    wrapper.find('input').simulate('change',{ target: { name: 'email', value: 'stapiafikes@gmail.com' } } );
    wrapper.find('form').simulate('submit');
    await wait(); 
    wrapper.update(); 
    expect(wrapper.find('p').text()).toContain('Success!'); 
   }); 
});