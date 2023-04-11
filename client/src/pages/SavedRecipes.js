// FILE BROUGHT BACK BY VICTOR APRIL 9TH

// import React, { useState, useEffect } from 'react';
// import {
//   Container,
//   Card,
//   Button,
//   Row,
//   Col
// } from 'react-bootstrap';

// import { getMe, deleteRecipe } from '../utils/API';
// import Auth from '../utils/auth';
// import { removeRecipeId } from '../utils/localStorage';

// const SavedRecipes = () => {
//   const [userData, setUserData] = useState({});

//   // use this to determine if `useEffect()` hook needs to run again
//   const userDataLength = Object.keys(userData).length;

//   useEffect(() => {
//     const getUserData = async () => {
//       try {
//         const token = Auth.loggedIn() ? Auth.getToken() : null;

//         if (!token) {
//           return false;
//         }

//         const response = await getMe(token);

//         if (!response.ok) {
//           throw new Error('something went wrong!');
//         }

//         const user = await response.json();
//         setUserData(user);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     getUserData();
//   }, [userDataLength]);
//   console.log(userDataLength)

//   // create function that accepts the recipe's mongo _id value as param and deletes the recipe from the database
//   const handleDeleteRecipe = async (recipeId) => {
//     const token = Auth.loggedIn() ? Auth.getToken() : null;

//     if (!token) {
//       return false;
//     }

//     try {
//       const response = await deleteRecipe(recipeId, token);

//       if (!response.ok) {
//         throw new Error('something went wrong!');
//       }

//       const updatedUser = await response.json();
//       setUserData(updatedUser);
//       // upon success, remove recipe's id from localStorage
//       removeRecipeId(recipeId);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // if data isn't here yet, say so
//   if (!userDataLength) {
//     return <h2>LOADING...</h2>;
//   }
//   if(userDataLength === 0){
//     return <h2>No Recipes</h2>;
//   }

//   return (
//     <>
//       <div fluid className="text-light bg-dark p-5">
//         <Container>
//           <h1>Viewing saved recipes!</h1>
//         </Container>
//       </div>
//       <Container>
//         <h2 className='pt-5'>
//           {userData.savedRecipes.length
//             ? `Viewing ${userData.savedRecipes.length} saved ${userData.savedRecipes.length === 1 ? 'recipe' : 'recipes'}:`
//             : 'You have no saved recipes!'}
//         </h2>
//         <Row>
//           {userData.savedRecipes.map((recipe) => {
//             return (
//               <Col md="4">
//                 <Card key={recipe.recipeId} border='dark'>
//                   {recipe.image ? <Card.Img src={recipe.image} alt={`The cover for ${recipe.title}`} variant='top' /> : null}
//                   <Card.Body>
//                     <Card.Title>{recipe.title}</Card.Title>
//                     <p className='small'>Authors: {recipe.authors}</p>
//                     <Card.Text>{recipe.description}</Card.Text>
//                     <Button className='btn-block btn-danger' onClick={() => handleDeleteRecipe(recipe.recipeId)}>
//                       Delete this Recipe!
//                     </Button>
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

// export default SavedRecipes;
