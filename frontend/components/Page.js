import React, { Component } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'; 
import Meta from './Meta'; 
import Header from './Header'; 


const theme = {
	black: '#393939',
    grey: '#3A3A3A',
    lightgrey: '#E1E1E1',
    offWhite: '#EDEDED',
	maxWidth: '1000px',
	bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)', //shorthand for box shadow 
}

const StyledPage = styled.div`
	background-color: white; 
	color: black; 
`;
const InnerDiv = styled.div`
	/* max-width: ${props => props.theme.maxWidth }; 
	margin: 0 auto; 
	padding: 2rem;  */
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
	render() {
		return (
			<ThemeProvider theme={theme}>
				<GlobalStyle/>
				<StyledPage>
					<Meta/>
					<Header/>
					<InnerDiv>
						{this.props.children}
					</InnerDiv>
				</StyledPage>
	
			</ThemeProvider>
		);  
	}
}

export default Page;