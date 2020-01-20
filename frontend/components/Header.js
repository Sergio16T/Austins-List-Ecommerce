import React, { useState, useEffect } from 'react';
import Link from 'next/link'; 
import styled, { keyframes } from 'styled-components'; 
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
    /* transition: background-position .4s ease;  */
    position: fixed; 
    width: 100%;  
    z-index: 4; 
    color: white; 
    transition: .3s ease;  
    box-shadow: ${props => props.border ? "0px 1px 2px 1px rgba(0,0, 0, 0.4)" : ""}; 
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
        display: grid; 
        grid-template-columns: 1fr auto; 
        border-bottom: 1px solid ${props => props.theme.black}; 
        padding-left: 2rem; 
        p {
            margin: 0; 
            padding: .5rem 1rem;
          
        }
    }
    #hamburger {
            display: none; 
        }
        @media (max-width: 1000px) {
            .topBar {
                display: flex; 
                margin: 0; 
                padding: 22px 5%; 
            }

            #nav_isOpen {
               .navBar_links {
                color: #0a0a36; 
               } 
               #hamburger {
                  & div {
                  background-color: #0a0a36; 
                  }
                }
            } 
            #hamburger {
                display: block; 
                align-self: center; 
                z-index: 4;
                cursor: pointer; 
                & div {
                    background-color: ${props => props.navBarColor ? '#0a0a36' : 'white' };
                    width: 15px; 
                    height: 2px; 
                    margin-bottom: 3px; 
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
        color: ${props => props.navBarColor ? '#0a0a36' : 'white' };
        transition: color .2s ease; 
    }
    @media (max-width: 1000px) {
        margin: 0; 
    }
    `; 

class Header extends React.Component { 
    state = {
        headerDropDown: false, 
        topBarClass: 'topBar'
    }

    componentDidMount() {
        this.setState({
            headerDropDown: false
        });
    }
     openMobileMenu = () => {
        console.log('click'); 
        if(!this.state.headerDropDown) {
            this.setState({
                headerDropDown: true, 
                topBar: 'nav_isOpen'
            }); 
        } else {
            this.setState({
                headerDropDown: false,
                topBar: 'topBar'
            }); 
        }
    }
    render() {
        return (
            <StyledHeader navBarColor={this.props.navBarColor} border={this.props.border} className="header" openDropDown={this.state.headerDropDown}>
                <div className='topBar' id={this.state.topBar}>
                    <Logo navBarColor={this.props.navBarColor}>
                        <Link href="/">
                            <a className="navBar_links">Local Arts</a>
                        </Link>
                    </Logo>
                    <Nav navBarColor={this.props.navBarColor} openDropDown={this.state.headerDropDown}/>
                    <div id="hamburger" onClick={this.openMobileMenu}>
                        <div id="ham_top"></div>
                        <div id="ham_middle"></div>
                        <div id="ham_bottom"></div>
                    </div>
                </div>
                {/* <div className="subBar">
                    <p>Search...</p>
                </div> */}
            </StyledHeader>
        );
    }
}


export default Header;