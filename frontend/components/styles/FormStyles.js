import styled from 'styled-components'; 

const StyledFormWrapper = styled.div`
    background: linear-gradient(to Bottom, rgba(10,10,54,1) 14%, white 0%); 
    height: 100vh; 
    position: relative;
    /* form {
        position: absolute; 
        top: 50%;
        left: 50%; 
        transform: translate(-50%, -50%); 
        width: 70%; 

    } */
    .formContainer {
        padding: 200px 0; 
    }
    form { 
        width: 70%; 
        max-width: 1000px; 
        background-color: white; 
        display: block; 
        color: black; 
        margin: 0 auto; 
    }
   
`; 
const StyledForm = styled.form`
    box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
    background: rgba(0, 0, 0, 0.02);
    border: 5px solid white;
    padding: 20px;
    label {
        display: block;
        margin-bottom: 1rem;
        font-size: 1.2rem; 
        padding: 2px 0; 
    }
    #priceLabel {
        color: ${props => props.errorMessage ? 'red' : 'black'}; 
        font-size: ${props => props.errorMessage ? '1.5rem' : '1.2rem'}; 
    }
    fieldset {
        border: 0;
        padding: 0;
    }
    input, textarea {
        box-sizing: border-box; 
        width: 100%; 
        border: 1px solid rgba(10,10,54,1); 
        padding: 0.5rem; 
        margin: .5rem 0; 
        &:focus {
        outline: 0;
        border-color: rgb(119, 38, 151);
        }
    }
    button {
        width: 200px; 
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
    }
`;

export { StyledFormWrapper, StyledForm }