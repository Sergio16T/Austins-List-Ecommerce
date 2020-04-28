import casual from 'casual'; 
//.seed() is to provide ability to use a specific seed in order to get a repeatable random sequence for our testing purposes
casual.seed(111); 

const mockItem = () => ({
    // __typename: 'Item',
    id: '123',
    price: 5000,
    user: null,
    image: 'dog.jpg',
    title: 'dogs are the best',
    description: 'dogs description',
    largeImage: 'dog-large.jpg',
}); 

const mockUserWithItemsInCart = () =>  ({
    __typename: 'User', 
    id: "123", 
    name: casual.name, 
    email: casual.email, 
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
}); 
const mockUser = () => ({
    __typename: 'User', 
    id: "123", 
    name: casual.name, 
    email: casual.email, 
    permissions: ['ADMIN'], 
    cart: [],
    orders: []
}); 
const mockOrderItem = () => ({
    __typename: 'OrderItem',
    id: casual.uuid,
    image: `${casual.word}.jpg`,
    title: casual.words(),
    price: 4234,
    quantity: 1,
    description: casual.words(),
  });
  
  const mockOrder = () => ({
    __typename: 'Order',
    id: 'ord123',
    charge: 'ch_123',
    total: 40000,
    items: [mockOrderItem(), mockOrderItem()],
    createdAt: '2018-04 - 06T19: 24: 16.000Z',
    user: mockUser(),
  });
  
  const mockCartItem = overrides => ({
    __typename: 'CartItem',
    id: 'omg123',
    quantity: 3,
    item: mockItem(),
    user: mockUser(),
    ...overrides,
  });
//mock LocalStorage 
class MockLocalStorage {
    constructor(){
        this.store={}; 
    }

    clear() {
        this.store = {}; 
    }
    getItem(key) {
        return this.store[key] || null; 
    }
    setItem(key, value) {
        this.store[key] = value.toString(); 
    }
    removeItem(key) {
        delete this.store[key]; 
    }
}

export { 
    mockItem, 
    MockLocalStorage, 
    mockUser, 
    mockCartItem, 
    mockOrderItem, 
    mockOrder }; 