// Search page is now HOME
import React, { useState, useEffect } from 'react';

import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row
} from 'react-bootstrap';

// import full view of recipe
import View from '../modals/View';

import Auth from '../../utils/auth';

import { recipeGPTsearch } from '../../utils/API';

import { saveRecipeIds, getSavedRecipeIds } from '../../utils/localStorage';

// import mutation use and mutations
import { useMutation } from '@apollo/client';
import { SAVE_RECIPE } from '../../utils/mutations'
import { generateUID } from '../../utils/helpers';

const SearchGPT = () => {
  // create state for holding returned google api data
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved recipeId values
  const [savedRecipeIds, setSavedRecipeIds] = useState(getSavedRecipeIds());
  // usemutation for saverecipe is save_recipe  
  const [saveRecipe] = useMutation(SAVE_RECIPE);

  // set up useEffect hook to save `savedrecipeIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveRecipeIds(savedRecipeIds);
  });

  // create method to search for recipes and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await recipeGPTsearch(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const items = await response.json();

      const recipeData = items.map((recipe, index) => ({
        recipeId: generateUID(),
        title: recipe.title,
        servings: recipe.servings,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
      }));

      setSearchedRecipes(recipeData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a recipe to our database
  const handleSaveRecipe = async (recipeId) => {
    console.log('Save Recipe', recipeId);

    // find the recipe in `searchedrecipes` state by the matching id
    const recipeToSave = searchedRecipes.find((recipe) => recipe.recipeId === recipeId);
    
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    console.log('Token True', recipeToSave);

    try {
      await saveRecipe({
        variables: { newRecipe: { ...recipeToSave } },
      });
      // if recipe successfully saves to user's account, save recipe id to state
      setSavedRecipeIds([...savedRecipeIds, recipeToSave.recipeId]);
      console.log('useState setSavedRecipeIds', savedRecipeIds);
    }
    catch (err) {
      console.error(err);
    };
  };



  return (
    <>
      <Container>
        <Form onSubmit={handleFormSubmit}>
          <Row>
            <Col xs={12} md={8}>
              <Form.Control
                name='searchInput'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                type='text'
                size='lg'
                placeholder='Search for a recipe'
              />
            </Col>
            <Col xs={12} md={4}>
              <Button type='submit' variant='success' size='lg'>
                Submit Search
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>

      <Container className='results'>
        <h2 className='pt-5'>
          {searchedRecipes.length
            ? `Viewing ${searchedRecipes.length} results:`
            : 'Search for a recipe to begin'}
        </h2>
        <Row>
          {searchedRecipes.map((recipe) => {
            return (
              <Col key={recipe.recipeId} md="4">
                <Card border='dark'>
                  {/* here i gave the card body data attributes would've used one but couldn't split data.  when clicked attribute values will be passed to view modal */}
                  {/* data-function={handleSaveRecipe} WHATEVER this is is causing an error when searching recipes. Data attributes can't be functions only values.*/}
                  <Card.Body  data-title={recipe.title} data-servings={recipe.servings} data-ingredients={recipe.ingredients} data-instructions={recipe.instructions}>
                    <Card.Title>{recipe.title}</Card.Title>
                    <p className='small'>servings: {recipe.servings}</p>
                    <button className="recipe-modal-btn modal-color" onClick={(e) => {
                      document.getElementById('id01').style.display='block';
                      document.querySelector('.recipe-title').textContent = e.target.parentElement.dataset.title;
                      document.querySelector('.recipe-servings').textContent = e.target.parentElement.dataset.servings;
                      document.querySelector('.recipe-ingredients').textContent = e.target.parentElement.dataset.ingredients;
                      document.querySelector('.recipe-instructions').textContent = e.target.parentElement.dataset.instructions;
                      }}>View Recipe</button>

                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedRecipeIds?.some((savedRecipeId) => savedRecipeId === recipe.recipeId)}
                        className='btn-block btn-info'
                        onClick={() => handleSaveRecipe(recipe.recipeId)}>
                        {savedRecipeIds?.some((savedRecipeId) => savedRecipeId === recipe.recipeId)
                          ? 'This recipe has already been saved!'
                          : 'Save this Recipe!'}
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>

      <View />
    </>
  );
};

export default SearchGPT;