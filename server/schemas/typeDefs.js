const { gql } = require('apollo-server')

const typeDefs = gql`
type Book {
    _id: ID
    bookId: String!
    authors: [String!]
    description: String!
    title: String!
    image: String!
    
}
type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int!
    savedBooks: [Book]
    
}
type Auth {
    token: ID!
    user: User
}
type Query {
    me(_id: ID!): User
}
input BookInput {
    authors: [String!]
    description: String!
    title: String!
    bookId: String!
    image: String!
}
type Mutation {
    login(email: String!, password: String! ): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(_id: ID!, book: BookInput!): User
    removeBook(_id: ID!, bookId: String!): User
}
`

module.exports = typeDefs