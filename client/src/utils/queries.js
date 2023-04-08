import { gql } from '@apollo/client';

export const GET_ME = gql`
  {
    me {
      _id
      username
      recipeCount
      email
      savedRecipes {
        recipeId
        title
        servings
        ingredients
        instructions
      }
    }
  }
`;