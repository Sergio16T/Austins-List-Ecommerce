import React, { useState, useEffect } from 'react';
import Link from 'next/link'; 
import styled from 'styled-components'; 
import Router from 'next/router'; 
import Nprogress from 'nprogress'; 
import Nav from './Nav'; 

Router.onRouteChangeStart = () => {
    Nprogress.start(); 
}; 
Router.onRouteChangeComplete = () => {
    Nprogress.done(); 
}; 

Router.onRouteChangeError = () => {
    Nprogress.done(); 
}; 

const StyledHeader = styled.div`
    background-image: linear-gradient(180deg, #fff 50%, transparent 0);
    background-size: 100% 200%;
    background-position: ${props => props.navBarColor ? "0 0" : "0 100%"};
    transition: background-position .4s ease; 
    position: fixed; 
    width: 100%;  
    z-index: 4; 
    color: white; 
    .topBar {
        display: grid; 
        grid-template-columns: auto 1fr; 
        justify-content: space-between; 
        align-items: stretch; 
        padding: 10px 0; 
        /* border-bottom: 4px solid ${props => props.theme.black};  */
    }
    .subBar {
        display: grid; 
        grid-template-columns: 1fr auto; 
        border-bottom: 1px solid ${props => props.theme.black}; 
        padding-left: 2rem; 
        p {
            margin: 0; 
            padding: .5rem 1rem;
          
        }
    }
`;

const Logo = styled.h1`
    font-size: 2rem; 
    margin: 0; 
    margin-left: 2rem; 
    position: relative; 
    z-index: 2; 
    display: flex; 
    align-items: center; 
    a { 
        /* color: #0a0a36; */
        padding: 0.5rem 1rem; 
    }
    .navBar_links {
        color: ${props => props.navBarColor ? '#0a0a36' : 'white' };
        transition: color .2s ease; 
    }
    `; 

const Header = props => {
    const [navBarColor, setNavbarColor] = useState(false); 

    useEffect(()=> {
        window.addEventListener('scroll', handleScroll); 
    })
    const handleScroll = ()=> {
        if(window.scrollY >= 89) {
            setNavbarColor(true); 
        } else {
            setNavbarColor(false); 
        }     
    }
    return (
        <StyledHeader navBarColor={navBarColor}>
            <div className="topBar">
                <Logo navBarColor={navBarColor}>
                    <Link href="/">
                        <a className="navBar_links">Local Arts</a>
                    </Link>
                </Logo>
                <Nav navBarColor={navBarColor}/>
            </div>
            {/* <div className="subBar">
                <p>Search...</p>
            </div> */}
        </StyledHeader>
        

    );
};


export default Header;