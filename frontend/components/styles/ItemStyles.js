import styled from 'styled-components'; 

const ItemStyles = styled.div`
    /* background: rgba(10,10,54,1);  */
    /* background: linear-gradient(to Bottom, rgba(10,10,54,1) 200px, white 0%);  */
    width: 100%;
    background-color: #FAFAFA; 
    min-height: 100vh;  
    position: relative;
    padding-top: 85px; 
    @media (max-width: 600px) {
        padding-top: 100px; 
    }
    `; 
const StyledItem = styled.div`
    display: flex; 
    flex-direction: column; 
    background-color: white; 
    /* border-radius: 10px;  */
    box-shadow: 1px 1px 4px 1px rgba(51,51,51,.2); 
    img {
        width: 100%; 
        height: 330px; 
        object-fit: cover; 
        &:hover {
            cursor: pointer; 
        }
    }
    p {
        font-size: 1.2rem;
    }
`; 
const StyledItemsWithPagination = styled.div`
    position: relative; 
    width: 100%; 
    min-height: 100vh; 
    background-color: #FAFAFA;
`; 

const StyledItemContainer = styled.div`
    display: grid; 
    grid-template-columns: 1fr 1fr; 
    grid-gap: 60px; 
    padding:  0 5%; 
    max-width: 1000px;
    margin: 0 auto; 
    background-color: transparent; 
    /* padding-top: 250px;   */
    text-align: center; 
    @media (max-width: 700px) {
        grid-template-columns: 1fr; 
    }
`; 

// const StyledLoadMessage = styled.div`
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     border-radius: 10px;
//     height: 20px;
//     width: 400px;
//     transform: translate(-50%, -50%);
//     background: white;
//     #itemTitle {
//         padding: 10px; 
//     }
// `; 

const Title = styled.div`
    padding: 1rem; 
    a { 
        font-size: 1.5rem; 
    }
`; 
const ItemButtons = styled.div`
    display: grid; 
    grid-template-columns: 1fr 1fr 1fr; 
    font-size: 1.1rem; 
    border-top: 1px solid #E1E1E1;
    border-bottom: 1px solid #E1E1E1; 
    /* border: 1px solid #2b3eab; */
    grid-gap: 1px; 
    background: #E1E1E1;
    /* background: #2b3eab; */
    /* border-radius: 0 0 10px 10px;  */
    button { 
        background: white; 
        cursor: pointer; 
        padding: 10px; 
        border: none; 
        outline: none; 
    }
    #addToCart {
        font-size: 1.1rem;
    }
    #editButton {
        background: white; 
        padding: 10px; 
        /* border-radius: 0 0 0 10px;  */
        /* border-right: 1px solid #2b3eab;  */
    }
    #deleteBtn {
        /* border-left: 1px solid #2b3eab;  */
        font-size: 1.1rem;
        /* border-radius: 0 0 10px 0; */
    }
`; 
export { ItemStyles, StyledItem, StyledItemsWithPagination, StyledItemContainer, Title, ItemButtons }; 