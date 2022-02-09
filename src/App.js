import React, { Component } from "react";
import { Toaster } from "react-hot-toast";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Modal from "./components/Modal/Modal";

class App extends Component {
  state = {
    searchQuery: "",
    activeImgUrl: "",
    showModal: false,
  };

  searchFormSubmitHandler = (query) => {
    this.setState({ searchQuery: query });
  };

  activeImgUrlHandler = (url) => {
    this.setState({ activeImgUrl: url });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { searchQuery, activeImgUrl, showModal } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.searchFormSubmitHandler} />
        <ImageGallery
          searchQuery={searchQuery}
          activeImgUrlHandler={this.activeImgUrlHandler}
          onImgClick={this.toggleModal}
        />
        {showModal && (
          <Modal closeModal={this.toggleModal} url={activeImgUrl} />
        )}
        <Toaster />
      </>
    );
  }
}

export default App;