import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';

import Infobox from '../Infobox/Infobox';
import { Gallery } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';

import { STATUS } from '../../constants/status.js';

import API_SERVICE from '../../services/api-service';
const apiService = new API_SERVICE();

export default function ImageGallery({
  searchQuery,
  activeImgUrlHandler,
  onImgClick,
}) {
  const [pictures, setPictures] = useState([]);
  const [status, setStatus] = useState(STATUS.IDLE); // status for the image gallery
  const [loading, setLoading] = useState(false); // status for the Loader when we click on the "Load more" button
  const [button, setButton] = useState(false); // status for the "Load more" button
  const [pictureToScrollId, setPictureToScrollId] = useState(''); // id of the first picture in the new group of pictures to scroll to it

  // if we enter a new search query
  useEffect(() => {
    if (searchQuery === '') return;

    apiService.resetPage();
    apiService.query = searchQuery;

    apiService.getImages().then(pictures => {
      if (typeof pictures === 'string') {
        // if the query returns error message
        toast.error('Sorry, something went wrong. Try again!');
        setStatus(STATUS.IDLE);
        return;
      }

      if (pictures.length === 0) {
        // if a non-valid word was entered in the query, the query returns an empty array
        toast.error('Please, enter a valid search query!', {
          duration: 2000,
        });
        setStatus(STATUS.IDLE);
      } else {
        // if the query returns an array with pictures (was successfully resolved)
        setPictures(pictures);
        setPictureToScrollId('');
        setStatus(STATUS.RESOLVED);

        if (pictures.length === 12) {
          // if the query returns 12 pictures we need a button to load more pictures
          setButton(true);
        }
      }
    });
  }, [searchQuery]);

  // if we load more pictures we need to scroll to the new pictures
  useEffect(() => {
    document.getElementById(pictureToScrollId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [pictureToScrollId, pictures]);

  const loadMorePictureBtnHandler = async () => {
    setLoading(true);
    setButton(false);

    const newPictures = await apiService.getImages();
    setPictures(state => {
      return [...state, ...newPictures];
    });
    setLoading(false);

    if (newPictures.length === 12) {
      setButton(true);
    } else {
      setButton(false);
    }
    setPictureToScrollId(newPictures[0].id);
  };

  const onImageClickHandler = largeImageURL => {
    activeImgUrlHandler(largeImageURL);
    onImgClick();
  };

  if (status === 'idle') {
    return <Infobox />;
  }

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'resolved') {
    return (
      <>
        <Gallery>
          {pictures.map(el => (
            <ImageGalleryItem
              key={pictures.indexOf(el)}
              id={el.id}
              url={el.webformatURL}
              query={searchQuery}
              largeImgUrl={el.largeImageURL}
              onClick={onImageClickHandler}
            />
          ))}
        </Gallery>
        {loading && <Loader />}
        {button && <Button onClick={loadMorePictureBtnHandler} />}
      </>
    );
  }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  activeImgUrlHandler: PropTypes.func.isRequired,
  onImgClick: PropTypes.func.isRequired,
};
