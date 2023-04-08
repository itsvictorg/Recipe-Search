const localKey = 'saved_recipes'

export const getSavedRecipeIds = () => {
    const savedRecipeIds = localStorage.getItem(localKey)
      ? JSON.parse(localStorage.getItem(localKey))
      : [];
  
    return savedRecipeIds;
  };
  
  export const saveRecipeIds = (recipeIdArr) => {
    if (recipeIdArr.length) {
      localStorage.setItem(localKey, JSON.stringify(recipeIdArr));
    } else {
      localStorage.removeItem(localKey);
    }
  };
  
  export const removeRecipeId = (recipeId) => {
    const savedRecipeIds = localStorage.getItem(localKey)
      ? JSON.parse(localStorage.getItem(localKey))
      : null;
  
    if (!savedRecipeIds) {
      return false;
    }
  
    const updatedSavedRecipeIds = savedRecipeIds?.filter((savedRecipeId) => savedRecipeId !== recipeId);
    localStorage.setItem(localKey, JSON.stringify(updatedSavedRecipeIds));
  
    return true;
  };
  