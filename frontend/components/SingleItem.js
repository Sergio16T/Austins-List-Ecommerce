import React, { Component, useState } from 'react';
import { Query } from 'react-apollo'; 
import Link from 'next/link'; 
import {SINGLE_ITEM_QUERY} from './UpdateItem'; 
import styled from 'styled-components'; 
import formatMoney from '../lib/formatMoney'; 
import AddToCart from './AddToCart'; 
import DeleteItem from './DeleteItem'; 
import WithPagination from './WithPagination'; 

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
class SingleItem extends Component {
    componentDidMount () {
        window.addEventListener('scroll', this.handleScroll); 
    }
    componentWillUnmount () {
        window.removeEventListener('scroll', this.handleScroll); 
    }
    handleScroll = () => {
        if(window.scrollY < 1000) {

        }
    }
    render() {
        return (
            <Query query={SINGLE_ITEM_QUERY} variables={{id: this.props.id}}>
                {({data, error, loading}) => {
                if(loading) return null; 
                if(error) return <p data-test="graphql-error">{error.message.replace("GraphQL error:", '')}</p>
                if(!data.item) return <p>Item not found for {this.props.id}</p>
                const item = data.item; 
                // if(data) console.log(data); 
                return (
                    <ItemWrapper>
                        <SingleItemStyles gridLength={item.largeImage.length}>
                            <div className="gridContainer">
                                <div className={item.largeImage.length === 2 ? "gridBox2" : item.largeImage.length === 4 ? "gridBox4" : "gridBox"}>
                                    {data.item.largeImage.map((image, index) => 
                                        <div key={index} className={`g${index+1}`}>
                                            <img src={image} alt={`${item.title} image ${index + 1}`}/>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="itemBox">
                                <div className="box">
                                    <h2 className="itemTitle">Viewing {data.item.title}</h2> 
                                    <p className="itemDesc">{formatMoney(data.item.price)}</p>
                                    {/* <button id="addToCart">Add to Cart</button> */}
                                    <AddToCart 
                                    toggleCart={this.props.toggleCart}
                                    id={this.props.id}/>
                                    <Link href={{
                                    pathname: '/update', 
                                    query: {id: item.id}
                                    }}>
                                        <button id="editButton"> Edit </button>
                                    </Link>
                                    {/* <DeleteItem id={item.id} page={this.props.page}/> */}
                                    <Accordion title="Shipping">
                                        <Shipping/>
                                    </Accordion>
                               </div>
                            </div>
                        </SingleItemStyles>
                    </ItemWrapper>
            
                )}}
            </Query>
        );
    }
}

const Accordion = (props) => {
    const [toggleOn, setToggleOn] = useState(false); 

    return (
        <StyledAccordion toggleOn={toggleOn}>
        <button className="accordion-title" onClick={() => setToggleOn(!toggleOn)}>
            <span>{props.title}</span>
            {!toggleOn ?  
            <img 
            src="https://cdn.shopify.com/s/files/1/0558/4169/t/138/assets/accordion-open.png?v=14470115593006859208"
            id="open"/> 
            : 
            <img src="https://cdn.shopify.com/s/files/1/0558/4169/t/138/assets/accordion-close.png?v=17118607057482536444" id="closed"/>
            }
        </button>
        <div className="accordion-body">
            {props.children}
        </div>
        </StyledAccordion>
    )
}

const Shipping = () => {
    return (
    <ul>
        <li> Free shipping is available on all orders $99 and over within the contiguous US.</li>
        <li>For a limited time, we are offering free shipping, customs fees and import duties on all orders to Australia, Canada and the United Kingdom.</li>

        <li>All other international orders ship DHL or UPS. Shipping rates will be calculated based on location and weight. Shipping rate does not include customs, duties & service fees.</li>     

        <li>All orders shipping outside of the contiguous US will be responsible for shipping costs on returns and exchanges back to our facilities.</li>
    </ul>
    ); 
}
export default SingleItem;
export { SINGLE_ITEM_QUERY }; 

