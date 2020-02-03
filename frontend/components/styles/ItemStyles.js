import styled from 'styled-components'; 

const ItemStyles = styled.div`
    background: rgba(10,10,54,1); 
    /* background: linear-gradient(to Bottom, rgba(10,10,54,1) 200px, white 0%);  */
    width: 100%; 
    position: relative;
    `; 

const StyledItem = styled.div`
    display: flex; 
    flex-direction: column; 
    background-color: white; 
    border-radius: 10px; 
    box-shadow: 1px 1px 4px 1px rgba(51,51,51,.2); 
    img {
        width: 100%; 
        height: 400px; 
        object-fit: cover; 
    }
`; 

export { ItemStyles, StyledItem }; 