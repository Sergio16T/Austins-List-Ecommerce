import styled from 'styled-components'; 


const StyledNav = styled.ul`
        display: flex; 
        padding-left: 0rem; 
        /* align-items: center; 
        justify-content: flex-end; */
        .slidingBar {
            position: absolute; 
            height: 1px; 
            width: 0; 
            margin-top: 8px; 
            /* background: #0a0a36; */
            background: ${props => props.navBarColor ? '#0a0a36' : 'white' };
            left: 0;
            transition: width .4s; 
            transition-timing-function: ease;  
           
        }
        a {
            color: ${props => props.navBarColor ? '#0a0a36' : 'white' };
            font-weight: 600; 
            position: relative;  
            /* color: #0a0a36;  */
            top: 2px;
            transition: top .4s ease;
            transition: color .2s ease; 
            transition-delay: .4s; 
        }
        li {
            padding: 10px 0; 
            position:relative; 
            list-style: none; 
            margin: 0rem 1rem; 
            font-size: 1.4rem; 
            &:hover {
                cursor: pointer; 
            }
        }
        #socialListContainer {
            display: flex; 
            margin: 0;
        }
        @media (min-width: 1000px) {
            justify-content: flex-end; 
            align-items: center; 
            li {
                &:hover {
                cursor: pointer; 
                a{
                    top: -2px; 
                } 
                .slidingBar {
                    width: 100%;
                }
            }
            }
        }
        @media (max-width: 1000px) {
            transform: ${props => props.openDropDown ? 'translateY(0)' :  'translateY(-110%)'};
            transition: transform .3s; 
            background-color: rgba(255, 255, 255, 0.98); 
            position: absolute; 
            width: 100%; 
            padding-top: 5.5rem; 
            top: 0%; 
            left: 0; 
            padding-left: 2rem; 
            z-index: 2; 
            flex-direction: column; 
            margin: 0; 
            box-shadow: 0px 1px 2px 1px rgba(0,0, 0, 0.4); 
            .slidingBar {
                display: none; 
            }
            .socialListItem {
                margin: 0rem 1rem; 
                padding: 1.4rem 0;
            }
            li {
                /* padding: 1.4rem 0;  */
                margin-top: .7rem; 
                margin-bottom: .7rem; 
                margin-left: 1rem; 
                /* margin: 1rem 0;  */
                .underline {
                  width: 90%; 
                  display: block; 
                  background: #0a0a36; 
                  }
                }
                a {
                    color: ${props => props.openDropDown ? '#0a0a36' : 'white'}; 
                    transition-delay: color 2s; 
                }
            }
`;

export default StyledNav; 