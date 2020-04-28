import React, { Component } from 'react';
import { Query } from 'react-apollo'; 
import { PAGINATION_QUERY } from './Pagination'; 
import { StyledFormWrapper } from './styles/FormStyles'; 

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
                            let skip = page * 4 - 4;

                            return <Comp page={page} skip={skip}/>
                        }}
                    </Query>            
            );
        }
    }
}

export default WithPagination;