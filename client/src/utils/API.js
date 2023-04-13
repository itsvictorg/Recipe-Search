  
  // make a search to google books api
  // https://www.googleapis.com/books/v1/volumes?q=harry+potter
  // export const searchGoogleBooks = (queryInput) => {
  //   return fetch(`https://www.googleapis.com/books/v1/volumes?q=${queryInput}`);
  // };

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '17c623df4amsh7e8a7677f639667p1514c3jsnbe350c585e10',
      'X-RapidAPI-Host': 'recipe-by-api-ninjas.p.rapidapi.com'
    }
  };
  
  export const recipeGPTsearch = async (query) => {
    return fetch(`https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe?query=${query}`, options);
  };

  // create stripe fetch request