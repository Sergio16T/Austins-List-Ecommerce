import React from 'react';
import UpdateItem from '../components/UpdateItem'; 

const update = props => {
    return (

       <UpdateItem id={props.query.id}/>
    );
};

export default update;