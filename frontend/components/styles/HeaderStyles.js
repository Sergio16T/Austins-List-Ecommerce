import styled, { keyframes } from 'styled-components'; 

const StyledHeader = styled.div`
    background-image: linear-gradient(180deg, #fff 50%, transparent 0);
    background-size: 100% 200%;
    background-position: ${props => props.navBarColor || props.pathName === "/items" || props.pathName ==="/item" ? "0 0" : "0 100%"};
    /* transition: background-position .4s ease;  */
    position: fixed; 
    width: 100%;  
    z-index: 4; 
    /* color: white;  */
    transition: .3s ease;  
    /* box-shadow: ${props => props.border ? "0px 1px 2px 1px rgba(0,0, 0, 0.4)" : ""};  */
    &::after {
        content: ""; 
        position: absolute; 
        width: 100%;
        box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.4); 
        opacity: ${props => props.pathName === "/items" || props.pathName ==="/item" ? 1 : props.border ? 1 : 0};   
        transition-delay: ${props => props.border ? ".3s" : "0s"}; 
    }
    .topBar {
        position: relative; 
        display: grid; 
        grid-template-columns: auto 1fr; 
        justify-content: space-between; 
        align-items: stretch; 
        padding: 10px 5%; 
        /* border-bottom: 4px solid ${props => props.theme.black};  */
    }
    .subBar {
        position: relative; 
        /* display: grid; 
        grid-template-columns: 1fr auto; 
        border-bottom: 1px solid ${props => props.theme.black};  */
        padding-left: 2rem; 
        p {
            margin: 0; 
            padding: .5rem 1rem;
          
        } 
    }
    #hamburger {
        display: none; 
    }
    #mobile_searchIconContainer, #mobilecart {
        display: none; 
    }
        @media (max-width: 1000px) {
            #mobile_searchIconContainer, #mobilecart {
                display: block; 
            }
            .topBar {
                display: flex; 
                margin: 0; 
                padding: 22px 2rem; 
            }

            #nav_isOpen {
               .navBar_links {
                color: #0a0a36; 
               } 
               #hamburger {
                  & div {
                    transition: transform .4s ease; 
                    background-color: #0a0a36; 
                  }
                  #ham_top {
                      transform: translateY(0px) rotate(-135deg); 
                  }
                  #ham_middle {
                      transform: scale(0); 
                  }
                  #ham_bottom {
                      transform: translateY(-10px) rotate(-45deg); 
                  }
                }
            } 
            #hamburger {
                display: block; 
                align-self: center; 
                z-index: 4;
                cursor: pointer; 
                & div {
                    transition: transform .4s ease; 
                    background-color: ${props => props.pathName === '/items' || props.pathName ==="/item" ? '#0a0a36': props.navBarColor ? '#0a0a36' : 'white' };
                    width: 15px; 
                    height: 2px; 
                    margin-bottom: 3px; 
                }
            }
            #mobileOpenfalse {
                box-shadow: none; 
                .slidingBar {
                    display: none; 
                }
                li {
                    a {
                        color: 'white'; 
                        transition: none;
                    }
                }
            }
        }
`;

const Logo = styled.h1`
    font-size: 2rem; 
    margin: 0; 
    margin-left: 2rem; 
    position: relative; 
    z-index: 3; 
    display: flex; 
    align-items: center; 
    a { 
        padding: 0.5rem 1rem; 
    }
    .navBar_links {
        color: ${props => props.pathName === "/items" || props.pathName ==="/item" ? '#0a0a36' : props.navBarColor ? '#0a0a36' : 'white' };
        transition: color .2s ease; 
    }
    @media (max-width: 1000px) {
        margin: 0; 
    }
    `; 
const FeatureIcons = styled.div`
    font-size: 2rem; 
    margin: 0; 
    position: relative; 
    z-index: 3; 
    display: flex; 
    align-items: center; 
    a { 
        padding: 0.5rem 1rem; 
    }
    .feature_icons {
        font-size: 2.4rem; 
        cursor: pointer;
        position: relative; 
        #cartImage {
            width: 23px; 
        }
        #cartCount {
            position: absolute;
            left: 0px;
            width: 100%;
            bottom: 0;
            top: 17px;
            font-size: 1.2rem;
            text-align: center;
        }

        }
    
    `; 
const SiteMenu = styled.div`
    font-size: 2rem; 
    margin: 0; 
    position: relative; 
    z-index: 3; 
    display: flex; 
    align-items: center; 
  `; 
  
  export { StyledHeader, Logo, FeatureIcons, SiteMenu }; 