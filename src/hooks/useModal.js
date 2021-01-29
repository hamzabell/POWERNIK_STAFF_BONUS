import React, { useState } from "react";

function useModal(state) {
  const [isModalOpen, setIsModalOpen] = useState(state);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return { isModalOpen, openModal, closeModal };
}

export default useModal;
