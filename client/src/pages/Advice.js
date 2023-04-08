// Expert Advice
import React from 'react';




const Advice = () => {
  return (
    <>
      <section>
        <h2>Expert Advice</h2>

        <article>
          <p>Here is a list of some tips and tricks to help you get started with your own recipes.</p>
          <ul>
            <li>Make sure you have all the ingredients you need before you start cooking.</li>
            <li>Make sure you get out all utencils that will be needed. Bowls, plates, cutting board, measuring cups, etc.</li>
            <li>Make space for all cutting, mixing ,measuring, etc.</li>
            <li>Make sure you have a clean work space.</li>
            <li>It is always a good idea to check dates before buying or using ingredients.</li>
            <li>Always keep an eye on what you are cooking to prevent fires.</li>
            <li>Check the oven before pre-heating to ensure nothing is inside.</li>
            <li>Always wash your hands before and after cooking.</li>
          </ul>
        </article>

        <article>
          <p>Many people are passionate about cooking and have created awesome sites detailing more about cooking.  Some are even inpired with the way they feel about cooking.  Feel free to check out their awesome sites below.</p>
          <p>Here is a list of helpful sites we've obtained from google search.</p>
          <ul>
            {/*I NEED TO SEARCH GOOGLE AND CHANGE THESE LINKS GIVEN TO ME BY CO-PILOT*/}
            <li><a href="https://www.allrecipes.com/article/how-to-cook/">All Recipes</a></li>
            <li><a href="https://www.bonappetit.com/story/how-to-cook">Bon Appetit</a></li>
            <li><a href="https://www.foodnetwork.com/how-to/articles/how-to-cook">Food Network</a></li>
            <li><a href="https://www.foodandwine.com/how-to/how-to-cook">Food and Wine</a></li>
            <li><a href="https://www.cookinglight.com/how-to/cooking-101">Cooking Light</a></li>
            <li><a href="https://www.bhg.com/recipes/how-to/cooking-basics/">Better Homes and Gardens</a></li>
          </ul>
        </article>
      </section>
    </>
  );
};

export default Advice;