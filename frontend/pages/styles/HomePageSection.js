import styled from 'styled-components'; 

const HomePageSection = styled.div`
    display: grid; 
    grid-template-columns: 1fr 1fr; 
    justify-content: center; 
    align-items: center; 
    grid-gap: 10%; 
    margin: 8% 8%;
    opacity: .99; 
    .column1, .column2 {
        display: grid; 
        align-items: center; 
        align-content: center; 
        padding: 10%;
        border-radius: 4px; 
        color: #0a0a36; 
        font-size: 1.6rem; 
    }
    .column1 {
        height: 65%; 
        box-shadow: 1px 1px 4px 1px rgba(51,51,51,.2);
    }
    .column2 {
         height: 65%;
         box-shadow: 1px 1px 4px 1px rgba(51,51,51,.2);
         p {
            margin: 2% 0;
         }
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