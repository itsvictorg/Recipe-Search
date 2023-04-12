// this was the saved books file.
// styling some how will need to be refactored.
// once adding a recipe is working we'll come back to this deleting styling after we ensure it's functionality.
import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import View from '../components/modals/View';


import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

// import create personal recipe form
import PersonalRecipe from '../components/forms/PersonalRecipe';

// here are the personal styling file for this page.
import '../styles/Dashboard.css';

import { GET_ME } from '../utils/queries';
import { REMOVE_RECIPE } from '../utils/mutations';
import Auth from '../utils/auth';
import { removeRecipeId } from '../utils/localStorage';

const Dashboard = () => {
  const { loading, data } = useQuery(GET_ME);
  const [deleteRecipe] = useMutation(REMOVE_RECIPE);
  const userData = data?.me || {};

  const handleDeleteRecipe = async (recipeId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;  

    if(!token){return false;};

    try{
      await deleteRecipe({
        variables: { recipeId },
      });

      removeRecipeId(recipeId);
    }catch(err){
      console.log(err);
    };
  };

  if(loading){return <h2>loading now...</h2>};

  return (
    <>
    {/* <PersonalRecipe /> */}
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved Recipes!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedRecipes.length
            ? `Viewing ${userData.savedRecipes.length} saved ${userData.savedRecipes.length === 1 ? 'recipe' : 'recipes'}:`
            : 'You have no saved recipes!'}
        </h2>
       {/* create modal to view create recipe form */}
        <Button className="create-recipe-modal-btn modal-color" onClick={(e) => 
          document.getElementById('id02').style.display='block'}>Add Recipe</Button>
        <Row>
          {userData.savedRecipes.map((recipe) => {
            return (
              <Col md="4">
                <Card border='dark'>
                  {/* here i gave the card body data attributes would've used one but couldn't split data.  when clicked attribute values will be passed to view modal */}
                  <Card.Body data-title={recipe.title} data-servings={recipe.servings} data-ingredients={recipe.ingredients} data-instructions={recipe.instructions}>
                    <Card.Title>{recipe.title}</Card.Title>
                    <p className='small'>servings: {recipe.servings}</p>
                    <button className="recipe-modal-btn modal-color" onClick={(e) => {
                      document.getElementById('id01').style.display='block';
                      document.querySelector('.recipe-title').textContent = e.target.parentElement.dataset.title;
                      document.querySelector('.recipe-servings').textContent = e.target.parentElement.dataset.servings;
                      document.querySelector('.recipe-ingredients').textContent = e.target.parentElement.dataset.ingredients;
                      document.querySelector('.recipe-instructions').textContent = e.target.parentElement.dataset.instructions;
                      }}>View Recipe</button>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteRecipe(recipe.recipeId)}>
                      Delete this Recipe!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
      <PersonalRecipe />
      <View />
      
    </>
  );
};

export default Dashboard;