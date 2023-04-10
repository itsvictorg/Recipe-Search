// out terms link output display

import React from 'react';

import '../styles/Terms.css';

// this div should be a header but navbar needs to be re-structure classes and whatnot
const Terms = () => {
  return (
    <>
    <section className='page-cont'>
      <h2>Terms and Usage</h2>
      <article className='borderer'>
        <p>Paragraph going over public terms of use.</p>
      </article>

    </section>
    </>
  );
};

export default Terms;