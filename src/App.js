import React from 'react';
import Nav from './components/Nav';
import SearchForm from './components/SearchForm';
import Gallery from './components/Gallery';

const App = () => {
  return (
    <div class="container">
      <SearchForm />
      <Nav />
      <Gallery />
    </div>
  );
}

export default App;
