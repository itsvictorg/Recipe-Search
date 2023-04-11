// Search books is now HOME
import React from 'react';
import Header from '../components/header/index';
import SearchGPT from '../components/forms/SearchGPT';
import View from '../components/modals/View';
import Footer from '../components/footer/index';


// this is the styling file for the home page.
import '../styles/Home.css';

// the actual search now goes off to searchgpt file.
const Home = () => {
  return (
    <>
      <Header />
      <SearchGPT />
      <View />
      <Footer />
    </>
  );
};

export default Home;