import React from 'react';
import UpdateItem from '../components/UpdateItem'; 
import PleaseSignIn from '../components/PleaseSignIn'; 

const update = props => {
    return (
       <PleaseSignIn>
            <UpdateItem id={props.query.id}/>
       </PleaseSignIn>
    );
};

export default update;