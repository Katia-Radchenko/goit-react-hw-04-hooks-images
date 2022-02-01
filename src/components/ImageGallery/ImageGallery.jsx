import React, { Component } from "react";
import toast from "react-hot-toast";

import Infobox from "../Infobox/Infobox";
import { Gallery } from "./ImageGallery.styled";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Loader from "../Loader/Loader";
import Button from "../Button/Button";

import API_SERVICE from "../../services/api-service";
const apiService = new API_SERVICE();

class ImageGallery extends Component {
  state = {
    pictures: [],
    status: 'idle', // status for the image gallery
    loading: false, // status for the Loader when we click on the "Load more" button
    button: false, // status for the "Load more" button
    pictureToScrollId: '' // id of the first picture in the new group of pictures to scroll to it
  };

   componentDidUpdate(prevProps, prevState) {
    const { searchQuery } = this.props;

    // if we enter a new search query

    if (prevProps.searchQuery !== searchQuery) {
      this.getPictures(searchQuery);
    }
     
    // if we load more pictures we need to scroll to the new pictures

     if (prevState.pictures.length !== this.state.pictures.length && prevState.pictures.length !== 0 ) {
       document.getElementById(this.state.pictureToScrollId)?.scrollIntoView({
         behavior: 'smooth',
         block: 'start',
       });
    }
  }

  getPictures = async (query) => {
    apiService.resetPage();
    apiService.query = query;

    const pictures = await apiService.getImages();

    if (typeof (pictures) === 'string') { // if the query returns error message
      toast.error("Sorry, something went wrong. Try again!");
      this.setState({ status: 'idle' });
      return;
    }
        
    if (pictures.length === 0) { // if a non-valid word was entered in the query, the query returns an empty array
      toast.error('Please, enter a valid search query!', {
        duration: 2000
      });
      this.setState({ status: 'idle' });
    } else { // if the query returns an array with pictures (was successfully resolved)
      this.setState({ pictures, status: 'resolved', pictureToScrollId: '' });

      if (pictures.length === 12) { // if the query returns 12 pictures we need a button to load more pictures
        this.setState({ button: true })
      }
    }
  }

  loadMorePictureBtnHandler = async () => {
    this.setState({ loading: true });
    this.setState({ button: false });

    const newPictures = await apiService.getImages();
    this.setState({pictureToScrollId: newPictures[0].id})

    this.setState(prevState => {
      return ({ pictures: [...prevState.pictures, ...newPictures] })
    });

    this.setState({ loading: false });

    if (newPictures.length === 12) {
      this.setState({button: true})
    } else {
      this.setState({button: false})
    }
  }

  onImageClickHandler = largeImageURL => {
    this.props.activeImgUrlHandler(largeImageURL);
    this.props.onImgClick();
  }

  render() {
    const { status, pictures, loading, button } = this.state;

    if (status === 'idle') {
      return <Infobox />
    }

    if (status === 'pending') {
      return <Loader />
    }

    if (status === 'resolved') {
      return (<>
                <Gallery>
                  {pictures.map((el) => (
                    <ImageGalleryItem
                      key={el.id}
                      id={el.id}
                      url={el.webformatURL}
                      alt={this.props.searchQuery}
                      largeImgUrl={el.largeImageURL}
                      onClick={this.onImageClickHandler}
                    />
                  ))}
                </Gallery>
                {loading && <Loader />}
                {button && <Button onClick={this.loadMorePictureBtnHandler} />}
              </>
      )}
  }
}

export default ImageGallery;