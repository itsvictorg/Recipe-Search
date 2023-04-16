import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { SAVE_RECIPE } from "../../utils/mutations";

import Auth from "../../utils/auth";

const RecipeForm = () => {


  const [recipe, setRecipe] = useState({});

    const { title, servings, ingredients, instructions } = recipe;

  const [characterCount, setCharacterCount] = useState(0);

// addRecipe is the mutation function
  const [saveRecipe, { error }] = useMutation(SAVE_RECIPE);
// handleFormSubmit is the function that is called when the form is submitted
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await saveRecipe({
        variables: { newRecipe: recipe },
      });

      setRecipe("");
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };
// handleChange is the function that is called when the form is changed
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (value.length <= 280) {
      setRecipe({...recipe, [name]: value});
      setCharacterCount(value.length);
    }
    console.log(name, value);
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
                      onChange={handleChange}
                    ></textarea>
                    <textarea
                      name="servings"
                      placeholder="Servings"
                      value={servings}
                      className="form-servings w-100"
                      style={{ lineHeight: "1.5", resize: "vertical" }}
                      onChange={handleChange}
                    ></textarea>
                    <textarea
                      name="ingredients"
                      placeholder="Ingredients"
                      value={ingredients}
                      className="form-ingredients w-100"
                      style={{ lineHeight: "1.5", resize: "vertical" }}
                      onChange={handleChange}
                    ></textarea>
                    <textarea
                      name="instructions"
                      placeholder="Instructions"
                      value={instructions}
                      className="form-instructions w-100"
                      style={{ lineHeight: "1.5", resize: "vertical" }}
                      onChange={handleChange}
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
