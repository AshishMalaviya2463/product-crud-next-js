import Input from "@/components/Input";
import Modal from "@/components/Modal";
import PrimaryButton from "@/components/PrimaryButton";
import { useValidation } from "@/hooks/useValidation";
import { showToast } from "@/utils/toastUtils";
import axios from "axios";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

export interface ProductForm {
  title: string;
  brand: string;
  category: string;
  description: string;
  price: string;
  sku: string;
  thumbnail: string;
  weight: string;
  [key: string]: string;
}

const ProductForm = ({
  openModal,
  setOpenModal,
  editProductData,
  setEditProductData,
  getProductsWithCurrentValues,
}: {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  editProductData: any;
  setEditProductData: Dispatch<SetStateAction<any>>;
  getProductsWithCurrentValues: () => void;
}) => {
  const { validateProductForm } = useValidation();
  const [productForm, setProductForm] = useState<ProductForm>({
    title: "",
    brand: "",
    category: "",
    description: "",
    price: "",
    sku: "",
    thumbnail: "",
    weight: "",
  });
  const [errors, setErrors] = useState<ProductForm>({
    title: "",
    brand: "",
    category: "",
    description: "",
    price: "",
    sku: "",
    thumbnail: "",
    weight: "",
  });

  useEffect(() => {
    if (openModal) {
      setProductForm({
        title: editProductData?.title,
        brand: editProductData?.brand,
        category: editProductData?.category,
        description: editProductData?.description,
        price: editProductData?.price,
        sku: editProductData?.sku,
        thumbnail: editProductData?.thumbnail,
        weight: editProductData?.weight,
      });
    }
  }, [openModal]);

  const handleCloseCreateProductModal = () => {
    setOpenModal(false);
    setEditProductData(null);
  };

  const handleChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmitProduct = async () => {
    const { valid, ...rest } = validateProductForm(productForm);

    if (!valid) {
      setErrors(rest);
      return;
    }
    try {
      if (editProductData) {
        const payload: any = {};
        Object.keys(editProductData).map((key) => {
          if (editProductData[key] !== productForm[key]) {
            payload[key] = productForm[key];
          }
        });

        await axios.put(
          `https://dummyjson.com/products/${editProductData.id}a`,
          payload,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        showToast("Product updated successful.");
      } else {
        await axios.post(`https://dummyjson.com/products/add`, productForm, {
          headers: { "Content-Type": "application/json" },
        });
        showToast("Product created successful.");
      }

      getProductsWithCurrentValues();
      setErrors({
        title: "",
        brand: "",
        category: "",
        description: "",
        price: "",
        sku: "",
        thumbnail: "",
        weight: "",
      });
      handleCloseCreateProductModal();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showToast(error?.response?.data?.message || "", "error");
      }
    }
  };

  return (
    <Modal
      title={editProductData ? "Edit Product" : "Create Product"}
      isOpen={openModal}
      onClose={handleCloseCreateProductModal}
    >
      <div className="grid grid-cols-2 gap-x-3">
        <Input
          name="title"
          label="Title"
          placeholder="Enter title"
          value={productForm.title}
          onChange={handleChangeInputs}
          error={errors.title}
        />
        <Input
          name="brand"
          label="Brand"
          placeholder="Enter brand"
          value={productForm.brand}
          onChange={handleChangeInputs}
          error={errors.brand}
        />
        <Input
          name="category"
          label="Category"
          placeholder="Enter category"
          value={productForm.category}
          onChange={handleChangeInputs}
          error={errors.category}
        />
        <Input
          name="description"
          label="Description"
          placeholder="Enter description"
          value={productForm.description}
          onChange={handleChangeInputs}
          error={errors.description}
        />
        <Input
          name="price"
          label="Price"
          placeholder="Enter price"
          value={productForm.price}
          onChange={handleChangeInputs}
          error={errors.price}
        />
        <Input
          name="sku"
          label="SKU"
          placeholder="Enter sku"
          value={productForm.sku}
          onChange={handleChangeInputs}
          error={errors.sku}
        />
        <div>
          <Input
            name="thumbnail"
            label="Thumbnail"
            placeholder="Enter thumbnail"
            value={productForm.thumbnail}
            onChange={handleChangeInputs}
            error={errors.thumbnail}
          />
          {productForm.thumbnail && (
            <Image
              className="h-24 object-contain"
              src={productForm.thumbnail}
              alt={productForm.title}
              loading="lazy"
              width={100}
              height={100}
            />
          )}
        </div>
        <Input
          name="weight"
          label="Weight"
          placeholder="Enter weight"
          value={productForm.weight}
          onChange={handleChangeInputs}
          error={errors.weight}
        />
      </div>
      <PrimaryButton className="w-full! mt-3.5!" onClick={handleSubmitProduct}>
        {editProductData ? "Update" : "Create"}
      </PrimaryButton>
    </Modal>
  );
};

export default ProductForm;
