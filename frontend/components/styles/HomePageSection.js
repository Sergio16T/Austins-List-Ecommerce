import styled from 'styled-components'; 

const HomePageSection = styled.div`
    display: grid; 
    grid-template-columns: 1fr 1fr; 
    justify-content: center; 
    align-items: center; 
    grid-gap: 4rem; 
    padding: 8rem 4rem; 
    opacity: .99; 
    position:relative; 
    overflow: hidden; 
    .column1, .column2 {
        display: grid; 
        align-items: center; 
        align-content: center; 
        padding: 10%;
        border-radius: 4px; 
        color: #0a0a36; 
        font-size: 1.6rem; 
        z-index: 4;
    }
    .column1 {
        background: white; 
        box-shadow: 1px 1px 4px 1px rgba(51,51,51,.2);
    }
    .column2 {
        background-color: white; 
         box-shadow: 1px 1px 4px 1px rgba(51,51,51,.2);
         p {
            margin: 0;
         }
    }
   @media (max-width: 1000px){
        grid-template-columns: 1fr; 
        padding: 8rem 2rem; 
       
   }
   @media (max-width: 550px) {
    /* .column1, .column2 {
        height: 85%; 
    } */
   }
`; 
const Button = styled.button`
    width: 60%; 
    background: #2b3eab;
    text-transform: uppercase; 
    color: white; 
    padding: 10px;
    font-size: 1.2rem; 
    font-weight: 500; 
    letter-spacing: .1rem; 
    outline: none; 
    border: none; 
    cursor: pointer; 
    &:hover {
        color: #2b3eab; 
        border: 1px solid #2b3eab; 
        background: transparent; 
    }


`; 

export { HomePageSection, Button }; 