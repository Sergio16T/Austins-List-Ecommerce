import styled from 'styled-components'; 
import { HomePageSection, Button } from './styles/HomePageSection'; 

const Wrapper = styled.div`
    .homePage_section {
        height: 80vh; 
    }
`; 
const Container = styled.div`
    position: relative; 
    height: 100vh; 
    overflow: hidden; 
`;
const StyledHomeDiv = styled.div`
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
                <source src="" alt="homePageVideo" type="video/mp4"/> link to video in aws s3 bucket
            </video>
        </StyledHomeDiv>
        </Container> 
        {/* create two modals side by side For Shoppers For Artists */}
        <HomePageSection className="homePage_section">
            <div className="column1">
                <h3>Austin Art available for view on one platform</h3>
                <p>Our Mission is to bring together the Arts Community of Austin and their work 
                    and make it easy to browse through for people seeking art for their home or 
                    business.</p>
                <Button>Get Started</Button>
            </div>
            <div className="column2">
            <h3>For Artists</h3>
            <p>Create an account, upload work, ability to edit and delete as needed. Easy to use!</p>
            <h3>For Consumers</h3>
            <p> Search through Austin's Art and discover unique and amazing pieces!</p>
            </div>
        </HomePageSection>
        <div className="homePage_section">
           
        </div>
        </Wrapper>
    )
}
   

export default Home; 