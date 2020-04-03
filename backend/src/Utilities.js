module.exports = function hasPermissions(user, permissionsNeeded) { 
    const hasPermissions = user.permissions.filter(permission => permissionsNeeded.includes(permission));
    if(!hasPermissions.length) {
        throw new Error(
            `You don't have sufficient permissions to do that! 
            You need ${permissionsNeeded}, 
            You have ${user.permissions}
            `); 
    } 
}

