import { mount } from 'enzyme'; 
import { shallowToJson } from 'enzyme-to-json'; 
import SingleItem, { SINGLE_ITEM_QUERY } from '../components/SingleItem'; 
import { MockedProvider } from '@apollo/react-testing'; 
import { mockItem } from '../lib/testUtilities'; 
import { ItemButtons } from '../components/Item';
import { act } from 'react-dom/test-utils'; 
import wait from 'waait'; 

// const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount)); 

describe('<SingleItem/>', () => {
    it ('renders with correct data', async ()=> {
        const mocks = [{
            // when someone mackes a request with this combo 
            request: { query: SINGLE_ITEM_QUERY, variables: {id: '123' }},
            // return this fake data 
            result: { data: {
                item: mockItem()
            }, 
          }, 
        }]; 
     
        const wrapper = mount(
                <MockedProvider addTypename={false} mocks={mocks}>
                     <SingleItem id='123'/>
                </MockedProvider>
            ); 
    
			
       await wait(); 
 
        act(() => {
            wrapper.update(); 
            // console.log(wrapper.debug()); 
        }); 
        expect(shallowToJson(wrapper.find('h2'))).toMatchSnapshot(); 
        expect(shallowToJson(wrapper.find('img'))).toMatchSnapshot(); 
        expect(shallowToJson(wrapper.find('p'))).toMatchSnapshot(); 
				
		}); 
		it('Errors with a not found item', async ()=> {
			const mocks = [{
				request: { query: SINGLE_ITEM_QUERY, variables: { id: '123' }}, 
				result: { 
					errors: [{ message : 'Item not found '}]
				}
			}]; 

			const wrapper = mount(
				<MockedProvider addTypename={false} mocks={mocks}>
						 <SingleItem id='123'/>
				</MockedProvider>
		); 
		 await wait(); 
		 wrapper.update(); 
		//  console.log(wrapper.debug());
		 const item = wrapper.find('[data-test="graphql-error"]'); 
		 console.log(item.debug()); 
		 expect(item.text()).toContain("Item not found"); 
		 expect(shallowToJson(item)).toMatchSnapshot(); 
		}); 

})