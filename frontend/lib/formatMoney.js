export default function(amount) {
    let price = amount / 100; 
    return new Intl.NumberFormat('en', {
        style: "currency",
        currency: "USD",
    }).format(price);
}

/* when receiving money from form make sure it always has two floating point numbers and then just multiply it by 100
to store it in graphql as cents in int type then when I'm displaying money multiply it by 100.
that way I can format it for use later.. so it's always going to be handled in cents 
165.33 * 100
16533
165 * 100
16500
16500/100
165
16533/100
165.33
 */ 
