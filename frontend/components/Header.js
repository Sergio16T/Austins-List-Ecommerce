import React, { useState, useEffect } from 'react';
import Link from 'next/link'; 
import { withRouter } from 'next/router'
import Router from 'next/router'; 
import Nprogress from 'nprogress'; 
import Nav from './Nav'; 
import Search from './Search'; 
import User from './User'; 
import calculateCartNumer from '../lib/calculateCartNumber'; 
import { StyledHeader, Logo, FeatureIcons, SiteMenu } from './styles/HeaderStyles'; 

Router.onRouteChangeStart = () => {
    Nprogress.start(); 
}; 
Router.onRouteChangeComplete = () => {
    Nprogress.done(); 
}; 

Router.onRouteChangeError = () => {
    Nprogress.done(); 
}; 


class Header extends React.Component { 
    state = {
        searchBarExpanded: false,
		navBarColor: false, 
		border: false,
		headerDropDown: false,
		topBar : 'topBar',
    }
    componentDidMount() {
		window.addEventListener('scroll', this.handleScroll); 
		window.addEventListener('load', this.handleScroll); 
		this.setState({
			headerDropDown: false,
			width: window.innerWidth
		});
	}
	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll); 
		window.removeEventListener('load', this.handleScroll);
		this.setState({
			headerDropDown: false
		}); 
    }
    handleScroll = () => {
        if(window.scrollY > (window.innerHeight * 0.05)) {
          this.setState({
			  navBarColor: true,
			  border: true, 
		  });  
        } else {
			this.setState({
				navBarColor: false,
				border: false
			}); 
		} 
	} 
	openMobileMenu = (e) => {
        if(!this.state.headerDropDown) {
            this.setState({
                headerDropDown: true, 
				topBar: 'nav_isOpen', 
            }); 
        } else {
            this.setState({
                headerDropDown: false,
				topBar: 'topBar', 
            }); 
        }
	}
	logoOpenOff = () => {
		if(window.innerWidth > 1000) {
			return; 
		}
		if(!this.state.headerDropDown) {
			return; 
		}
		this.setState({
			headerDropDown: false, 
			topBar: 'topBar'
		}); 
	}
    toggleSearchBar = () => {
        this.setState({
            searchBarExpanded: !this.state.searchBarExpanded
        }); 
    }
    render() {
        return (
            <StyledHeader pathName={this.props.router.pathname} navBarColor={this.state.navBarColor} border={this.state.border} className="header" openDropDown={this.state.headerDropDown}>
                <div className='topBar' id={this.state.topBar}>
                    <SiteMenu>
                        {this.props.router.pathname === "/items" || this.props.router.pathname === "/item" ? 
                        <UserWithFeatureIcons
                        toggleCart={this.props.toggleCart}
                        toggleSearchBar={this.toggleSearchBar}
                        />
                        : null
                        }
                        <Logo pathName ={this.props.router.pathname} navBarColor={this.state.navBarColor}>
                            <Link href="/">
                                <a className="navBar_links" onClick={this.logoOpenOff}> Austin's List</a>
                            </Link>
                        </Logo>
                    </SiteMenu>
                    <Nav 
                    navBarColor={this.state.navBarColor} 
                    openDropDown={this.state.headerDropDown} 
                    openMobileMenu={this.openMobileMenu}
                    width={this.state.width}
                    toggleSearchBar ={this.toggleSearchBar}
                    toggleCart={this.props.toggleCart}
                    />
                    <div id="hamburger" onClick={this.openMobileMenu}>
                        <div id="ham_top"></div>
                        <div id="ham_middle"></div>
                        <div id="ham_bottom"></div>
                    </div>
                </div>
                {this.props.router.pathname === "/items" || this.props.router.pathname ==="/item" ?  
                <Search 
                navBarColor={this.state.navBarColor}
                pathName={this.props.router.pathname}
                searchBarExpanded={this.state.searchBarExpanded}
                toggleSearchBar={this.toggleSearchBar}
                /> 
                : null
                }
            </StyledHeader>
        );
    }
}

const UserWithFeatureIcons = (props) => {
    return (
        <User>
        {({data, error, loading })=> {
        if(loading) return null; 
        const { user } = data; 
        if(!user) return null; 
        return (
            <FeatureIcons>
                <li id="mobilecart">
                    <a className="feature_icons" onClick={() => props.toggleCart(true)}>
                        {/* https://cdn.shopify.com/s/files/1/0558/4169/t/138/assets/icon-bag.svg?v=5222225297183201505 */}
                        <img id="cartImage" src="https://cdn.shopify.com/s/files/1/0558/4169/t/138/assets/icon-cart.svg?v=4915344247293215888" alt="cart" />
                        <span id="cartCount">{calculateCartNumer(data.user.cart)}</span>
                    </a>
                </li>
                <li id="mobile_searchIconContainer" >
                    <a className="feature_icons" onClick={props.toggleSearchBar}><img src="https://cdn.shopify.com/s/files/1/0558/4169/t/138/assets/icon-search.svg?v=12627112760336229118"></img></a> 
                </li>
            </FeatureIcons>
        )}}
        </User>
    ); 
}

export default withRouter(Header);
export { UserWithFeatureIcons }; 