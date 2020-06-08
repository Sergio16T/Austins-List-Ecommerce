import React, { Component, useState } from 'react';
import { Query } from 'react-apollo'; 
import Link from 'next/link'; 
import {SINGLE_ITEM_QUERY} from './UpdateItem'; 
import { ItemWrapper, SingleItemStyles, StyledAccordion } from './styles/SingleItemStyles'; 
import formatMoney from '../lib/formatMoney'; 
import AddToCart from './AddToCart'; 
import DeleteItem from './DeleteItem'; 
import WithPagination from './WithPagination'; 


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

