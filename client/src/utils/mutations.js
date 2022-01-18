import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
    mutation Login($email: String!, $password: String!){
        login(email: $email, password: $password){
            token 
            user {
                _id
                username
                email
            }
        }
    }
`

export const ADD_USER = gql`
    mutation AddUser($username: String!, $email: String!, $password: String!){
        addUser(username: $username, email: $email, password: $password){
            user {
                username
                email 
            }
        }
    }
`

export const SAVE_BOOK = gql`
    mutation SaveBook($_id: ID!, $book: BookInput!){
        saveBook(_id: $_id, book: $book) {
            username
            email
            savedBooks {
                title
            }
            
        }
    }
`

export const REMOVE_BOOK = gql`
    mutation RemoveBook($_id: ID!, $bookId: String!){
        removeBook(_id: $_id, bookId: $bookId){
            savedBooks {
                title
                authors
            }
        }
    }
`