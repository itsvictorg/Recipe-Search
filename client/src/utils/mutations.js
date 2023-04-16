import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// CHECK OUT THE SAVE MODEL HERE
export const SAVE_RECIPE = gql`
  mutation saveRecipe($newRecipe: RecipeInput!) {
    saveRecipe(newRecipe: $newRecipe) {
      _id
      username
      recipeCount
      savedRecipes {
        _id
        recipeId
        title
        servings
        ingredients
        instructions
      }
    }
  }
`;

// SAME CHECK OUT MODEL FLOW
export const REMOVE_RECIPE = gql`
  mutation removeRecipe($id: ID!) {
    removeRecipe(id: $id) {
      _id
      username
      recipeCount
      savedRecipes {
        _id
      }
    }
  }
`;


