import styled from 'styled-components'; 

const ItemStyles = styled.div`
    background: rgba(10,10,54,1); 
    width: 100%; 
    position: relative;
    `; 

const StyledItem = styled.div`
    display: flex; 
    flex-direction: column; 
    background-color: white; 
    height: 400px; 
    border-radius: 10px; 
    img {
        width: 100%; 
        height: 400px; 
        object-fit: cover; 
    }
`; 

export { ItemStyles, StyledItem }; 