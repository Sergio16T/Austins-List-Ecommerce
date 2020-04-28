import ItemComponent, { ItemButtons } from '../components/Item'; 
import { render, screen } from '@testing-library/react'; 
import { MockedProvider } from '@apollo/react-testing';
import { mockItem } from '../lib/testUtilities'; 

const item = mockItem();

const mocks = {};

describe('<Item/>', () => {
    it('renders and matches the snapshot', () => {
      const { container } = render(
        <MockedProvider>
          <ItemComponent item={item} />
        </MockedProvider>
      );
      expect(container).toMatchSnapshot();
    });

    it('renders the image', () => {
        const { container } = render(
            <MockedProvider>
              <ItemComponent item={item} />
            </MockedProvider>
          );
          const img = screen.getByAltText(item.title)
          expect(img).toBeInTheDocument; 
    });
    it('renders the priceTag and title', () => {
        const { container, debug } = render(
            <MockedProvider>
              <ItemComponent item={item} />
            </MockedProvider>
          );
          expect(screen.getByText("$50.00")).toBeInTheDocument(); 
          const link = container.querySelector('a'); 
          expect(link).toHaveTextContent(item.title); 
          expect(link).toHaveAttribute('href', '/item?id=123');
    });  

}); 

