import React, { Component } from 'react';
import { Provider } from './components/context';
import { createBrowserHistory } from "history";
import axios from 'axios';
import apiKey from './config';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Nav from './components/Nav';
import SearchForm from './components/SearchForm';
import Gallery from './components/Gallery';
import PageNotFound from './components/PageNotFound';


class App extends Component {

  constructor() {
    super();
    this.state = {
      photo: [],
      loading: true
    };
  }

  componentDidMount() {
    // gets the value of the current route and run "performSeacrh"
    // this makes the user can also perform the search by typing in the url.
    const history = createBrowserHistory();
    let urlQuery = history.location.pathname.replace(/[^\w\s]/gi, '').replace("search", '');
    this.performSeacrh(urlQuery);
  }

  performSeacrh = (query) => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&content_type=1&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({ //save the current state of the data
        photo: response.data.photos.photo,
        loading: false
      });
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  }

  render() {
    return (
      // we use the <Provider> to send the current state of the data and the function performSeacrh
      <Provider value={{
        data: this.state.photo,
        loading: this.state.loading,
        performSeacrh: this.performSeacrh
      }}>
        <BrowserRouter>{/*managing routes*/}
          <div className="container">
            <SearchForm />
            <Nav />
            <Switch>
              <Route exact path="/" render={() => <Redirect to='/search/mountain' /> } />
              <Route path="/search/:query" render={(props) => // if loading is true h3 is displayed, else the gallery is shown
                (this.state.loading) ? <h3 className="loading">Loading....</h3> : <Gallery {...props} />
              } />
              <Route component={PageNotFound} /> {/*only appears when no route matches*/}
            </Switch>
          </div>
        </BrowserRouter>
    </Provider>
    );
  }
}

export default App;
