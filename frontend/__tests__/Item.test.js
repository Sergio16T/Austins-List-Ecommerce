import ItemComponent, { ItemButtons } from '../components/Item'; 
import { shallow } from 'enzyme'; 
import { shallowToJson } from 'enzyme-to-json'; 

//these tests are somewhat brittle. Any changes made to layout etc in item, if I decide to change them will break the test

const mockItem = {
    id: "12eadsfasf",
    title: 'Green Shoe', 
    price: 5000,
    description: "Trainer", 
    image: "shoe.jpg", 
    largeImage: 'largeImage'
}

describe('<Item/>', () => {
    it('renders and matches the snapshot', () => {
        //to update snapshot press u 
        const wrapper = shallow(<ItemComponent item={mockItem}/>)
        expect(shallowToJson(wrapper)).toMatchSnapshot(); 
    }); 
    // it('renders price and title and displays properly', () => {
    //     const wrapper = shallow(<ItemComponent item={mockItem}/>); 
    //     const price = wrapper.find('p').at(1); 
    //     const title  = wrapper.find('a').at(0).text(); 
    //     // console.log(wrapper.debug()); 
    //     //if you need to go one level deeper in another component for example use .dive() or maybe .children
    //     // console.log('price', Price.text()); 
    //     // console.log(title); 
    //     expect(price.text()).toBe("$50.00");
    //     expect(title).toBe(mockItem.title);

    // }); 
    // it('renders images properly', () => { 
    //     const wrapper = shallow(<ItemComponent item={mockItem}/>); 
    //     const img = wrapper.find('img'); 
    //     expect(img.props().src).toBe(mockItem.image);
    //     expect(img.props().alt).toBe(mockItem.title);
    // }); 
    // it('renders button list properly', () => {
    //     const wrapper = shallow(<ItemComponent item={mockItem}/>); 
    //     console.log(wrapper.debug()); 
    //     const buttonList = wrapper.find(ItemButtons); 
    //     console.log(buttonList.debug()); 
    //     expect(buttonList.children()).toHaveLength(3); 
    //     expect(buttonList.find('Link')).toHaveLength(1); 
    //     expect(buttonList.find('AddToCart').exists()).toBe(true); 
    //     expect(buttonList.find('DeleteItem')).toHaveLength(1); 
    // }); 
});