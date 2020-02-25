import React, { Component } from 'react';
import PaginationStyles from './styles/PaginationStyles'; 
import styled from 'styled-components'; 

const PaginationContainer = styled.div`
    width: 100%; 
    display: flex; 
    justify-content: center; 
`;
const Pagination = props => {
    return (
        <PaginationContainer> 
            <PaginationStyles>
                <p>Pagination</p>
            </PaginationStyles>
        </PaginationContainer>
    );
};


export default Pagination;