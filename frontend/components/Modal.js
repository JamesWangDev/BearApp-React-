import React, { createRef, useEffect } from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";
import Portal from "./Portal";

const Modal = props => {
  return (
    <>
      <Portal selector="#modal">
        <CSSTransition
          in={props.isOpen}
          timeout={200}
          classNames="modal-transition"
          unmountOnExit
        >
          <InnerModal {...props} />
        </CSSTransition>
      </Portal>
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
          background: rgba(0, 0, 0, 0.6);
        }
      `}</style>
    </>
  );
};

// Seperated out into it's own component because refs was
// acting funny to child elements of the CSSTransition component
const InnerModal = ({ children, handleClose }) => {
  useEffect(() => {
    function keyListener(e) {
      const listener = keyListenersMap.get(e.keyCode);
      return listener && listener(e);
    }

    document.addEventListener("keydown", keyListener);

    return () => document.removeEventListener("keydown", keyListener);
  });

  const modalRef = createRef();

  // To make the modal nice and accessible, we want to trap the
  // focusable elements to only elements from inside the modal
  const handleTabKey = e => {
    const focusableModalElements = modalRef.current.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const firstElement = focusableModalElements[0];
    const lastElement =
      focusableModalElements[focusableModalElements.length - 1];

    if (!e.shiftKey && document.activeElement === lastElement) {
      firstElement.focus();
      return e.preventDefault();
    }

    if (e.shiftKey && document.activeElement === firstElement) {
      lastElement.focus();
      e.preventDefault();
    }
  };

  const keyListenersMap = new Map([
    [27, handleClose],
    [9, handleTabKey],
  ]);

  return (
    <div
      className="modal fixed inset-0"
      role="dialog"
      aria-modal="true"
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        className="w-600 bg-white shadow-lg border-solid rounded-lg h-auto mx-auto my-0 mt-4 overflow-hidden"
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};

const modalProps = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

Modal.propTypes = modalProps;
InnerModal.propTypes = modalProps;

export default Modal;
