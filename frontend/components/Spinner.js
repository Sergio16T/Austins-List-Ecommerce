import React from 'react'; 
import styled from 'styled-components'; 

const StyledSpinner = styled.div`
    display: ${props => props.spinner ? "block" : "none"}; 
    #backDrop {
        background: rgba(0,0,0, 0.3);
        position: absolute; 
        height: 100%; 
        width: 100%; 
        top: 0; 
        left: 0; 
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #loading {
      display: inline-block;
      width: 60px;
      height: 60px;
      border: 3px solid rgba(255,255,255,.3);
      border-radius: 50%;
      border-top-color: #fff;
      animation: spin 1s infinite linear;
      -webkit-animation: spin 1s infinite linear;
      z-index: 2; 
}

@keyframes spin {
    from {
      -webkit-transform: rotate(0deg); 
    }
    to { 
      -webkit-transform: rotate(360deg); 
    }
}
`; 

const Spinner = (props) => {
    return (
        <StyledSpinner spinner={props.spinner}>
            <div id="backDrop">
                <div id="loading"></div>
            </div>
        </StyledSpinner>
      
    )
}

export default Spinner
