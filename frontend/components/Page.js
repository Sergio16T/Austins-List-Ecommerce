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
		isOpen: false
	}
	componentDidMount() {
		document.addEventListener('click', this.handleBackDropClick); 
	}
	componentWillUnmount() {
		document.removeEventListener('click', this.handleBackDropClick); 
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
		const children = React.cloneElement(this.props.children, {
			toggleCart: this.toggleCart
		}); 
		return (
			<ThemeProvider theme={theme}>
				<GlobalStyle/>
				<StyledPage>
					<Meta/>
					<Header 
					toggleCart={this.toggleCart}
					/>
					<BackDrop 
					ref={this.backDrop}
					isOpen={this.state.isOpen}/> 
					<InnerDiv>
						{children}
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