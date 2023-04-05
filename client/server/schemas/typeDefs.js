const { gql } = require('apollo-server-express');

// TODO: Create type definitions for `Category`, `Product`, `Order` and `User` above the `Auth` type
const typeDefs = gql`
  type Category { 
    name: String!
  }

  type Product {
    name: String
    description: String
    price: Int
    quantity: Int
    category: Category
  }

  type Order {
    purchaseDate: String
    products: [Product]
  }

  type User {
    firstName: String
    lastName: String
    email: String
    orders: [Order]
  }


  type Auth {
    token: ID
    user: User
  }

  type Query {
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    addOrder(products: [ID]!): Order
    updateUser(
      firstName: String
      lastName: String
      email: String
      password: String
    ): User
    updateProduct(_id: ID!, quantity: Int!): Product
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
