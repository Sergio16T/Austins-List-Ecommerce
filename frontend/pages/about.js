import React from 'react';
import styled from 'styled-components'; 

const AboutStyles = styled.div`
   /* background: rgba(10,10,54,1);  */
    background: linear-gradient(to Bottom, rgba(10,10,54,1) 85px, white 0%); 
    height: 100vh; 
    position: relative;
    div {
        position: block; 
        color: white; 
    }
`;

const about = props => {
    return (
        <AboutStyles>
            
        </AboutStyles>
    );
};



export default about;