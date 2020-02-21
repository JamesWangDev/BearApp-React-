import React from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      <CSSTransition
        in={isOpen}
        timeout={200}
        classNames="modal-transition"
        unmountOnExit
      >
        <div className="modal">
          <div className="modalContent shadow-lg border-solid rounded">
            {children}
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      </CSSTransition>
      <style jsx>{`
        .modal-transition-enter {
          opacity: 0;
          transform: translateY(-50px);
        }
        .modal-transition-enter-active {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 200ms, transform 300ms;
        }
        .modal-transition-exit {
          opacity: 1;
        }
        .modal-transition-exit-active {
          opacity: 0;
          transform: translateY(-50px);
          transition: opacity 200ms, transform 300ms;
        }
        .modal {
          position: fixed;
          top: 0;
          bottom: -50px;
          left: 0;
          right: 0;
          background: rgba(0, 0, 0, 0.6);
        }
        .modalContent {
          background-color: white;
          width: 400px;
          height: 400px;
          margin: 0 auto;
          margin-top: 20px;
        }
      `}</style>
    </>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
