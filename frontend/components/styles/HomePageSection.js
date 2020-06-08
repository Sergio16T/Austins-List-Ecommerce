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
        padding: 4.4rem;
        border-radius: 4px; 
        color: #0a0a36; 
        font-size: 1.6rem; 
        z-index: 4;
    }
    .column1 {
        background: white; 
        box-shadow: 1px 1px 4px 1px rgba(51,51,51,.2);
        p { 
            margin: .75rem 0 ; 
        }
    }
    .column2 {
        background-color: white; 
        box-shadow: 1px 1px 4px 1px rgba(51,51,51,.2);
        p {
        margin: .75rem 0;
        }
    }
    h3 {
        margin: 1rem 0; 
        font-size: 1.8rem; 
    }
    p {
        font-size: 1.5rem; 
    }
    button {
        margin-top: 1.5rem;
    }
   @media (min-width: 1000px) {
       .column1, .column2 {
           min-height: 250px;
       }
   }
   @media (max-width: 1000px){
        grid-template-columns: 1fr; 
        padding: 8rem 2rem; 
       .column1, .column2 {
           padding: 3.4rem; 
            /* p { 
                margin: .25rem 0 ; 
            } */
       }
       h3 {
        font-size: 1.6rem; 
        }
        p {
            font-size: 1.4rem; 
        }
   }
   @media (max-width: 600px) {
    .column1, .column2 {
        padding: 3rem; 
    }

   }
   @media (max-width: 340px) {
       padding: 8rem 1rem; 
    .column1, .column2 {
        padding: 2.4rem; 
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