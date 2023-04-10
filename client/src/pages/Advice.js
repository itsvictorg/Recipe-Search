// Expert Advice
import React from 'react';

import '../styles/Advice.css';
       
// collecting all images from /images/advice folder
function importAll(imgContext) {
  return imgContext.keys().map(imgContext);
};
       
const images = importAll(require.context('../images/advice', false, /\.(png|jpe?g|svg)$/));
       
       
const Advice = () => {
  return (
    <>
      <section className='page-cont'>
        <h2>Expert Advice</h2>
       
        <article className='advice'>
          <h5>Here is a list of some tips and tricks to help you get started with your own recipes.</h5>
          <ul className='advice-list'>
            <li>Read the entire recipe from start to finish.</li>
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
       
        <article className='advice'>
          <p className='borderer'>Many people are passionate about cooking and have created awesome sites detailing more about cooking.  Some are even inspired with the way they feel while cooking.  Feel free to check out their awesome sites below.</p>
          <div>
            <h5>Here is a list of helpful sites we've obtained from google search.</h5>
       
            <ul className='advice-list'>
              {/*I NEED TO SEARCH GOOGLE AND CHANGE THESE LINKS GIVEN TO ME BY CO-PILOT*/}
              <li><img className='img-desktop' src={images[0]} alt='from site' width='100' height='100' /><a href="https://www.seriouseats.com/how-to-set-up-a-station-like-a-pro">&nbsp;How to Set Up a Prep Station Like a Pro Cook</a></li>
              <li><img className='img-desktop' src={images[1]} alt='from site' width='100' height='100' /><a href="https://www.thekitchn.com/5-things-to-do-before-you-turn-on-the-burner-life-in-the-kitchen-218777">&nbsp;5 Things You Should Do Before You Turn on a Burner</a></li>
              <li><img className='img-desktop' src={images[2]} alt='from site' width='100' height='100' /><a href="https://www.buzzfeed.com/jesseszewczyk/cooking-tips-from-restaurant-cooks">&nbsp;12 Little Cooking Habits You Should Steal From Prep Cooks</a></li>
              <li><img className='img-desktop' src={images[3]} alt='from site' width='100' height='100' /><a href="https://www.premiofoods.com/tips-to-prepare-food-in-advance-for-parties/">&nbsp;TIPS TO PREPARE FOOD IN ADVANCE FOR PARTIES</a></li>
              <li><img className='img-desktop' src={images[4]} alt='from site' width='100' height='100' /><a href="https://www.healthline.com/nutrition/how-to-meal-prep">&nbsp;How to Meal Prep — A Beginner’s Guide</a></li>
              <li><img className='img-desktop' src={images[5]} alt='from site' width='100' height='100' /><a href="https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety">&nbsp;4 Steps to Food Safety</a></li>
            </ul>
          </div>
        </article>
      </section>
    </>
  );
};
       
export default Advice;