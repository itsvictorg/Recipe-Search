// this was the saved books file.
import React from 'react';
import { useQuery, useMutation } from '@apollo/client';

import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

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
        <Row>
          {userData.savedRecipes.map((recipe) => {
            return (
              <Col md="4">
                <Card key={recipe.recipeId} border='dark'>
                  {recipe.image ? <Card.Img src={recipe.image} alt={`The cover for ${recipe.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{recipe.title}</Card.Title>
                    <p className='small'>Authors: {recipe.authors}</p>
                    <Card.Text>{recipe.description}</Card.Text>
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
    </>
  );
};

export default Dashboard;