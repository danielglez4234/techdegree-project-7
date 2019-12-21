import React from 'react';
import { NavLink } from 'react-router-dom';
import { Consumer } from './context';

const Nav = () => {
  return (
    <Consumer>
      { context => {
        // run performsearch when a link is clicked
        let handleSearch = (e) => {
          context.performSeacrh(e.target.innerText);
          context.loading = true; // is set to true so that the text "loanding" appears
          console.log(context.loading);
        };

        return(
          <nav className="main-nav">
            <ul>
              <li>{/*the "to" sends the :query value to <gallery> to display the text in the title*/}
              <NavLink to="/search/mountain" onClick={handleSearch}>Mountain</NavLink>
              </li>
              <li>
              <NavLink to="/search/starry%20sky" onClick={handleSearch}>Starry Sky</NavLink>
              </li>
              <li>
              <NavLink to="/search/rivers" onClick={handleSearch}>Rivers</NavLink>
              </li>
            </ul>
          </nav>
        );
      }}
    </Consumer>
  );
}

export default Nav;
