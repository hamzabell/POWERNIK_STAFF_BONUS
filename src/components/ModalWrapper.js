import React from "react";
import Modal from "react-modal";
import { ImCancelCircle } from "react-icons/im";

const ModalWrapper = ({
  title,
  modalOpenState,
  closeModal,
  onRequestClosefn,
  children,
}) => {
  return (
    <Modal isOpen={modalOpenState} onRequestClose={onRequestClosefn}>
      <div className="flex justify-between p-4">
        <div className="font-semibold text-xl tracking-widest mt-1">
          {title}
        </div>
        <div className="cursor-pointer" onClick={closeModal}>
          <ImCancelCircle className="text-red-700 w-8 h-8" />
        </div>
      </div>

      {children}
    </Modal>
  );
};

export default ModalWrapper;
