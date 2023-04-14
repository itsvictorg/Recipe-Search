import React from 'react';
// import apollo as client
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

// user react elements for client router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// component and pages to display  CHANGED HERE TO HOME FROM SEARCHRECIPES
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import Donate from './pages/Donate';
import Terms from './pages/Terms';
import Advice from './pages/Advice';
import Navbar from './components/navigation/Navbar';
// import Create from './pages/Create';

import Footer from './components/footer';


// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
// get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

// NOTE !!!! need to add all paths to footer aside from dashboard and view
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />          
          <Routes>
            <Route path='/' element={<Home />} />
            {/* <Route path='/create' element={<Create />} /> */}
            <Route path='/about' element={<About />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/contact' element={<Contact />} />
            {/* temporary implementation into routes for viewing needs to go to footer nav routing */}
            <Route path='/advice' element={<Advice />} />
            <Route path='/donate' element={<Donate />} />
            <Route path='/terms' element={<Terms />} />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Routes>
          <Footer />
        </>
      </Router>
    </ApolloProvider>
  );
}


export default App;