// Expert Advice
import React from 'react';

import '../styles/Advice.css';

import { generateUID } from '../utils/helpers';


// collecting all images from /images/advice folder
function importAll(imgContext) {
  return imgContext.keys().map(imgContext);
};       
const images = importAll(require.context('../images/advice', false, /\.(png|jpe?g|svg)$/));

// links to advice sites
const adviceLinks = [
  'https://www.seriouseats.com/how-to-set-up-a-station-like-a-pro',
  'https://www.thekitchn.com/5-things-to-do-before-you-turn-on-the-burner-life-in-the-kitchen-218777',
  'https://www.buzzfeed.com/jesseszewczyk/cooking-tips-from-restaurant-cooks',
  'https://www.premiofoods.com/tips-to-prepare-food-in-advance-for-parties/',
  'https://www.healthline.com/nutrition/how-to-meal-prep',
  'https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety'
];


const Advice = () => {

  return (
    <>
      <section className='page-cont'>
        <h2>Expert Advice</h2>
       
        <article className='article'>
          <h5 className='borderer'>Here is a list of some tips and tricks to help you get started with your own recipes.</h5>
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
       
        <article className='article advice'>
          <h5 className='borderer'>Here is a list of helpful sites we've obtained from google search.</h5>
          <p>Many people are passionate about cooking and have created awesome sites detailing more about cooking.  Some are even inspired with the way they feel while cooking.  Feel free to check out their awesome sites below.</p>       
            <ul className='advice-list'>
            {images.map((imgSrc, index) => {
              return (
                <li key={generateUID()}>
                  <img className='img-desktop' src={imgSrc} alt='from site' width='100' height='100' />
                  <a href={adviceLinks[index]}>&nbsp;How to Set Up a Prep Station Like a Pro Cook</a>
                </li>
              );
            })}
            </ul>

        </article>
      </section>
    </>
  );
};
       
export default Advice;