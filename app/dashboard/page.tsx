"use client";

import Header from "@/components/Header";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import Pagination from "@/components/Pagination";
import PrimaryButton from "@/components/PrimaryButton";
import ProductCard, { Product } from "@/components/ProductCard";
import { useAppSelector } from "@/hooks/useRedux";
import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import ProductForm from "./ProductForm";
import DeleteProduct from "./DeleteProduct";
import { showToast } from "@/utils/toastUtils";

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

type Timer = ReturnType<typeof setTimeout> | null;

const Dashboard = () => {
  const { loggedInUser } = useAppSelector((state) => state.auth);
  const [productsData, setProductsData] = useState<ProductsResponse | null>({
    products: [],
    total: 0,
    skip: 0,
    limit: 9,
  });
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [editProductData, setEditProductData] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProductData, setDeleteProductData] = useState(null);

  const getProducts = async (page = 1, search = "") => {
    if (loading) return;

    try {
      setLoading(true);

      let skip = (page - 1) * 9;
      skip = skip < 0 ? 0 : skip;

      const url = search
        ? `https://dummyjson.com/products/search?q=${search}&limit=9&skip=${skip}`
        : `https://dummyjson.com/products?limit=9&skip=${skip}`;
      const response = await axios.get(url);

      setProductsData(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showToast(error?.response?.data?.message || "", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const searchDebounceRef = useRef<Timer>(null);

  useEffect(() => {
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);

    searchDebounceRef.current = setTimeout(() => {
      setCurrentPage(1);
      getProducts(0, searchValue);
    }, 500);
  }, [searchValue]);

  useEffect(() => {
    getProducts(currentPage, searchValue);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEditProduct = (product: any) => {
    setEditProductData(product);
    setOpenModal(true);
  };

  const handleDeleteProduct = (product: any) => {
    setDeleteProductData(product);
    setShowDeleteModal(true);
  };

  const getProductsWithCurrentValues = () => {
    getProducts(currentPage, searchValue);
  };

  const handleConfirmDelete = async () => {
    try {
      if (!deleteProductData?.id) return;

      await axios.delete(
        `https://dummyjson.com/products/${deleteProductData.id}`
      );
      showToast("Product deleted successful.");
      setDeleteProductData(null);
      setShowDeleteModal(false);
      getProductsWithCurrentValues();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showToast(error?.response?.data?.message || "", "error");
      }
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto">
        <div className="flex items-center justify-end gap-2 my-4">
          <Input
            placeholder="Search product"
            containerClassName="w-[250px]! mb-0!"
            className="border-black!"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <PrimaryButton onClick={() => setOpenModal(true)}>
            Create Product
          </PrimaryButton>
        </div>
        <div className="grid grid-cols-3 gap-5">
          {loading ? (
            <p className="text-3xl font-bold mt-5 text-center w-full col-span-3">
              Loading...
            </p>
          ) : (
            <>
              {productsData?.products.length !== undefined &&
              productsData?.products.length <= 0 ? (
                <p className="text-3xl font-bold mt-5 text-center w-full col-span-3">
                  No Data Found!
                </p>
              ) : (
                productsData?.products?.map((product, i) => {
                  return (
                    <ProductCard
                      key={i + 1}
                      product={product}
                      handleEditProduct={handleEditProduct}
                      handleDeleteProduct={handleDeleteProduct}
                    />
                  );
                })
              )}
            </>
          )}
        </div>
        {!loading && (
          <Pagination
            totalItems={productsData?.total || 0}
            itemsPerPage={9} // Use the constant
            currentPage={currentPage}
            onPageChange={handlePageChange}
            maxVisiblePages={5}
          />
        )}
      </div>
      <ProductForm
        openModal={openModal}
        setOpenModal={setOpenModal}
        setEditProductData={setEditProductData}
        editProductData={editProductData}
        getProductsWithCurrentValues={getProductsWithCurrentValues}
      />
      <DeleteProduct
        deleteProductData={deleteProductData}
        openModal={showDeleteModal}
        setOpenModal={setShowDeleteModal}
        setDeleteProductData={setDeleteProductData}
        handleConfirmDelete={handleConfirmDelete}
      />
    </>
  );
};

export default Dashboard;
