import Modal from "@/components/Modal";
import React, { Dispatch, SetStateAction } from "react";

const DeleteProduct = ({
  openModal,
  setOpenModal,
  handleConfirmDelete,
  deleteProductData,
  setDeleteProductData,
}: {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  handleConfirmDelete: () => void;
  deleteProductData: any;
  setDeleteProductData: Dispatch<SetStateAction<any>>;
}) => {
  const handleCloseCreateProductModal = () => {
    setOpenModal(false);
    setDeleteProductData(null);
  };

  return (
    <Modal
      title={"Delete Product"}
      isOpen={openModal}
      onClose={handleCloseCreateProductModal}
      className="w-96!"
    >
      <p className="text-center text-xl font-bold py-5">
        Are you Sure, You wan to delete "{deleteProductData?.title}"?
      </p>
      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          className="text-white! bg-green-700 box-border border border-transparent hover:bg-success-strong focus:ring-4 focus:ring-success-medium shadow-xs font-medium leading-5 rounded-xl text-sm px-4 py-2.5 focus:outline-none cursor-pointer"
          onClick={handleConfirmDelete}
        >
          Confirm
        </button>
        <button
          type="button"
          className="text-white! bg-red-700 box-border border border-transparent hover:bg-danger-strong focus:ring-4 focus:ring-danger-medium shadow-xs font-medium leading-5 rounded-xl text-sm px-4 py-2.5 focus:outline-none cursor-pointer"
          onClick={handleCloseCreateProductModal}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default DeleteProduct;
