import styled from 'styled-components'; 

const SearchStyles = styled.div`
position: relative; 
display: flex; 
.sub-bar {
    width: 100%; 
}
input {
	width: 100%; 
	/* height: 47px;  */
    padding: 10px; 
    padding-right: 44px; 
    font-size: 1.4rem; 
    outline: none; 
    box-sizing: border-box; 
    position: relative; 
    border: 1px solid ${props => props.theme.lightgray}; 
    &:focus {
        border: 1px solid #2b3eab; 
    }
}

button {
    position: absolute; 
    display: flex; 
    justify-content: center; 
    top: 0px; 
    left: 1px; 
    width: 44px;  
    height: 46px; 
    border: transparent;  
    background: transparent; 
    outline: none; 
    z-index: 2; 
    /* &:hover {
        cursor: pointer; 
    } */
}
`;
const DropDown = styled.div`
  position: absolute;     
  width: 100%;
  z-index: 2;
  border: 1px solid ${props => props.theme.lightgray};
  overflow: visible; 
`; 

const SearchWrapper = styled.div`
        max-height: ${props => props.searchBarExpanded ? "42px" : "0px"};
        overflow: ${props => !props.searchBarOverflow /*&& !props.searchBarExpanded*/ ? "hidden" : ""};
        transition: max-height .4s ease; 
`; 



const DropDownItem = styled.div`
  border-bottom: 1px solid ${props => props.theme.lightgray};
  background: ${props => (props.highlighted ? '#f7f7f7' : 'white')};
  padding: 1rem;
  transition: all 0.2s;
  ${props => (props.highlighted ? 'padding-left: 2rem;' : null)};
  display: flex;
  align-items: center;
  border-left: 10px solid ${props => (props.highlighted ? props.theme.lightgray : 'white')};
  img {
    margin-right: 10px;
  }
`;

export { SearchWrapper, SearchStyles, DropDown, DropDownItem }; 