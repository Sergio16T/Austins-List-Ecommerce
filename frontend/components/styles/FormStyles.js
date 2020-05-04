import styled from 'styled-components'; 

const StyledFormWrapper = styled.div`
    background: linear-gradient(to Bottom, rgba(10,10,54,1) 85px, white 0%); 
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
    .accountSignUp {
        display: grid; 
        grid-template-columns: 1fr 1fr; 
    }
    form { 
        width: 70%; 
        max-width: 700px; 
        background-color: white; 
        display: block; 
        color: black; 
        margin: 0 auto; 
    }
   @media (max-width: 900px) {
       .accountSignUp {
           grid-template-columns: 1fr; 
           grid-row-gap: 2rem; 
       }
   }
`; 
const StyledForm = styled.form`
    box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
    background: rgba(0, 0, 0, 0.02);
    border: 5px solid white;
    padding: 20px;
    position: relative; 
    label {
        display: block;
        margin-bottom: 1rem;
        font-size: 1.3rem; 
        padding: 2px 0; 
    }
    #priceLabel {
        color: ${props => props.errorMessage ? 'red' : 'black'}; 
        /* font-size: ${props => props.errorMessage ? '1.2rem' : '1.2rem'};  */
        font-size: 1.3rem; 
    }   
    fieldset {
        border: 0;
        padding: 0;
    }
    input, textarea {
        font-family: inherit; 
        font-size: 1.2rem; 
        box-sizing: border-box; 
        width: 100%; 
        /* border: 1px solid rgba(10,10,54,1);  */
        border: 1px solid #d9e4ec; 
        border-radius: 3px; 
        padding: .8rem; 
        margin: .5rem 0; 
        &:focus {
        outline: 0;
        border-color: rgb(119, 38, 151);
        }
    }
    textarea {
        min-height: 80px; 
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
    #uploadPhotosDiv {
        width: 100%; 
        display: flex; 
        justify-content: center; 
    }
    .imageContainer {
        margin-bottom: 1rem; 
    }
    #uploadImageLabel {
        margin-top: 1rem; 
        margin-bottom: 0; 
    }
    .errorMessage {
        color: red; 
        font-size: 1.2rem; 
    }

    button[aria-disabled='true'] {
    opacity: .6;
    pointer-events: none;
  }
  .dropzone {
      padding: 2rem; 
      border-style: dashed;
      border-color: #d9e4ec;
  }
  #dropInput {
      outline: none; 
  }
  #form_H1 {
      margin-bottom: 3rem; 
  }
  /* .custom-file-input::before {
    content: "Upload Images"; 
    color: black; 
    background-color: transparent; 
    border: 1px solid #d9e4ec;
  }
    .custom-file-input {
        color: transparent;
    }
    .custom-file-input::-webkit-file-upload-button {
    visibility: hidden;
    } */
    @media (min-width: 700px) {
    #editInput {
        position: absolute;
        border: 0;
        height: 1px;
        width: 1px;
        white-space: nowrap;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
    }
    #uploadImageLabel {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        text-align: center;
        background: #2b3eab;
        width: 140px;
        height: 38px;
        color: white;
        align-content: center;
        padding: .5rem;
        margin: .5rem;
        line-height: inherit;
    }
    #itemImage {
        margin: .5rem; 
    }
    /* .formRow { 
        display: flex; 
        .formCol-2 {
            flex: 0 0 50%; 
            max-width: 50%; 
        }
        .formCol-1{ 
            display: flex; 
            justify-content: center; 
            flex: 0 0 50%; 
        }
    } */
    }
`;

const StyledResetNote = styled.div`
    padding: 1rem 0; 
    p {
        cursor: pointer;
    }
`; 
export { StyledFormWrapper, StyledForm, StyledResetNote }