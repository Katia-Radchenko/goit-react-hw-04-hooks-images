import React, { useState, useEffect } from 'react';
import './App.css';

import Loader from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Button from './components/Button/Button';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Modal from './components/Modal/Modal';
import Searchbar from './components/Searchbar/Searchbar';
// import initData from './data/Data.json';
import { searchService } from './services/searchAPI.js';

const App = () => {
  const [pageQuery, setPageQuery] = useState(1);
  const [imagesQuery, setimagesQuery] = useState(null);
  const [images, setImages] = useState([]);
  const [modalImage, setModalImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImages = imagesQuery => {
    if (!imagesQuery) {
      toast.warn('Enter some query!');
      setImages([]);
      return;
    } else {
      setPageQuery(1);
      setimagesQuery(imagesQuery);
    }
  };

  const showModal = modalImage => {
    setModalImage(modalImage);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  const loadMore = () => {
    setPageQuery(prevPage => {
      return prevPage + 1;
    });
  };

  useEffect(() => {
    if (!imagesQuery && pageQuery === 1) {
      return;
    }

    searchService.searchQuery = imagesQuery;

    if (pageQuery === 1) {
      searchService.resetPage();
    }

    setIsLoading(true);
    searchService
      .fetchSearch()
      .then(images => {
        if (images.hits.length === 0) {
          pageQuery > 1
            ? toast.error('No more images!')
            : toast.error('No images with this query!');
        }
        setImages(prevImages =>
          pageQuery > 1 ? [...prevImages, ...images.hits] : images.hits,
        );
      })
      .catch(error => toast.error(error.code))
      .finally(() => {
        setIsLoading(false);
      });
  }, [imagesQuery, pageQuery]);

  return (
    <>
      <Searchbar onSubmit={handleImages} />
      <ImageGallery images={images} showModal={showModal} />
      {isLoading && (
        <Loader
          type="ThreeDots"
          color="#00BFFF"
          height={80}
          width={80}
          style={{ textAlign: 'center' }}
        />
      )}
      {images.length > 0 && <Button loadMoreBtn={loadMore} />}
      {modalImage && (
        <Modal closeModal={closeModal}>
          <img src={modalImage.largeImageURL} alt={modalImage.tags} />
        </Modal>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;
