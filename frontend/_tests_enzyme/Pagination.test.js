import { mount } from 'enzyme'; 
import { shallowToJson } from 'enzyme-to-json'; 
import Items, { ALL_ITEMS_QUERY } from '../components/Items'; 
import Pagination, { PAGINATION_QUERY } from '../components/Pagination'; 
import { MockedProvider } from '@apollo/react-testing'; 
import { mockUser, mockItem } from '../lib/testUtilities'; 
import { act } from 'react-dom/test-utils'; 
import wait from 'waait';  


const mockPagination = (length) => {
    return [{
        request: { query: PAGINATION_QUERY }, 
        result: { 
            data: {
                itemsConnection: {
                    __typename: 'aggregate',
                    aggregate: {
                        __typename: 'count', 
                        count: length
                    }
                },
            },
        },
    }]
}

describe('<Pagination/>', () => {
    it('mounts with correct number of pages', async () => {
        const wrapper = mount(
            <MockedProvider mocks={mockPagination(8)}>
                <Pagination page={1}/>
            </MockedProvider>
        ); 
        await wait(); 
        wrapper.update(); 
        // console.log(wrapper.debug()); 
        expect(wrapper.find('p[data-test="pagecount"]').text()).toEqual('Page 1 of 2'); 
        const pagination = wrapper.find('div[data-test="pagination"]'); 
        console.log(pagination.debug()); 
        expect(shallowToJson(pagination)).toMatchSnapshot(); 
    });
    it('disables prev button on first page', async () => {
        const wrapper = mount(
            <MockedProvider mocks={mockPagination(8)}>
                <Pagination page={1}/>
            </MockedProvider>
        ); 
        await wait(); 
        wrapper.update(); 
        const prevBtn = wrapper.find('a#prev'); 
        const nextBtn = wrapper.find('a#next'); 
        expect(prevBtn.prop('aria-disabled')).toEqual(true); 
        expect(nextBtn.prop('aria-disabled')).toEqual(false); 
        // console.log(prevBtn.debug()); 
    }); 
    it('disables next button on last page', async () => {
        const wrapper = mount(
            <MockedProvider mocks={mockPagination(22)}>
                <Pagination page={6}/>
            </MockedProvider>
        ); 
        await wait(); 
        wrapper.update(); 
        const prevBtn = wrapper.find('a#prev'); 
        const nextBtn = wrapper.find('a#next'); 
        expect(prevBtn.prop('aria-disabled')).toEqual(false); 
        expect(nextBtn.prop('aria-disabled')).toEqual(true); 
        // console.log(prevBtn.debug()); 
    }); 
    it('enables next and prev button on page in the middle', async () => {
        const wrapper = mount(
            <MockedProvider mocks={mockPagination(22)}>
                <Pagination page={4}/>
            </MockedProvider>
        ); 
        await wait(); 
        wrapper.update(); 
        const prevBtn = wrapper.find('a#prev'); 
        const nextBtn = wrapper.find('a#next'); 
        expect(prevBtn.prop('aria-disabled')).toEqual(false); 
        expect(nextBtn.prop('aria-disabled')).toEqual(false); 
        // console.log(prevBtn.debug()); 
    }); 
});