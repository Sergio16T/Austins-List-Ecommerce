import React, { Component } from 'react';
import PaginationStyles from './styles/PaginationStyles'; 
import { Query } from 'react-apollo'; 
import Head from "next/head"; 
import Link from "next/link"; 
import styled from 'styled-components'; 
import gql from 'graphql-tag'; 

const perPage = 4; 

const PAGINATION_QUERY = gql`
    query PAGINATION_QUERY{
        itemsConnection {
            aggregate {
                count
            }
        }
    }
`;


const PaginationContainer = styled.div`
    padding-top: 2rem; 
    width: 100%; 
    display: flex; 
    justify-content: center; 
`;
const Pagination = props => {
    return (
        <PaginationContainer>
            <Query query={PAGINATION_QUERY}>
                {({data, error, loading}) => {
                    if(error) return <p>{error.message}</p>
                    if(loading) return null
                    const count = data.itemsConnection.aggregate.count; 
                    const pages = Math.ceil(count / perPage); 
                    return (
                    <PaginationStyles>
                        <Head>
                            <title>Austin Arts page {props.page} of {pages}</title>
                        </Head>
                        <Link                      
                        href={{
                            pathname: "/items",
                            query: {page: props.page -1}
                        }}
                        >
                        <a aria-disabled={props.page <= 1}> &#8592; Prev</a>
                        </Link>
                        <p>Page {props.page} of {pages}</p>
                        <Link                      
                        href={{
                            pathname:"/items",
                            query: {page: props.page + 1}
                        }}

                        >
                        <a aria-disabled={props.page >= pages}>Next &#8594;</a>
                        </Link>
                    </PaginationStyles>
                    )}}
            </Query> 
        </PaginationContainer>
    );
};


export default Pagination;