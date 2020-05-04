import { render, screen, act } from '@testing-library/react'; 
import Pagination, { PAGINATION_QUERY } from '../components/Pagination'; 
import { MockedProvider } from '@apollo/react-testing'; 
import { mockUser, mockCartItem } from '../lib/testUtilities'; 
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
        const { container } = render(
            <MockedProvider mocks={mockPagination(18)}>
                <Pagination page={1}/>
            </MockedProvider>
        ); 
        await act( async() => {
            await wait(); 
        }); 
        expect(screen.getByText("Page 1 of 5")).toBeInTheDocument(); 
        expect(container).toMatchSnapshot(); 
    }); 
    it('disables prev button when on page 1', async () => {
        const { container, findByTestId, debug, getByText } = render(
            <MockedProvider mocks={mockPagination(10)}>
                <Pagination page={1}/>
            </MockedProvider>
        ); 
        await findByTestId("pagination"); 
        // debug(); 
        expect(getByText(/Prev/)).toHaveAttribute('aria-disabled', 'true'); 
        expect(getByText(/Next/)).toHaveAttribute('aria-disabled', 'false'); 
    });
    it('disables next button when on last page', async () => {
        const { container, findByTestId, debug, getByText } = render(
            <MockedProvider mocks={mockPagination(10)}>
                <Pagination page={3}/>
            </MockedProvider>
        ); 
        await findByTestId("pagination"); 
        // debug(); 
        expect(getByText(/Prev/)).toHaveAttribute('aria-disabled', 'false'); 
        expect(getByText(/Next/)).toHaveAttribute('aria-disabled', 'true'); 
    });

}); 