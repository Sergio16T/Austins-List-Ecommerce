import Link from 'next/link'; 
import { HomePageSection, Button } from "../components/styles/HomePageSection"; 
import { Wrapper, Container, StyledHomeDiv, GeoShape2, GeoShape3, GeoShape4 } from '../components/styles/HomePageStyles'; 
 
const Home = (props) => {
    return (
        <Wrapper>
            <Container className="Container">
                <StyledHomeDiv className="homeContent">
                    <div id="welcome"> 
                        <h2> Welcome to Austin's List </h2>
                        <h3> The place for shoppers to explore local Austin designers and artist's work!</h3>
                    </div>
                    <video autoPlay muted loop> 
                        <source src="https://mooveit-videos.s3-us-west-2.amazonaws.com/compilation_preview.mp4" alt="homePageVideo" type="video/mp4"/> {/*link to video in aws s3 bucket*/}
                    </video>
                </StyledHomeDiv>
            </Container> 
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