import { mount } from 'enzyme'; 
import { shallowToJson } from 'enzyme-to-json'; 
import { CURRENT_USER_QUERY } from '../components/User'; 
import Nav from '../components/Nav'; 
import { MockedProvider } from '@apollo/react-testing'; 
import { mockUser, mockCartItem } from '../lib/testUtilities'; 
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

const signedInMocksWithCart=[{
    request: { query: CURRENT_USER_QUERY }, 
    result: { data: { user: {
        ...mockUser(), 
        cart: [mockCartItem(), mockCartItem(), mockCartItem() ]
        }, 
    	},
    },
}];

jest.mock("next/router", () => ({
    useRouter() {
      return {
        route: "",
        pathname: "",
        query: "",
        asPath: "",
      };
    },
  }));
//spyOn Creates a mock function similar to jest.fn but also tracks calls to object[methodName]. Returns a Jest mock function.
// creating a mockfunction of the mock I declared globally above for useRouter. This will track calls to useRouter
const useRouter = jest.spyOn(require("next/router"), "useRouter"); 

describe('<Nav/>', ()=> {
    it('renders a minimal nav when signed out ', async () => {
        // mockImplementation Accepts a function that should be used as the implementation of the mock.. mockImplemetation used to overwrite the original function when used with the useRouter value which is initalized with jest.spyOn() 
        useRouter.mockImplementation(() => ({
            route: "/",
            pathname: "/",
            query: "",
            asPath: "",
          }));
        const wrapper = mount(
            <MockedProvider mocks={notSignedInMocks}>
                    <Nav/>
            </MockedProvider>
        ); 
        await wait(); 
        wrapper.update(); 
        expect(wrapper.find('Link')).toHaveLength(2);   
        const Links = wrapper.find('Link'); 
        const nav = wrapper.find('ul[data-test="nav"]'); 
        expect(shallowToJson(Links)).toMatchSnapshot(); 
    }); 
    it('renders a more robust nav when signed in', async ()=> {
        useRouter.mockImplementation(()=> ({
            route: "/", 
            pathname: '/',
            query: "",
            asPath: ""
        })); 
        const wrapper = mount(
            <MockedProvider mocks={signedInMocks}>
                <Nav/>
            </MockedProvider>
        ); 
        await wait(); 
        wrapper.update();
        const Links = wrapper.find('Link'); 
        expect(Links).toHaveLength(4); 
        expect(shallowToJson(Links)).toMatchSnapshot(); 
		}); 
		it('renders with cartItems', async () => {
			useRouter.mockImplementation(()=> ({
				route: "/items", 
				pathname: '/items',
				query: "",
				asPath: ""
		})); 
		const wrapper = mount(
				<MockedProvider mocks={signedInMocksWithCart}>
						<Nav/>
				</MockedProvider>
		); 
		await wait(); 
		wrapper.update(); 
		const cartCount = wrapper.find('#cartCount'); 
		expect(cartCount.text()).toContain(9); 
		expect(shallowToJson(cartCount)).toMatchSnapshot(); 
		}); 
}); 