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

export const ADD_DONATION = gql`
  mutation addDonation(
    $anyname: String!
    $email: String!
    $amount: String!
  ) {
    addDonation(
      anyname: $anyname
      email: $email
      amount: $amount
    ) {
      
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;