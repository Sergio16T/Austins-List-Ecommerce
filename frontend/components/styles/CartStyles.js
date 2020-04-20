import styled from 'styled-components';

const CartWrapper = styled.div`
    position: fixed; 
    height: 100%; 
    transform: ${props => props.isOpen ? "translateX(0)" : "translateX(100%)" }; 
    background: ${props => props.theme.offWhite}; 
    right: 0; 
    top: 0; 
    z-index: 5; 
    border-left: 2px solid ${props => props.theme.purple}; 
    transition: all 0.3s;
    overflow: hidden; 
	/* padding: 2rem; */
	min-width: 30%; 
		.cartHeader {
			display: flex;
			padding: 2rem;
			padding-bottom: 0;  
		}
		.cartBody {
			overflow: auto;
			height: calc(100% - 200px); 
			padding: 0 2rem; 
    		/* max-height: 558px; */
			
		}
		.cartFooter {
			padding: 0 2rem; 
			box-shadow: 0 -2px 4px 0 rgba(145,158,171,0.25); 
		}
		#closeX {
			opacity: .6; 
			cursor: pointer; 
			position: absolute;
			font-size: 2.4rem;  
			top: 10px; 
			right: 20px; 
			background: transparent; 
			border: none;
			outline: none; 
			&:hover {
				opacity: 1; 
			}
		}
		.deleteCartItem {
			display: flex; 
			opacity: .4; 
			cursor: pointer; 
			font-size: 1.8rem;  
			background: transparent; 
			border: none;
			outline: none; 
			&:hover {
				color: red; 
				opacity: 1; 
			}
		}
		
		#totalLabel {
			font-size: 1.4rem; 
		}
		#totalPrice{ 
			font-size: 1.4rem; 
		}
		.cartTotal {
			display: flex;
			flex-direction: row; 
			align-items: center; 
		}
		#checkout_btn {
			width: 100%; 
			background: #2b3eab;
			text-transform: uppercase;
			color: white;
			padding: 14px;
			font-size: 1.2rem;
			font-weight: 500;
			letter-spacing: .1rem; 
			outline: none; 
			border: none; 
			cursor: pointer; 
		}
		button[aria-disabled='true'] {
			opacity: .6;
			pointer-events: none;
		}
		@media (max-width: 900px) {
			/* padding: 1rem;  */
            min-width: 50%; 
		}
        @media (max-width: 480px) {
            min-width: 80%; 
        }
`; 

export default CartWrapper; 