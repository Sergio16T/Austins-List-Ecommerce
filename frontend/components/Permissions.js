import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo'; 
import gql from 'graphql-tag'; 
import styled from 'styled-components';
import PropTypes from "prop-types"; 

const Table = styled.table`
  border-spacing: 0;
  width: 100%;
  max-width: 1000px; 
  border: 1px solid ${props => props.theme.offWhite};
  thead {
    font-size: 10px;
  }
  td,
  th {
    border-bottom: 1px solid ${props => props.theme.offWhite};
    border-right: 1px solid ${props => props.theme.offWhite};
    padding: 5px; 
    position: relative;
    color: black; 
    &:last-child {
      border-right: none;
      width: 150px;
      button {
        width: 100%;
      }
    }
    label {
      display:block; 
      padding: 10px 5px;
    }
  }
  tr {
    &:hover {
      background: ${props => props.theme.offWhite};
    }
  }
`;
const possiblePermissions = [
    'ADMIN',
    'USER',
    'ITEMCREATE',
    'ITEMUPDATE',
    'ITEMDELETE',
    'PERMISSIONUPDATE' 
]; 

const ALL_USERS_QUERY = gql`
    query ALL_USERS_QUERY {
        users {
            id
            name
            email
            permissions
        }
    }
`; 

const UPDATE_PERMISSIONS_MUTATION = gql`
    mutation UPDATE_PERMISSIONS_MUTATION($permissions: [Permission], $userId: ID!) {
        updatePermissions(permissions: $permissions, userId: $userId ) {
            id
            name
            email
            permissions
        }
    }
`; 

const PermissionsWrapper = styled.div`
    background: linear-gradient(to Bottom, rgba(10,10,54,1) 100px, white 0%); 
    height: 100vh; 
    position: relative;
    .container {
        padding: 200px 50px; 
    }
    div {
        position: block; 
        color: white; 
    }
`; 
class Permissions extends Component {
    render() {
        return (
            <PermissionsWrapper>
            <div className="container">
            <Query query={ALL_USERS_QUERY}>
                {({data, error, loading}) => {
                    if (loading) return null; 
                    if(data) console.log(data);  
                    return ( 
                    <div>
                        <div>
                            <h2>Manage Permissions</h2>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        {possiblePermissions.map((permission,index) => (
                                            <th key={index}>{permission}</th>
                                        ))}
                                        <th>👇</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.users.map(user => <UserPermissions key={user.id} user={user}/>)}
                                </tbody>
                            </Table>
                        </div>
                     </div>
                    
                )}}
            </Query>
            </div>
            </PermissionsWrapper>
        );
    }
}

class UserPermissions extends React.Component {
    static propTypes = {
        user: PropTypes.shape({
            name: PropTypes.string, 
            email: PropTypes.string,
            id: PropTypes.string,
            permissions: PropTypes.array,
        }).isRequired, 
    }; 
    state = { //seeding of inital state ok to set state via props for this useCase
        permissions: this.props.user.permissions
    }
    handlePermissionChange = e => {
        const checkBox = e.target; 
        // take a copy of current permissions
        let updatedPermissions = [...this.state.permissions]; 
        // figure out if we need to remove or add this permission 
        if(checkBox.checked) {
            updatedPermissions.push(checkBox.value); 
        } else {
            updatedPermissions = updatedPermissions.filter(permission => permission !== checkBox.value);
        }
        this.setState({
            permissions: updatedPermissions
        });
    }
    render() {
        const user = this.props.user; 
        return (
            <Mutation mutation={UPDATE_PERMISSIONS_MUTATION} variables={{
                permissions: this.state.permissions, 
                userId: this.props.user.id
            }}>
                {(updatePermissions, {loading, error})=> (
                    <React.Fragment>
                    {error && <tr><td colSpan="8">{error.message.replace("GraphQL error:", "")}</td></tr>}
                    <tr>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        {possiblePermissions.map((permission,index) => (
                        <td key={`${index}a`}>
                            <label htmlFor={`${user.id}-permission-${permission}`}>
                                <input type="checkbox" 
                                id={`${user.id}-permission-${permission}`}
                                checked={this.state.permissions.includes(permission)}
                                value={permission}
                                onChange={this.handlePermissionChange}
                                />
                            </label>
                        </td>  
                        ))}
                        <td><button 
                        type="button"
                        disabled={loading}
                        onClick={updatePermissions}
                        >Updat{loading ? 'ing' : 'e'}</button></td>
                    </tr>
                </React.Fragment>
            )}
            </Mutation>
        );
    }
}
export default Permissions;