import styled from 'styled-components'; 
import Link from 'next/link'; 
import { HomePageSection, Button } from "../components/styles/HomePageSection"; 

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
const Home = (props) => {
    return (
        <Wrapper>
        <Container className="Container">
        <StyledHomeDiv className="homeContent">
            <div id="welcome"> 
                <h2> Wecome to Austin's List </h2>
                <h3> The place for local Austin designers and artists to upload items and for shoppers to explore!</h3>
            </div>
            <video autoPlay muted loop> 
                <source src="https://mooveit-videos.s3-us-west-2.amazonaws.com/compilation_preview.mp4" alt="homePageVideo" type="video/mp4"/> {/*link to video in aws s3 bucket*/}
            </video>
        </StyledHomeDiv>
        </Container> 
        {/* create two modals side by side For Shoppers For Artists */}
        <HomePageSection className="homePage_section">
            {/* <GeoShape1/> */}
            <GeoShape2/>
            <GeoShape3/>
            <GeoShape4/>
            <div className="column1">
                <h3>Local Austin designers and artists clothing, shoes, and works of art available for view on one platform</h3>
                <p>Our Mission is to bring together the small business community of Austin and their work 
                    and make it easy for consumers to shop local!</p>
                <Link href="/signup"><Button>Get Started</Button></Link>
            </div>
            <div className="column2">
            <h3>For Designers and Artists</h3>
            <p>Create an account, upload work, ability to edit and delete as needed. Easy to use!</p>
            <h3>For Consumers</h3>
            <p> Search through Austin's List and discover unique and amazing pieces!</p>
            </div>
        </HomePageSection>
        <div className="homePage_section">
        </div>
        </Wrapper>
    )
}
   

export default Home; 