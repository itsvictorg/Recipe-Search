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

      console.log('Response to Search');
      setSearchedRecipes(recipeData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a recipe to our database
  const handleSaveRecipe = async (recipeId) => {
    // find the recipe in `searchedrecipes` state by the matching id
    console.log('were in', recipeId);
    const recipeToSave = searchedRecipes.find((recipe) => recipe.recipeId === recipeId);

    
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    console.log('before save', recipeToSave);

    try {
      await saveRecipe({
        variables: { newRecipe: { ...recipeToSave } },
      });
      // if recipe successfully saves to user's account, save recipe id to state
      setSavedRecipeIds([...savedRecipeIds, recipeToSave.recipeId]);
      console.log(savedRecipeIds);
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

      <Container>
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
                  {/* {recipe.image ? (
                    <Card.Img src={recipe.image} alt={`The cover for ${recipe.title}`} variant='top' />
                  ) : null}   NOT NEEDED our search engine doesn't included images*/}
                  <Card.Body>
                    <Card.Title>{recipe.title}</Card.Title>
                    <p className='small'>servings: {recipe.servings}</p>
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
    </>
  );
};

export default SearchGPT;