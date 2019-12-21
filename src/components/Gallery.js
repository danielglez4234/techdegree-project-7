import React, { PureComponent } from 'react';
import { Consumer } from './context';

import GalleryItem from './GalleryItem';
import NotFound from './NotFound';


class Gallery extends PureComponent  {
render(){
  return (
    <Consumer>
      { context => {
        let photos;
        let queryText = this.props.match.params.query; // we get the value of :query for the title
        const result = context.data; //we save the data in the result variable

        if (result.length > 0) { // if the results found are greater than 0 the images are displayed
          photos = result.map(photo =>
             <GalleryItem
              key={ photo.id }
              url={ `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg` }
              title= { photo.title }
              />
          );
        } else { // if not, the component <NotFound> is displayed
          photos = <NotFound />;
        }

        return(
          <div className="photo-container">
            <h2>{ queryText } Photos</h2>
                <ul> {/*This condition is also here so that the text "loading .." appears when a Navlink is clicked or a search is performed*/}
                  {(context.loading) ? <h3 className="loading">Loading....</h3> : photos }
                </ul>
          </div>
        );
      }}
    </Consumer>
  );
}
}
export default Gallery;
