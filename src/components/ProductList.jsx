import React, { useEffect, useState } from "react";

function ProductList({ products }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (products && products.length > 0) {
      setAnimate(true);
      const timeout = setTimeout(() => setAnimate(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [products]);

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-update {
          animation: fadeIn 0.3s ease-in forwards;
        }
      `}</style>

      <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 p-4 ${animate ? "animate-update" : ""}`}>
        {products.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded shadow bg-white hover:shadow-lg transition"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-40 object-cover mb-2 rounded"
            />
            <h2 className="text-lg font-bold text-black leading-snug">{product.title}</h2>
            <p className="text-gray-700 font-medium mb-1">${product.price}</p>
            <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default ProductList;
