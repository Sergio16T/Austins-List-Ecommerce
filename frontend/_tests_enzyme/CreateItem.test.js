import { mount } from 'enzyme'; 
import wait from 'waait'; 
import { shallowToJson } from 'enzyme-to-json'; 
import { MockedProvider } from '@apollo/react-testing'; 
import CreateItem, { CREATE_ITEM_MUTATION } from '../components/CreateItem'; 
import { PAGINATION_QUERY } from '../components/Pagination'; 
import { ALL_ITEMS_QUERY } from '../components/Items'; 
import { mockUser } from '../lib/testUtilities'; 
import Router from 'next/router'; 

const mockItem2 = {
    __typename: 'Item',
    id: '123',
    user: mockUser(),
    title: 'Spring Fling Trainers', 
    description: 'High Top Trainers', 
    price: 15000, 
    image: 'www.SFT.cloudinary.com', 
    largeImage: 'www.SFTLG.cloudinary.com'
}; 
//mock the global fetch API 
global.fetch = jest.fn().mockResolvedValue({
    json: () => ({
        secure_url: 'www.SFT.cloudinary.com',
        eager: [{ secure_url: 'www.SFTLG.cloudinary.com' }]
    }) 
});

const mocks =[{
        request: { query: PAGINATION_QUERY }, 
        result: { 
            data: {
                itemsConnection: {
                    __typename: 'aggregate',
                    aggregate: {
                        __typename: 'count', 
                        count: 10
                    }
                },
            },
        },
    },
    { request: {
        query: CREATE_ITEM_MUTATION, 
        variables: { 
            title: mockItem2.title, 
            description: mockItem2.description, 
            price: mockItem2.price,  
            image: 'www.SFT.cloudinary.com',
            largeImage: 'www.SFTLG.cloudinary.com'
        }
    },
    result: {
        data: {
            createItem: {
                ...mockItem2, 
                __typename: 'Item', 
            },
        },
        // refetch: () => console.log('refetch mocked') 
    },  
}
]
  
describe('<CreateItem/>', () => {
    it('renders and matches snapshot', async() => {
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <CreateItem />
            </MockedProvider>
        ); 
        await wait(); 
        wrapper.update(); 
        // console.log(wrapper.debug()); 
        const form = wrapper.find('form[data-test="form"]'); 
        // console.log(form.debug()); 
        expect(shallowToJson(form)).toMatchSnapshot(); 
    }); 
    it('uploads a file ', async () => {
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <CreateItem />
            </MockedProvider>
        ); 
        await wait(); 
        wrapper.update(); 
        const input = wrapper.find('input[type="file"]');
        input.simulate('change', {target: { files: ['SpringFling.jpg'] }}); 
        await wait(); 
        const component = wrapper.find('CreateItem').instance(); 
        // console.log(component); 
        expect(component.state.image).toEqual('www.SFT.cloudinary.com'); 
        expect(component.state.largeImage).toEqual('www.SFTLG.cloudinary.com'); 
        expect(global.fetch).toHaveBeenCalled(); 
        //.toHaveBeenCalledWith also an option to test here 
        // wrapper.update(); 
        global.fetch.mockReset(); 
    }); 
    it('updates state', async () => {
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <CreateItem />
            </MockedProvider>
        ); 
        await wait(); 
        wrapper.update(); 
        wrapper.find('#title').simulate('change', { target: { name: 'title', value: mockItem2.title}}); 
        wrapper.find('#description').simulate('change', { target: { name: 'description', value: mockItem2.description }}); 
        wrapper.find('#price').simulate('change', { target: { name: 'price', value: 150 }}); 

        expect(wrapper.find('CreateItem').instance().state).toMatchObject({
            title: "Spring Fling Trainers", 
            price: 150, 
            description: "High Top Trainers"
        }); 

    }); 
    // it('creates an item when submited', async () => {
    //     const wrapper = mount(
    //         <MockedProvider mocks={mocks} >
    //             <CreateItem />
    //         </MockedProvider>
    //     ); 
    //     global.fetch = jest.fn().mockResolvedValue({
    //         json: () => ({
    //             secure_url: 'www.SFT.cloudinary.com',
    //             eager: [{ secure_url: 'www.SFTLG.cloudinary.com' }]
    //         }) 
    //     });
    //     await wait(); 
    //     wrapper.update(); 
    //     wrapper.find('#title').simulate('change', { target: { name: 'title', value: mockItem2.title }}); 
    //     wrapper.find('#description').simulate('change', { target: { name: 'description', value: mockItem2.description }}); 
    //     wrapper.find('#price').simulate('change', { target: { name: 'price', value: 150 }}); 


    //     const input = wrapper.find('input[type="file"]');
    //     input.simulate('change', {target: { files: ['SpringFling.jpg'] }}); 
    //     await wait(); 
    //     wrapper.update(); 
    //     const component = wrapper.find('CreateItem').instance(); 
    //     // console.log(component); 
    //     expect(component.state.image).toEqual('www.SFT.cloudinary.com'); 
    //     expect(component.state.largeImage).toEqual('www.SFTLG.cloudinary.com'); 
    //     expect(global.fetch).toHaveBeenCalled(); 

    //     expect(wrapper.find('CreateItem').instance().state).toMatchObject({
    //         title: "Spring Fling Trainers", 
    //         price: 150, 
    //         description: "High Top Trainers",
    //         image: 'www.SFT.cloudinary.com',
    //         largeImage: "www.SFTLG.cloudinary.com"
    //     }); 
    //     console.log(wrapper.find('CreateItem').instance().state); 
    //     console.log(wrapper.debug()); 
    //     // error is being caught in front end.. not sure.. No more mocked responses for the query:
    //     Router.router = { push: jest.fn() }; 
    //     // const submit = wrapper.find('[type="submit"]'); 
    //     // console.log('FORMMM', submit.debug()); 
    //     // submit.simulate('submit');
    //     wrapper.find('form').simulate('submit');
    //     await wait(50); 
    //     // wrapper.update(); 
    //     expect(Router.router.push).toHaveBeenCalled(); 
    // })
})