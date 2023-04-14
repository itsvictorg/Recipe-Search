import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_RECIPE } from "../../utils/mutations";
import { QUERY_RECIPES } from "../../utils/queries";
import { generateUID } from '../../utils/helpers';

import Auth from "../../utils/auth";

const RecipeForm = () => {
  const [{ title }, setRecipeTitle] = useState("");
  const [{ servings}, setRecipeServings] = useState("");
  const [{ ingredients }, setRecipeIngredients] = useState("");
  const [{ instructions }, setRecipeInstructions] = useState("");
  const [{ newRecipe }, setRecipe] = useState({});
  const [characterCount, setCharacterCount] = useState(0);

  const [addRecipe, { error }] = useMutation(ADD_RECIPE, {
    update(cache, { data: { addRecipe } }) {
      try {
        const { recipes } = newRecipe;
        
        cache.writeQuery({
          query: QUERY_RECIPES,
          data: { recipes: [addRecipe, ...recipes] },
        });
      } catch (e) {
        
        console.error(e);

      }
    },
  });
  


  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const recipeData = {
        title: title,
        servings: servings,
        ingredients: ingredients,
        instructions: instructions,
        Id: generateUID(),
      };

      console.log(recipeData)

      // const { data } = await addRecipe({
      //   variables: recipeData,
      // });

      setRecipe(recipeData);
      addRecipe(recipeData);
      
      setRecipeIngredients("");
      setRecipeInstructions("");
      setRecipeTitle("");
      setRecipeServings("");
      setCharacterCount(0);

    } catch (err) {
      
      console.log("submit error")
      console.error(err);
    }
  };

  const handleTitleChange = (event) => {
    const { name, value } = event.target;

    if (name === "title" && value.length <= 280) {
      setRecipeTitle(value);
      setCharacterCount(value.length);
      console.log(value)
    }

  };

  const handleServingsChange = (event) => {
    const { name, value } = event.target;

    if (name === "servings" && value.length <= 280) {
      setRecipeServings(value);
      setCharacterCount(value.length);
    }
    
  };

  const handleIngredientsChange = (event) => {
    const { name, value } = event.target;

    if (name === "ingredients" && value.length <= 280) {
      setRecipeIngredients(value);
      setCharacterCount(value.length);
    }
  };

  const handleInstructionsChange = (event) => {
    const { name, value } = event.target;

    if (name === "instructions" && value.length <= 280) {
      setRecipeInstructions(value);
      setCharacterCount(value.length);
    }
    
  };

  return (
    <div className="modal-container">
      <div id="id02" className="create-recipe-modal">
        <div className="modal-content animate-zoom recipe-card">
          <header className="modal-container modal-color">
            <span
              className="recipe-modal-btn topright"
              onClick={() => {
                document.getElementById("id02").style.display = "none";
              }}
            >
              &times;
            </span>
            <h3>Create a New Recipe</h3>
          </header>

          {Auth.loggedIn() ? (
            <>
              <div className="modal-container">
                <p
                  className={`m-0 ${
                    characterCount === 280 || error ? "text-danger" : ""
                  }`}
                >
                  Character Count: {characterCount}/280
                </p>
                <form
                  className="flex-row justify-center justify-space-between-md align-center"
                  onSubmit={handleFormSubmit}
                >
                  <div className="col-12 col-lg-9">
                    <textarea
                      name="title"
                      placeholder="Title"
                      value={title}
                      className="form-title w-100"
                      style={{ lineHeight: "1.5", resize: "vertical" }}
                      onChange={handleTitleChange}
                    ></textarea>
                    <textarea
                      name="servings"
                      placeholder="Servings"
                      value={servings}
                      className="form-servings w-100"
                      style={{ lineHeight: "1.5", resize: "vertical" }}
                      onChange={handleServingsChange}
                    ></textarea>
                    <textarea
                      name="ingredients"
                      placeholder="Ingredients"
                      value={ingredients}
                      className="form-ingredients w-100"
                      style={{ lineHeight: "1.5", resize: "vertical" }}
                      onChange={handleIngredientsChange}
                    ></textarea>
                    <textarea
                      name="instructions"
                      placeholder="Instructions"
                      value={instructions}
                      className="form-instructions w-100"
                      style={{ lineHeight: "1.5", resize: "vertical" }}
                      onChange={handleInstructionsChange}
                    ></textarea>
                  </div>

                  <div className="col-12 col-lg-3">
                    <button
                      className="btn btn-primary btn-block py-3"
                      type="submit"
                    >
                      Add Recipe
                    </button>
                  </div>
                  {error && (
                    <div className="col-12 my-3 bg-danger text-white p-3">
                      {error.message}
                    </div>
                  )}
                </form>
              </div>
            </>
          ) : (
            <p>
              You need to be logged in to share your recipes. Please{" "}
              <Link to="/login">login</Link> or{" "}
              <Link to="/signup">signup.</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeForm;
