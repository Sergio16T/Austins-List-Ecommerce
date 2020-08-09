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
                            return <Comp count={count}/>
                        }}
                    </Query>            
            );
        }
    }
}

export default WithPagination;