const { gql } = require("apollo-server-express");

const typeDefs = gql`
  input InputRecipe {
    recipeId: Int
    author: String
    title: String!
    ingredients: String!
    servings: String!
    instructions: String!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    recipeCount: Int
    savedRecipes: [UserRecipe]
  }

  type UserRecipe {
    recipeId: Int
    title: String!
    ingredients: String!
    servings: String!
    instructions: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }
  
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveRecipe(newRecipe: InputRecipe): User
    removeRecipe(recipeId: ID!): User
  }
`;

module.exports = typeDefs;