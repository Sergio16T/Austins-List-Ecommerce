import React from 'react';
import PleaseSignIn from "../components/PleaseSignIn"; 
import Permissions from "../components/Permissions"; 

const PermissionsPage = props => {
    return (
        <PleaseSignIn>
            <Permissions/>
        </PleaseSignIn>
    );
};



export default PermissionsPage;