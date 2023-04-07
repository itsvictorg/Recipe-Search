const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    savedRecipes: [Recipe]
  }

  type Recipe {
    _id: ID!
    title: String!
    description: String!
    ingredients: String!
    instructions: String!
    image: String
  }

  input RecipeInput {
    title: String!
    description: String!
    ingredients: String!
    instructions: String!
    image: String
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
    saveRecipe(recipeData: RecipeInput!): User
    removeRecipe(recipeId: String!): User
  }
`;

module.exports = typeDefs;
