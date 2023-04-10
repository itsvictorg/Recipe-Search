//  Set up donation page 
//  here design a page that talks about contributions maybe even list or link to fake contributors.
// add field for an amount that would like to donate.  and from here we'll call the api for payments.

import React from 'react';

import '../styles/Donate.css'

const Donate = () => {
  return (
    <>
    <section className='page-cont'>
      <h2>Donate Today</h2>
      <article className='article donate borderer'>
        <p>Feel free to donate at anytime.  This site is a free use for others maintained by real people.  We put our personal time aside to create a platforms for others personal use.  Any contributions are helpful.</p>
        <p>Just follow this link 'PLACE LINK HERE' and you'll be redirected to a secure site.</p>
        <p>Thank you for your support. It is always appreciated.</p>
      </article>
    </section>
    </>
  );
};

export default Donate;