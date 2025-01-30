import React from "react";
import parse from "html-react-parser";

const ProductSpecification = ({ singleProduct }) => {
  const {
    _id,
    product_name,
    category,
    box_content,
    size,
    product_highlight,
    details,
    post_date,
  } = singleProduct;
  return (
    <div>
      <p className="text-lg font-semibold bg-gray-50 p-2 text-gray-800">
        Product Specification of {product_name}
      </p>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Product Type
              </th>
              <td className="px-6 py-4">{product_name}</td>
            </tr>

            {size && (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Size
                </th>
                <td className="px-6 py-4">{singleProduct?.size}</td>
              </tr>
            )}
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Category
              </th>
              <td className="px-6 py-4">{category}</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Box Content
              </th>
              <td className="px-6 py-4">{box_content}</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Registered
              </th>
              <td className="px-6 py-4">{post_date?.slice(0, 10)}</td>
            </tr>

            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                SKU
              </th>
              <td className="px-6 py-4 text-gray-700">{_id}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Product Details  */}
      <div className="mb-6">
        <p className="text-lg bg-gray-50 p-2 font-semibold my-2 text-gray-800 break-words">
          Product Details of : {product_name}
        </p>

        <div>
          {parse(
            product_highlight
              ?.replaceAll("<ol>", '<ol className="list-decimal list-inside">')
              ?.replaceAll("<ul>", '<ul className="list-disc list-inside">')
          )}
        </div>
        <div>
          {parse(
            details
              ?.replaceAll("<ol>", '<ol className="list-decimal list-inside">')
              ?.replaceAll("<ul>", '<ul className="list-disc list-inside">')
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductSpecification;
