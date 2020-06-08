import styled from 'styled-components';

const PaginationStyles = styled.div`
  text-align: center;
  display: inline-grid;
  grid-template-columns: repeat(4, auto);
  align-items: stretch;
  justify-content: center;
  align-content: center;
  margin: 2rem 0;
  border: 1px solid ${props => props.theme.lightgray};
  border-radius: 10px;
  & > * {
    margin: 0;
    padding: 15px 30px;
    border-right: 1px solid ${props => props.theme.lightgray};
    &:last-child {
      border-right: 0;
    }
  }
  a[aria-disabled='true'] {
    color: grey;
    pointer-events: none;
  }
`;

const PaginationContainer = styled.div`
    padding-top: 4rem; 
    width: 100%; 
    display: flex; 
    justify-content: center; 
    @media (max-width: 480px) {
        padding: 2rem 0; 
    }
`;
const Placeholder = styled.div`
    height: 45px;
    margin-top: 24px; 
    margin-bottom: 24px; 
`; 

export default PaginationStyles;

export { PaginationContainer, Placeholder }; 