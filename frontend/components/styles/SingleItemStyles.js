import styled from 'styled-components'; 

const ItemWrapper = styled.div`
    position: relative; 
    padding-top: 85px; 
    /* position: relative; 
    background: #FAFAFA; */
    padding: 200px 35px;  
    background: #FAFAFA; 
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    overflow: auto; 
    /* background: linear-gradient(to Bottom, rgba(10,10,54,1) 85px, white 0%);   */
    @media (max-width: 800px) {
        /* background: linear-gradient(to Bottom, rgba(10,10,54,1) 10%, white 0%);  
        padding: 15% 0;  */
    }
`;
const SingleItemStyles = styled.div`
    max-width: 1200px;
    /* box-shadow: ${props => props.theme.bs};  */
    display: grid; 
    grid-template-columns: 1fr 1fr; 
    grid-column-gap: 50px; 
    grid-auto-flow: column; 
    /* background: white;  */
    /* padding: 0 2rem;  */
    .gridContainer {
        display: flex; 
        position: relative; 
        .gridBox {
            grid-template-areas:
            "c1 c1"
            "c2 c3"
            "c4 c5"
            "c6 c6"
            ; 
        }
        .gridBox2 {
            grid-template-areas: 
            "c1 c1"
            "c2 c2"
        }
        .gridBox4 {
            grid-template-areas: 
            "c1 c1"
            "c2 c3"
            "c4 c4"
        }
        .gridBox, .gridBox2, .gridBox4 {
            display: grid; 
            grid-template-columns: 1fr 1fr; 
            grid-gap: 3px; 
        
            .g1 {
                grid-area: c1; 
            }
            .g2 {
                grid-area: c2; 
            }
            .g3 {
                grid-area: c3; 
            }
            .g4 {
                grid-area: c4
            }
            .g5 {
                grid-area: c5; 
            }
            .g6 {
                grid-area: c6; 
            }
        }
    }
    .itemBox {
        display: flex;
        text-align: center;
        align-items: center; 
        flex-direction: column;
        position: relative; 
        .box {
            width: 100%; 
        }
        #addToCart {
            background: #2b3eab;
            color: white;
            border: none;
            margin: 4rem 0 1rem 0;  
        }
        #editButton {
            border: 1px solid #2b3eab; 
            background-color: white; 
            color: #2b3eab; 
            margin: 1rem 0 2rem 0; 
        }
        #addToCart, #editButton {
            width: 100%; 
            max-width: 440px; 
			/* background: #2b3eab; */
			text-transform: uppercase;
			/* color: white; */
			padding: 14px;
			font-size: 1.2rem;
			font-weight: 500;
			letter-spacing: .1rem; 
			outline: none; 

			cursor: pointer; 
		}
		#addToCart[aria-disabled='true'], #editButton[aria-disabled='true'] {
			opacity: .6;
			pointer-events: none;
		}
    }
    .itemTitle {
        font-size: 2rem; 
    }
    .itemDesc {
        font-size: 1.2rem; 
    }
    img {
        width: 100%; 
        height: 100%; 
        object-fit: contain; 
    }
    .details {
        margin: 3rem; 
        font-size: 2rem; 
    }
    @media (max-width: 900px) {
        /* margin-top: 20%;  */
        grid-template-columns: 1fr;
        grid-template-rows: .5fr 1fr; 
        .gridBox, .gridBox2, .gridBox4 {
            height: auto; 
        }
    }
`;

const StyledAccordion = styled.div`
    display: flex; 
    flex-direction: column; 
    justify-content: center; 
    align-items: center; 
    margin-bottom: 2rem; 
    position: relative; 
    .accordion-title {
        outline: none; 
        border: none; 
        width: 100%;
        background: white; 
        max-width: 440px;  
        padding: 2rem; 
        font-size: 1.1rem; 
        display: flex; 
        flex-direction: row; 
        justify-content: space-between; 
        font-weight: 500;
        letter-spacing: .1rem; 
        #open, #closed {
            width: 1em; 
        }
        &:hover {
            cursor: pointer; 
        }
    }
    .accordion-body {
        position: absolute; 
        top: 64px; 
        background: white; 
        overflow-y: hidden; 
        max-width: 440px; 
        transition: .3s ease-out; 
        max-height: ${props => props.toggleOn ? "472px" : "0px"}; 
        margin-bottom: 2rem; 
        z-index: 2; 
        ul {
            list-style: none; 
            padding: 1rem 2rem; 
            text-align: left; 
            li {
                font-size: 1.2rem; 
                padding: 1rem 0; 
                letter-spacing: .8px; 
            }
        }
    }

`; 

export { ItemWrapper, SingleItemStyles, StyledAccordion }