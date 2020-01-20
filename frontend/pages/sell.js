import styled from 'styled-components'; 

const SellStyles = styled.div`
    background: rgba(10,10,54,1); 
    height: 100vh; 
    position: relative;
    div {
        position: block; 
        color: white; 
    }
`; 
const Sell = (props) => {
    return (
        <SellStyles>
            <div>Hello</div>
        </SellStyles>
    )
}
   

export default Sell; 