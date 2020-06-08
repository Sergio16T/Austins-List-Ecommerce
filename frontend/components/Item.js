import React, { Component } from 'react'; 
import Link from 'next/link'; 
import { StyledItem, Title, ItemButtons } from './styles/ItemStyles'; 
import formatMoney from '../lib/formatMoney';
import DeleteItem from "./DeleteItem"; 
import AddToCart from './AddToCart'; 


class Item extends Component {
   constructor(props) {
       super(props); 
   }
    render() {
        const { item } = this.props; 
        return (
            <StyledItem>
                {item.image && 
                    <Link href={{
                        pathname: "/item",
                        query: {id: item.id}
                    }}>
                        <img src={item.image[0]} alt={item.title}/>
                    </Link>
                }
                <Title>
                    <Link href={{
                        pathname: "/item", 
                        query: {id: item.id}
                    }}>
                        <a>{item.title}</a>
                    </Link>
                </Title>
                {/* <p>{item.description}</p> */}
                <p>{formatMoney(item.price)}</p>
                <ItemButtons>
                    <Link href={{
                        pathname: '/update', 
                        query: {id: item.id}
                    }}>
                        <a id="editButton"> Edit </a>
                    </Link>
                    <AddToCart id={item.id} toggleCart={this.props.toggleCart}/>
                    <DeleteItem id={item.id} page={this.props.page}>Delete</DeleteItem>
                </ItemButtons>
            </StyledItem>      
        );
    }
}

export default Item;
export { ItemButtons }