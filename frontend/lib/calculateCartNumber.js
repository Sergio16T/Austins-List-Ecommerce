export default function(cart) {
    return cart.reduce((startValue, element)=> {
        return startValue + element.quantity; 
    }, 0); 
}