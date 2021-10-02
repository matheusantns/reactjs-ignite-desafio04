import { useEffect } from 'react';
import ReactModal from 'react-modal';

interface ModalProps {
  children: React.ReactNode;
  setIsOpen: () => void;
  isOpen: boolean;
}

function Modal(props:ModalProps) {

  useEffect(() => {
    
  }, [props.isOpen])

  return (
    <ReactModal
        shouldCloseOnOverlayClick={!false}
        onRequestClose={props.setIsOpen}
        isOpen={props.isOpen}
        ariaHideApp={false}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: '#F0F0F5',
            color: '#000000',
            borderRadius: '8px',
            width: '736px',
            border: 'none',
          },
          overlay: {
            backgroundColor: '#121214e6',
          },
        }}
      >
        {props.children}
      </ReactModal>
  )
}

export default Modal;
