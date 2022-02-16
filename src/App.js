import { useState } from 'react';
import { Toaster } from 'react-hot-toast';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Modal from './components/Modal/Modal';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeImgUrl, setActiveImgUrl] = useState('');
  const [showModal, setShowModal] = useState(false);

  const searchFormSubmitHandler = query => {
    setSearchQuery(query);
  };

  const activeImgUrlHandler = url => {
    setActiveImgUrl(url);
  };

  const toggleModal = () => {
    setShowModal(state => !state);
  };

  return (
    <>
      <Searchbar onSubmit={searchFormSubmitHandler} />
      <ImageGallery
        searchQuery={searchQuery}
        activeImgUrlHandler={activeImgUrlHandler}
        onImgClick={toggleModal}
      />
      {showModal && <Modal closeModal={toggleModal} url={activeImgUrl} />}
      <Toaster />
    </>
  );
}
