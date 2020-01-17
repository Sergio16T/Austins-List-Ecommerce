import Link from 'next/link'; 
import styled from 'styled-components'; 

const Wrapper = styled.div`
    .homePage_section {
        height: 400px; 
    }
`; 
const Container = styled.div`
    position: relative; 
    height: 100vh; 
    overflow: hidden; 
`;
const StyledHomeDiv = styled.div`
    position: relative; 
    background-color: rgba(10,10,54,1);
    video {
        width: 110%; 
        height: 100%;
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
`; 

const Home = (props) => {
    return (
        <Wrapper>
        <Container className="Container">
        <StyledHomeDiv className="homeContent">
            <div id="welcome"> 
                <h2> Wecome to Austin Artsy </h2>
                <h3> The place for local Austin artists to upload art and for you to explore!</h3>
            </div>
            <video autoPlay muted loop> 
                <source src="https://mooveit-videos.s3-us-west-2.amazonaws.com/compilation_preview.mp4" type="video/mp4"/>
            </video>
        </StyledHomeDiv>
        </Container>
        <div className="homePage_section">Test</div>
        <div className="homePage_section">
            test2
        </div>
        </Wrapper>
    )
}
   

export default Home; 