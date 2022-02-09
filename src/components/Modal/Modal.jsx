import React, {Component} from "react";
import { createPortal } from "react-dom";

import { Backdrop, ModalWindow } from "./Modal.styled";

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.clickOnEscKeyHandler);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.clickOnEscKeyHandler);
    }

    clickOnEscKeyHandler = e => {
        if (e.code === 'Escape') {
            this.props.closeModal();
        }
    }

    clickOnBackdropHandler = e => {
        if (e.target === e.currentTarget) {
            this.props.closeModal();
        }
    }

    render() {
        return createPortal(
            <Backdrop onClick={this.clickOnBackdropHandler}>
                <ModalWindow src={this.props.url}></ModalWindow>
            </Backdrop>
            , modalRoot)
    }
}

export default Modal;