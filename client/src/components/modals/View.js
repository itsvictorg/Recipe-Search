// View Modal: user can view entire recipe before saving.

import React from 'react';


const View = () => {
  return (
<div className="modal-container">

  <div id="id01" className="recipe-modal">
    <div className="modal-content animate-zoom recipe-card">

      <header className="modal-container modal-color"> 
        <span className="recipe-modal-btn topright" onClick={() => {document.getElementById('id01').style.display='none'}}>&times;</span>
        <h2 className='recipe-title'>RECIPE TITLE</h2>
      </header>

      <div className="modal-container">
        <p className='recipe-servings'>RECIPE SERVINGS</p>
        <p className='recipe-ingredients'>RECIPE INGREDIENTS</p>
        <p className='recipe-instructions'>RECIPE INSTRUCTIONS</p>
      </div>

      <footer className="modal-container modal-color">
        <p>SAVE BUTTON HERE</p>
      </footer>

    </div>
  </div>

</div>
  );
};

export default View;