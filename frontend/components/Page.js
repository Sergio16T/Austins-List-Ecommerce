import React, { Component } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'; 
import Meta from './Meta'; 
import Header from './Header'; 
import Cart from './Cart'; 

const theme = {
	black: '#393939',
    grey: '#3A3A3A',
    lightgrey: '#E1E1E1',
    offWhite: '#EDEDED',
	maxWidth: '1000px',
	bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)', //shorthand for box shadow 
	blue: "rgba(10,10,54,1)", 
	purple: "#2b3eab" 
}

const StyledPage = styled.div`
	background-color: white; 
	color: black; 
	position: relative; 

`;
const InnerDiv = styled.div`
	margin: 0 auto; 
`; 
const BackDrop = styled.div`
position: absolute; 
top: 0; 
left: 0; 
width: 100%; 
height: 100%; 
overflow: hidden; 
background: #000000; 
opacity: ${props => props.isOpen ? .5 : 0}; 
display: ${props => props.isOpen ? "block" : "none"}; 
z-index: 4; 
transition: all 0.4s cubic-bezier(0.46, 0.01, 0.32, 1);
`; 
const GlobalStyle = createGlobalStyle`	
	html {
		box-sizing: border-box; 
		font-size: 12px; 
	}
	body {
		margin: 0; 
		padding: 0; 
		font-family: "Ubuntu"; 
	}
	a {
		text-decoration: none; 
		color: black; 
	}

`; 
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
		window.addEventListener('resize', () => this.setState({
			width: window.innerWidth
		})); 
		document.addEventListener('click', this.handleBackDropClick); 
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
					<Cart isOpen={this.state.isOpen}/>
					<InnerDiv>
						{this.props.children}
					</InnerDiv>
				</StyledPage>
	
			</ThemeProvider>
		);  
	}
}

export default Page;