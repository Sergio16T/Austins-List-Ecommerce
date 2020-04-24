import styled from 'styled-components'; 

const Wrapper = styled.div`
  
`; 
const Container = styled.div`
    position: relative; 
    height: 100vh; 
    overflow: hidden; 
    z-index: 3; 
    background-color: rgba(10,10,54,1);
`;
const StyledHomeDiv = styled.div`
  
    video {
        position: absolute; 
        min-width: 100%; 
        min-height: 100%;
        transform: translate(-50%, -50%); 
        left: 50%; 
        top: 50%; 
        display: inline-block; 
        opacity: .4; 
        object-fit: contain; 
    }
    #welcome {
        display: flex; 
        flex-direction: column; 
        justify-content: center; 
        align-items: center; 
        width: 100%;
        height: 100%;
        z-index: 1; 
        position: absolute; 
        h2{ 
            font-size: 3.5rem; 
            color: white; 
        }
        h3 {
            color: white; 
            font-size: 1.5rem; 
        }
    }
    @media (max-width: 1000px) {
        height: 100vh; 
        overflow: hidden; 
        video {
            object-fit: cover; 
        }
        #welcome {
            text-align: center;
            width: 100%; 
        }
    }
    @media (max-width: 620px) {
        #welcome {
            justify-content: flex-start; 
            margin-top: 35%; 
            padding-left: 1.5rem; 
            padding-right: 1.5rem; 
            width: inherit; 
        }
    }
`; 
const GeoShape1 = styled.div`
    position: absolute;
    top: 0%; 
    left: 50%; 
    background-color: #da084f;
    /* opacity: .8;  */
    transform: skewY(-15deg) translateY(-5%); 
    width: 300px; 
    height: 200px; 
    z-index: 3; 
`; 
const GeoShape2 = styled.div`
    position: absolute;
    top: 0%; 
    left: 0%; 
    transform: skewY(10deg) translateY(-26%); 
    /* width: 400px;  */
    width: 100%; 
    height: 800px; 
    z-index: 2; 
    background-color: rgba(10,10,54, 1); 
`;  
const GeoShape3 = styled.div`
    position: absolute;
    top: 40%; 
    left: 70%; 
    /* background-color: #da084f; */
    background: transparent; 
    border: 2px solid #da084f;
    /* opacity: .8;  */
    transform: skewY(-15deg) translateY(-5%); 
    width: 300px; 
    height: 360px; 
    z-index: 3; 
`; 
const GeoShape4 = styled.div`
    position: absolute;
    top: 10%; 
    left: 0%; 
    background-color: transparent; 
    border: 2px solid #24a9a2; 
    /* opacity: .8;  */
    transform: skewY(-15deg) translateY(-5%); 
    width: 300px; 
    height: 300px; 
    z-index: 3; 
`;

export { Wrapper, Container, StyledHomeDiv, GeoShape1, GeoShape2, GeoShape3, GeoShape4}