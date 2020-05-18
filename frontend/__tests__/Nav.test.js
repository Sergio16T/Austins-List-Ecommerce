import { render, screen, act } from '@testing-library/react'; 
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
        const { container } = render(
            <MockedProvider mocks={notSignedInMocks}>
                    <Nav/>
            </MockedProvider>
        ); 
        await act( async() => {
            await wait()
        }); 
       
        const loginLink= screen.getByTestId('login'); 
        // const contactLink = screen.getByTestId('contact'); 
        const anchors = container.querySelectorAll('a'); 
        expect(anchors).toHaveLength(5); 
        expect(loginLink).toBeInTheDocument(); 
        // expect(contactLink).toBeInTheDocument(); 
        expect(container).toMatchSnapshot(); 
    }); 
    it('renders a more robust nav when signed in', async() => {
        useRouter.mockImplementation(() => ({
            route: "/",
            pathname: "/",
            query: "",
            asPath: "",
          }));
        const { container } = render(
            <MockedProvider mocks={signedInMocks}>
                    <Nav/>
            </MockedProvider>
        ); 
        await act( async() => {
            await wait()
        });
        const anchors = container.querySelectorAll('a'); 
        expect(anchors).toHaveLength(8); 
        expect(container).toMatchSnapshot(); 
        expect(screen.getByText('Shop')).toBeInTheDocument(); 
    }); 
    it('renders with cart items' , async () => {
        useRouter.mockImplementation(() => ({
            route: "/items",
            pathname: "/items",
            query: "",
            asPath: "",
          }));
        const { container, debug } = render(
            <MockedProvider mocks={signedInMocksWithCart}>
                    <Nav/>
            </MockedProvider>
        ); 
        await act( async () => {
            await wait(); 
        }); 
        // debug()
        const cartCount = screen.getByTestId('cartCount'); 
        expect(cartCount.innerHTML).toEqual("9"); 
    });
}); 