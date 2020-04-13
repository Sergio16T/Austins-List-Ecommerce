export default function(cart) {
    return cart.reduce((startValue, element) => 
    startValue + (element.quantity * element.item.price), 0); 
}