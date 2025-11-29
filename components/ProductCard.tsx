import Image from "next/image";
import React from "react";

// --- 1. Define the TypeScript Interface for the Product Data ---

interface ProductReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface ProductDimensions {
  width: number;
  height: number;
  depth: number;
}

interface ProductMeta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: ProductDimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: ProductReview[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: ProductMeta;
  images: string[];
  thumbnail: string;
}

// --- 2. Product Card Component ---

interface ProductCardProps {
  product: Product;
  handleEditProduct: (product: any) => void;
  handleDeleteProduct: (product: any) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  handleEditProduct,
  handleDeleteProduct,
}) => {
  // Calculate final price after discount
  const finalPrice = product.price * (1 - product.discountPercentage / 100);

  // Function to render star rating
  const renderRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    const star = "★"; // Full star character
    const emptyStar = "☆"; // Empty star character

    return (
      <span className="text-yellow-500!">
        {star.repeat(fullStars)}
        {emptyStar.repeat(emptyStars)}
      </span>
    );
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-xl rounded-xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
      <div className="relative h-[250]">
        <Image
          className="h-full object-cover mx-auto"
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          width={200}
          height={200}
        />
        <span className="absolute top-2 left-2 bg-red-600 text-white! text-xs font-semibold px-2 py-0.5 rounded-full shadow-md">
          -{product.discountPercentage.toFixed(0)}% OFF
        </span>
      </div>

      <div className="p-5">
        {/* 📝 Brand and Title */}
        <span className="text-xs font-medium text-gray-500! uppercase">
          {product.brand}
        </span>
        <h3 className="text-xl font-bold text-gray-900! mt-1 mb-2 truncate">
          {product.title}
        </h3>

        {/* ⭐ Rating and Stock */}
        <div className="flex items-center justify-between text-sm mb-3">
          <div className="flex items-center space-x-1">
            {renderRatingStars(product.rating)}
            <span className="text-gray-700! font-semibold">
              {product.rating.toFixed(2)}
            </span>
          </div>
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded ${
              product.stock > 0
                ? "bg-green-100 text-green-800!"
                : "bg-red-100 text-red-800!"
            }`}
          >
            {product.stock > 0 ? `${product.stock} In Stock` : "Out of Stock"}
          </span>
        </div>

        {/* 💰 Price Display */}
        <div className="flex items-baseline mb-4">
          <p className="text-2xl font-extrabold text-gray-900!">
            ${finalPrice.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500! line-through ml-2">
            ${product.price.toFixed(2)}
          </p>
        </div>

        {/* 🛒 Action Button */}
        <div className="flex items-center justify-center gap-3 w-full">
          <button
            className="w-full bg-teal-600 text-white! py-2 rounded-lg font-semibold hover:bg-teal-700 transition duration-150 shadow-md disabled:bg-gray-400 cursor-pointer"
            disabled={product.stock === 0}
            onClick={() => handleEditProduct(product)}
          >
            Edit
          </button>
          <button
            className="w-full bg-red-600 text-white! py-2 rounded-lg font-semibold hover:bg-red-700 transition duration-150 shadow-md disabled:bg-gray-400 cursor-pointer"
            disabled={product.stock === 0}
            onClick={() => handleDeleteProduct(product)}
          >
            Delete
          </button>
        </div>

        {/* ℹ️ Description Snippet */}
        <p className="text-xs text-gray-600! mt-4 overflow-hidden line-clamp-2">
          {product.description}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
