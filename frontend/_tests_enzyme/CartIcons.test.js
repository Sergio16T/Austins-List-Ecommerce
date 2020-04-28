import { shallow, mount } from 'enzyme'; 
import { shallowToJson } from 'enzyme-to-json'; 
import { CartIcons } from '../components/Nav'; 
//think of shallow as 1 level deep and mount as actually closely resembling what the browser sees.. mount is running it as if you were running it browser

const mockUser = {
    id: "123", 
    name: "ST", 
    email: "1@gmail.com", 
    permissions: ["ADMIN"], 
    cart: [{
        id: 'abc', 
        quantity: 2, 
        item: {
            id: 'dgh', 
            price: 15000, 
            image: 'www.dog.image.com',
            title: "puppy"
        }
        },
    ]

}
const mockUser2 = {
    id: "45", 
    name: "AC", 
    email: "*@gmail.com", 
    permissions: ["ADMIN"], 
    cart: [{
        id: '27', 
        quantity: 10, 
        item: {
            id: 'dgh', 
            price: 20000, 
            image: 'www.puppy.image.com',
            title: "puppy"
        }
        },
    ]

}

describe('CartCount', ()=> {
    it('renders', ()=> {
        shallow(<CartIcons user={mockUser}/>)
    }); 
    it('matches the snapshot', ()=> {
        const wrapper = shallow(<CartIcons user={mockUser}/>); 
        expect(shallowToJson(wrapper.find('span'))).toMatchSnapshot(); 
    }); 
    it('updates via props', () => {
        const wrapper = shallow(<CartIcons user={mockUser}/>); 
        expect(shallowToJson(wrapper.find('span'))).toMatchSnapshot(); 
        wrapper.setProps({ user: mockUser2 }); 
        expect(shallowToJson(wrapper.find('span'))).toMatchSnapshot(); 
    })
})