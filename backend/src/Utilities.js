module.exports = {
    hasPermissions: function hasPermissions(user, permissionsNeeded) { 
        const hasPermissions = user.permissions.filter(permission => permissionsNeeded.includes(permission));
        if(!hasPermissions.length) {
            throw new Error(
                `You don't have sufficient permissions to do that! 
                You need ${permissionsNeeded}, 
                You have ${user.permissions}
                `); 
        } 
    }, 
    formatMoney: function(amount) {
        let price = amount / 100; 
        return new Intl.NumberFormat('en', {
            style: "currency",
            currency: "USD",
        }).format(price); 
    }, 
    

}

