const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedRecipes` array in User.js
const userRecipeSchema = new Schema(
  {
    recipeId: {
        type: String,
        required: true,
    },
    title: {
      type: String,
      required: true,
    },
    servings: {
      type: String,
      required: true,
    },
    ingredients: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
  }
);



module.exports = userRecipeSchema;