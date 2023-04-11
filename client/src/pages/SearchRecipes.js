// FILE BROUGHT BACK BY VICTOR APRIL 9TH
// import React, { useState, useEffect } from 'react';
// import {
//   Container,
//   Col,
//   Form,
//   Button,
//   Card,
//   Row
// } from 'react-bootstrap';


// import Auth from '../utils/auth';
// import { saveRecipe, getRecipes } from '../utils/API';
// import { saveRecipeIds, getSavedRecipeIds } from '../utils/localStorage';

// const SearchRecipes = () => {
//   // create state for holding returned google api data
//   const [searchedRecipes, setSearchedRecipes] = useState([]);
//   // create state for holding our search field data
//   const [searchInput, setSearchInput] = useState('');

//   // create state to hold saved recipeId values
//   const [savedRecipeIds, setSavedRecipeIds] = useState(getSavedRecipeIds());

//   // set up useEffect hook to save `savedRecipeIds` list to localStorage on component unmount
//   // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
//   useEffect(() => {
//     return () => saveRecipeIds(savedRecipeIds);
//   });

//   // create method to search for recipes and set state on form submit
//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     if (!searchInput) {
//       return false;
//     }

//     try {
//       const response = await getRecipes(searchInput);
//       console.log(response, 'response')
      
//       if (!response) {
//         console.log('line 44')
//         throw new Error('something went wrong!');
        
//       } else{
     
//         console.log('line 49')

//      console.log(response.map)
     

//       const recipeData = response.map((recipe) => ({
//         recipeName: recipe[0].title,
//       }));
      
//       console.log(recipeData, 'recipeData')
      

      

        

//       // const recipeData = items.map((recipe) => ({
//       //   recipeId: recipe.id,
//       //   authors: recipe.volumeInfo.authors || ['No author to display'],
//       //   title: recipe.volumeInfo.title,
//       //   description: recipe.volumeInfo.description,
//       //   image: recipe.volumeInfo.imageLinks?.thumbnail || '',
//       //   link: recipe.volumeInfo.infoLink
//       // }));

//       setSearchedRecipes(recipeData);
//       setSearchInput('');
//     }
//     } catch (err) {
//       //console.error(err);
//     }
//   };

//   // create function to handle saving a recipe to our database
//   const handleSaveRecipe = async (recipeId) => {
//     // find the recipe in `searchedRecipes` state by the matching id
//     const recipeToSave = searchedRecipes.find((recipe) => recipe.recipeId === recipeId);

//     // get token
//     const token = Auth.loggedIn() ? Auth.getToken() : null;

//     if (!token) {
//       return false;
//     }
//     console.log(recipeToSave);

//     try {
//       const response = await saveRecipe(recipeToSave, token);

//       if (!response.ok) {
//         throw new Error('something went wrong!');
//       }

//       // if recipe successfully saves to user's account, save recipe id to state
//       setSavedRecipeIds([...savedRecipeIds, recipeToSave.recipeId]);
//     } catch (err) {
//       console.error(err);
//     }
//   };

  
//   return (
//     <>
//       <div className="text-light bg-dark p-5">
//         <Container>
//           <h1>Search for Recipes!</h1>
//           <Form onSubmit={handleFormSubmit}>
//             <Form>
//               <Col xs={12} md={8}>
//                 <Form.Control
//                   name='searchInput'
//                   value={searchInput}
//                   onChange={(e) => setSearchInput(e.target.value)}
//                   type='text'
//                   size='lg'
//                   placeholder='Search for a recipe'
//                 />
//               </Col>
//               <Col xs={12} md={4}>
//                 <Button type='submit' variant='success' size='lg'>
//                   Submit Search
//                 </Button>
//               </Col>
//             </Form>
//           </Form>
//         </Container>
//       </div>

//       <Container>
//         <h2 className='pt-5'>
//           {searchedRecipes.length
//             ? `Viewing ${searchedRecipes.length} results:`
//             : 'Search for a recipe to begin'}
//         </h2>
//         <Row>
//           {searchedRecipes.map((recipe) => {
//             return (
//               <Col md="4">
//                 <Card key={recipe.recipeId} border='dark'>
//                   {recipe.image ? (
//                     <Card.Img src={recipe.image} alt={`The cover for ${recipe.title}`} variant='top' />
//                   ) : null}
//                   <Card.Body>
//                     <Card.Title>{recipe.title}</Card.Title>
//                     <p className='small'>Authors: {recipe.authors}</p>
//                     <Card.Text>{recipe.description}</Card.Text>
//                     {Auth.loggedIn() && (
//                       <Button
//                         disabled={savedRecipeIds?.some((savedRecipeId) => savedRecipeId === recipe.recipeId)}
//                         className='btn-block btn-info'
//                         onClick={() => handleSaveRecipe(recipe.recipeId)}>
//                         {savedRecipeIds?.some((savedRecipeId) => savedRecipeId === recipe.recipeId)
//                           ? 'This recipe has already been saved!'
//                           : 'Save this Recipe!'}
//                       </Button>
//                     )}
//                   </Card.Body>
//                 </Card>
//               </Col>
//             );
//           })}
//         </Row>
//       </Container>
//     </>
//   );
// };


// export default SearchRecipes;
