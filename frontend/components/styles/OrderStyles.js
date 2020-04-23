import styled from 'styled-components'; 

const StyledOrderWrapper = styled.div`
    background: linear-gradient(to Bottom, rgba(10,10,54,1) 85px, white 0%); 
    height: 100vh; 
    position: relative;
    .orderContainer {
        padding: 200px 0; 
        width: 100%; 
        display: flex; 
        justify-content: center; 
    }
`; 
const OrderConfirmation = styled.div`
    box-shadow: ${props => props.theme.bs}; 
    max-width: 1000px; 
    width: 100%; 
    padding: 2rem; 
    width: 60%; 
    & > p {
        font-size: 1.2rem;
        /* padding-left: 2rem;  */
        padding-bottom: 1rem; 
        border-bottom: 1px solid ${props => props.theme.lightgray} 
    }
   #order_header{
       /* padding-left: 2rem;  */
       font-size: 1.6rem; 
       padding-bottom: 1rem; 
   }
    .orderItemRow {
        display: grid; 
        grid-template-columns: 1fr 2fr; 
        padding: 1rem 0; 
        align-items: center; 
        .itemDetails {
            padding-left: 2rem; 
            h2 {
                font-size: 1.4rem; 
            }
            & > p {
            font-size: 1.2rem; 
        }
        }
        .orderItemImage {
            width: 140px; 
            height: auto; 
        }
      
    }
    @media (max-width: 600px) {
        width: 75%; 
        .orderItemRow {
        grid-template-columns: 1fr; 
          .itemDetails {
              padding: 0; 
          }
        }

    }
`; 

export { StyledOrderWrapper, OrderConfirmation}