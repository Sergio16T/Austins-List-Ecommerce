import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components'; 
import { theme, StyledPage, InnerDiv, BackDrop, GlobalStyle } from './styles/PageStyles'; 
import Meta from './Meta'; 
import Header from './Header'; 
import Cart from './Cart'; 

class Page extends Component {
	constructor() {
		super();
		this.backDrop = React.createRef(); 
	}
	state = {
		navBarColor: false, //maybe use context for state here so that I can change it lower in the tree
		border: false,
		headerDropDown: false,
		topBar : 'topBar',
		isOpen: false
	}
	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll); 
		window.addEventListener('load', this.handleScroll); 
		this.setState({
			headerDropDown: false,
			width: window.innerWidth
		});
		document.addEventListener('click', this.handleBackDropClick); 
	}
	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll); 
		window.removeEventListener('load', this.handleScroll);
		document.removeEventListener('click', this.handleBackDropClick); 
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
		//console.log('click'); 
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
	toggleCart = (isOpen) => {
		this.setState({
			isOpen: !this.state.isOpen
		}); 
		if(isOpen) {
			document.querySelector("body").style.overflow = "hidden"; 
		} else {
			document.querySelector("body").style.overflow = ""; 
		}
	}
	handleBackDropClick = (e) => {
		if(e.target.contains(this.backDrop.current)) {
			this.setState({
				isOpen: false
			}); 
			document.querySelector("body").style.overflow = ""; 
		}
	}
	render() {
		return (
			<ThemeProvider theme={theme}>
				<GlobalStyle/>
				<StyledPage>
					<Meta/>
					<Header 
					navBarColor={this.state.navBarColor} 
					border={this.state.border} 
					topBar ={this.state.topBar}
					headerDropDown={this.state.headerDropDown} 
					openMobileMenu={this.openMobileMenu}
					logoOpenOff={this.logoOpenOff}
					width = {this.state.width}
					toggleCart={this.toggleCart}
					/>
					<BackDrop 
					ref={this.backDrop}
					isOpen={this.state.isOpen}/> 
					<InnerDiv>
						{this.props.children}
					</InnerDiv>
					<Cart 
					isOpen={this.state.isOpen}
					toggleCart={this.toggleCart}
					/>
				</StyledPage>
	
			</ThemeProvider>
		);  
	}
}

export default Page;