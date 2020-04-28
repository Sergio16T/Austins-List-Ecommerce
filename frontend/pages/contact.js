import styled from 'styled-components'; 

const ContactStyles = styled.div`
    background: linear-gradient(to Bottom, rgba(10,10,54,1) 85px, white 0%); 
    height: 100vh; 
    position: relative;
    div {
        position: block; 
        color: white; 
    }
`;
const ContactPage = (props) => {
    return (
        <ContactStyles/>
    )
}

export default ContactPage