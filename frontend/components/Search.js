import React, { Component } from 'react';
import Downshift from 'downshift'; 
import Router from 'next/router'; 
import { ApolloConsumer } from 'react-apollo'; 
import gql from 'graphql-tag'; 
import debounce from 'lodash.debounce'; 
import { SearchWrapper, SearchStyles, DropDown, DropDownItem } from './styles/SearchStyles'; 


const SEARCH_ITEMS_QUERY =gql`
    query SEARCH_ITEMS_QUERY ($searchTerm: String!) {
        items (where: {
            OR: [
                { title_contains: $searchTerm }, 
                { description_contains: $searchTerm }
            ]
        }) {
            id 
            title
            image
        }
    }
`; 


class Search extends Component {
    state = {
        items: [], 
        loading: false,
        isOpen: false
    }
    componentDidUpdate(prevProps) {
        if(prevProps.searchBarExpanded !== this.props.searchBarExpanded && this.props.searchBarExpanded === false) {
            this.setState({
                searchBarOverflow: false
            }); 
            this.downshift.clearSelection(); 
        }
        if(prevProps.searchBarExpanded !== this.props.searchBarExpanded && this.props.searchBarExpanded) {
            this.searchInput.focus(); 
        }
    }
    onChange = debounce(async (e, client) => {
        console.log("searching..."); 
        this.setState({ loading: true, search: true }); 
        const res = await client.query({
            query:  SEARCH_ITEMS_QUERY , 
            variables: {searchTerm: e.target.value.trim()}
        });
        console.log(res); 
        this.setState({
            items: res.data.items, 
            loading: false
        }); 
    }, 350); 
    routeToItem = (item) => {
        if(!item) return; 
        console.log(item); 
        Router.push({
            pathname: "/item", 
            query: {id: item.id}
        }); 
    }
    render() {
        return (
                    <SearchWrapper 
                    id="searchWrapper"
                    pathName ={this.props.pathName} 
                    searchBarExpanded={this.props.searchBarExpanded}
                    searchBarOverflow={this.state.searchBarOverflow}
                    >
						<SearchStyles>
                            <Downshift
                            id="item-down-shift" 
                            onChange={this.routeToItem} 
                            ref={(el)=> this.downshift = el}
                            itemToString={item => item === null ? '' : item.title}>
                            {({ getInputProps, getItemProps, isOpen, 
                            inputValue, highlightedIndex, clearSelection}) => (
                            <div className="sub-bar">
                                <ApolloConsumer>
                                    {(client) => (
                                    <React.Fragment>
                                        {/* <button id="searchButton">
                                            <img src="https://cdn.shopify.com/s/files/1/0558/4169/t/138/assets/icon-search.svg?v=12627112760336229118"></img>
                                        </button> */}
                                        <input
                                        {...getInputProps({
                                            ref: (el) => { this.searchInput = el; }, 
                                            type: "search",
                                            placeholder:"", 
                                            id:"search", 
                                            className: this.state.loading ? "loading" : '', 
                                            onChange: (e) => {
                                                //If you want to access the event properties in an asynchronous way, you should call event.persist() on the event, which will remove the synthetic event from the pool and allow references to the event to be retained by user code.
                                                e.persist(); 
                                                if(e.target.value.length) {
                                                    this.setState({  
                                                        searchBarOverflow: true
                                                    }); 
                                                }
                                                this.onChange(e, client); 
                                        }, 
                                        })}
                                        />
                                        {/* <button>
                                                <img src="https://cdn.shopify.com/s/files/1/0558/4169/t/138/assets/icon-search.svg?v=12627112760336229118"></img>
                                        </button> */}
                                    </React.Fragment>
                                    )}  
                                </ApolloConsumer>
                                {isOpen && (
                                    <DropDown>
                                    {this.state.items.map((item, index) => (
                                        <DropDownItem
                                        {...getItemProps({item})}
                                        key={item.id}
                                        highlighted={index === highlightedIndex ? true : false}
                                        >
                                                <img width="50" src={item.image[0]} alt={item.title}/>
                                                {item.title}
                                        </DropDownItem>
                                    ))}
                                    </DropDown>
                                )}
                                {this.state.search && !this.state.items.length && !this.state.loading && 
                                    <DropDownItem> Nothing found for {inputValue} </DropDownItem>}
                            </div>
                            )}
                            </Downshift>
						</SearchStyles>
					</SearchWrapper>

        );
    }
}

export default Search;