export default function(cart) {
    return cart.reduce((startValue, element) => {
    if(!element.item) return startValue; 
    return startValue + (element.quantity * element.item.price)}, 0); 
    
}