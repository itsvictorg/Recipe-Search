

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useMutation } from '@apollo/client';

// import { ADD_RECIPE } from '../utils/mutations';
// import { QUERY_RECIPES } from '../utils/queries';

// import Auth from '../utils/auth';

// const RecipeForm = () => {
//   const [{title, servings, ingredients, instructions}, setRecipe] = useState('');

//   const [characterCount, setCharacterCount] = useState(0);

//   const [addRecipe, { error }] = useMutation(ADD_RECIPE, {
//     update(cache, { data: { addRecipe } }) {
//       try {
//         const { recipes } = cache.readQuery({ query: QUERY_RECIPES });

//         cache.writeQuery({
//           query: QUERY_RECIPES,
//           data: { recipes: [addRecipe, ...recipes] },
//         });
//       } catch (e) {
//         console.error(e);
//       }
//     },
//   });

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const { data } = await addRecipe({
//         variables: {
//             title,
//             servings,
//             ingredients,
//             instructions,
//             author: Auth.getProfile().data.username,

//         },
//       });

//       setRecipe('');
//       console.log(data)
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     if (name === 'recipeText' && value.length <= 280) {
//       setRecipe(value);
//       setCharacterCount(value.length);
//     }
//   };

//   return (
//     <div>
//       <h3>Create a New Recipe</h3>

//       {Auth.loggedIn() ? (
//         <>
        
//           <p
//             className={`m-0 ${
//               characterCount === 280 || error ? 'text-danger' : ''
//             }`}
//           >
//             Character Count: {characterCount}/280
//           </p>
//           <form
//             className="flex-row justify-center justify-space-between-md align-center"
//             onSubmit={handleFormSubmit}
//           >
             
//             <div className="col-12 col-lg-9">
               
//               <textarea
//                 name="title"
//                 placeholder="Title"
//                 value={title}
//                 className="form-input w-100"
//                 style={{ lineHeight: '1.5', resize: 'vertical' }}
//                 onChange={handleChange}
//                 ></textarea>
//                 <textarea
//                 name="servings"
//                 placeholder="Servings"
//                 value={servings}
//                 className="form-input w-100"
//                 style={{ lineHeight: '1.5', resize: 'vertical' }}
//                 onChange={handleChange}
//                 ></textarea>
//                 <textarea
//                 name="ingredients"
//                 placeholder="Ingredients"
//                 value={ingredients}
//                 className="form-input w-100"
//                 style={{ lineHeight: '1.5', resize: 'vertical' }}
//                 onChange={handleChange}
//                 ></textarea>
//                 <textarea
//                 name="instructions"
//                 placeholder="Instructions"
//                 value={instructions}
//                 className="form-input w-100"
//                 style={{ lineHeight: '1.5', resize: 'vertical' }}
//                 onChange={handleChange}
//                 ></textarea>

//             </div>

//             <div className="col-12 col-lg-3">
//               <button className="btn btn-primary btn-block py-3" type="submit">
//                 Add Recipe
//               </button>
//             </div>
//             {error && (
//               <div className="col-12 my-3 bg-danger text-white p-3">
//                 {error.message}
//               </div>
//             )}
//           </form>
//         </>
//       ) : (
//         <p>
//           You need to be logged in to share your recipes. Please{' '}
//           <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
//         </p>
//       )}
//     </div>
//   );
// };

// export default RecipeForm;
