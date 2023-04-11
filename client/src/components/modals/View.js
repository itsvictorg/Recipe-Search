// this will be the single recipe view to see if the user would like to save it or not.
// title
// servings
// ingredients
// instructions
// options to save or discard and redirect to search page.

// here is where all the saving hooks and states and effects need to be placed now.

// will be a modal that pops up when the user clicks on the save button. can be exed off so the user can still view their search.

import React from 'react';




const View = () => {
  return (
<div className="modal-container">

  <h2>W3.CSS Animated Modal</h2>
  <p>Zoom in the modal with the w3-animate-zoom className</p>
  <button className="recipe-modal-btn modal-color" onClick={() => {document.getElementById('id01').style.display='block'}}>Open Animated Modal</button>

  <div id="id01" className="recipe-modal">
    <div className="modal-content animate-zoom recipe-card">

      <header className="modal-container modal-color"> 
        <span className="recipe-modal-btn topright" onClick={() => {document.getElementById('id01').style.display='none'}}>&times;</span>
        <h2>RECIPE TITLE</h2>
      </header>

      <div className="modal-container">
        <p>RECIPE SERVINGS</p>
        <p>RECIPE INGREDIENTS</p>
        <p>RECIPE INSTRUCTIONS</p>
      </div>

      <footer className="modal-container modal-color">
        <p>SEARCH PROVIDED BY</p>
      </footer>

    </div>
  </div>

</div>
  );
};

export default View;