import React, { Component } from 'react';
import { Query } from 'react-apollo'; 
import { PAGINATION_QUERY } from './Pagination'; 

const WithPagination = (Comp) => {
   return class PaginationQuery extends Component {
        render() {
            return (
                    <Query query={PAGINATION_QUERY}>
                        {({data, error, loading}) => {
                            if(loading) return null; 
                            const count = data.itemsConnection.aggregate.count; 
                            let lastOnPage  = count/4 === 0; 
                            let page = Math.ceil((count+1)/4) 
                            //let's move page and skip down to component to calculate refetch query for All Items that way this HOC is resuable to get count without adding cartItem logic of adding count here for new item
                            let skip = page * 4 - 4;
                            return <Comp page={page} skip={skip}/>
                        }}
                    </Query>            
            );
        }
    }
}

export default WithPagination;