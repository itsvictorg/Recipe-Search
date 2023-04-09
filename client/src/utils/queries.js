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

export const ADD_RECIPE = gql`
{
  saveRecipe(newRecipe: InputRecipe) {
    _id
    username
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

export const QUERY_RECIPES = gql`
  {
    recipes {
      _id
      recipeText
      author
      createdAt
      commentCount
      comments {
        _id
        commentText
        createdAt
        username
      }
    }
  }
`;
