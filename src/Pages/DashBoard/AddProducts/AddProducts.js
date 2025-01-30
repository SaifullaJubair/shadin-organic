import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import DatePicker from "tailwind-datepicker-react";
// import DashboardSideBar from "../DashboardSideBar/DashboardSideBar";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import ReactQuill from "react-quill";

import Select from "react-dropdown-select";

function AddProducts() {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date().toISOString());
  const [loading, setLoading] = useState(false);
  const [productPurpose, setProductPurpose] = useState("toRent");
  const [defineOption, setDefineOption] = useState("commercial");
  const [errPrice, setErrPrice] = useState(0);
  const [errSize, setErrSize] = useState(0);
  const [value, setValue] = useState();
  const [categories, setCategories] = useState(null);
  const [highlights, setHighlights] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    fetch("https://shadin-organic-server.vercel.app/allcategories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const currentDate = new Date();
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
    timeZone: "Asia/Dhaka", // Set the time zone to Bangladesh
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    currentDate
  );

  const handleAddProduct = async (data) => {
    const {
      productName,
      category,
      size,
      boxContent,
      price,
      // primaryColor,
      primaryImg,
      product_status,
      // description,
      // productHighlight,
      optionalImg1,
      optionalImg2,
    } = data;

    // primary img
    const productImage = primaryImg[0];
    const productFormData = new FormData();
    productFormData.append("image", productImage);

    const imageHostKey = process.env.REACT_APP_imgbb_key;
    const productImageConfig = {
      method: "POST",
      body: productFormData,
    };

    // optional img01
    const optionalImage01 = optionalImg1[0];
    const optionalImgFormData = new FormData();
    optionalImgFormData.append("image", optionalImage01);

    const optionalImageConfig = {
      method: "POST",
      body: optionalImgFormData,
    };
    // optional img02
    const optionalImage02 = optionalImg2[0];
    const optionalImgFormData02 = new FormData();
    optionalImgFormData02.append("image", optionalImage02);

    const optionalImageConfig02 = {
      method: "POST",
      body: optionalImgFormData02,
    };

    try {
      setLoading(true);
      const productImgBbRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${imageHostKey}`,
        productImageConfig
      );
      const productImgBbData = await productImgBbRes.json();

      // optional image post01
      const optionalImgBbRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${imageHostKey}`,
        optionalImageConfig
      );
      const optionalImgBbData = await optionalImgBbRes.json();

      // optional image post02
      const optionalImgBbRes02 = await fetch(
        `https://api.imgbb.com/1/upload?key=${imageHostKey}`,
        optionalImageConfig02
      );
      const optionalImgBbData02 = await optionalImgBbRes02.json();

      if (
        !productImgBbData.success &&
        !optionalImgBbData.success &&
        !optionalImgBbData02
      )
        return;

      let myuuid = uuidv4();
      const product = {
        product_uid: myuuid,
        product_name: productName,
        category,
        // product_heading: productHeading,
        box_content: boxContent,
        price,
        // primary_color: primaryColor,
        primary_img: productImgBbData.data.url,
        // available_color: value,
        product_status,
        size,
        user_email: user?.email,
        user_image: user?.photoURL,
        user_name: user?.displayName,
        product_highlight: highlights,
        details: description,
        feature_img1: optionalImgBbData?.data.url,
        feature_img2: optionalImgBbData02?.data.url,

        post_date: formattedDate,
      };
      console.log(product);
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${localStorage.getItem(fareBD-token)}`,
        },
        body: JSON.stringify(product),
      };

      const res = await fetch(
        "https://shadin-organic-server.vercel.app/products",
        config
      );
      const data = await res.json();

      if (data.acknowledged) {
        setLoading(false);
        navigate(from, { replace: true });

        toast.success(
          `Hey ${user?.displayName}! your product registered successfully`,
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
      }
    } catch (err) {
      setLoading(false);
      // console.error(err);
    }
  };
  const handleClose = (state) => {
    setShow(state);
  };

  return (
    <div className="w-full over">
      <div className="  max-w-[768px] w-[95%] mx-auto">
        <h2 className="title uppercase p-8 text-center mb-8 bg-secondary text-white text-2xl font-semibold">
          Add Your Product
        </h2>

        <form
          onSubmit={handleSubmit(handleAddProduct)}
          className="p-4 rounded-sm shadow-md shadow-primary/10"
        >
          {/* Product Name and Category  */}
          <div className="w-full">
            <div className="relative w-full mb-6 group">
              <input
                type="text"
                name="floating_name"
                id="floating_name"
                className={`block shadow-md shadow-primary/10 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0  peer ${
                  errors.productName
                    ? "focus:border-red-500 border-red-500"
                    : "focus:border-secondary"
                }`}
                placeholder=" "
                {...register("productName", { required: true })}
              />

              <label
                for="floating_name"
                className="peer-focus:font-medium absolute text-sm pl-2 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Product Name
              </label>
              {errors.productName && (
                <span className="text-xs text-red-500">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2 md:gap-6">
            {/* Product name is here  */}

            {/* product category  */}
            <div className="relative w-full mt-4 mb-6 group">
              <label
                for="category"
                className="peer-focus:font-medium absolute text-md pl-2 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] font-semibold peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Category
              </label>
              <select
                id="category"
                className="block py-2.5 shadow-md pl-2 shadow-primary/10 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0 focus:border-secondary peer"
                {...register("category", { required: true })}
              >
                <option disabled selected>
                  Select Category
                </option>
                {categories?.map((category) => (
                  <option defaultValue={category?.name} key={category?._id}>
                    {category?.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative w-full mt-4  mb-6 group">
              <label
                for="product_status"
                className="peer-focus:font-medium absolute text-md pl-2 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] font-semibold peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Product Status
              </label>
              <select
                id="product_status"
                className="block py-2.5 shadow-md pl-2 shadow-primary/10 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0 focus:border-secondary peer"
                {...register("product_status", { required: true })}
              >
                <option disabled selected>
                  Select product status
                </option>
                <option>Available</option>
                <option>Unavailable</option>
              </select>
            </div>
          </div>
          <div className="gid gap-5 md:grid-cols-1 md:gap-6">
            <div className="relative w-full   group">
              <input
                type="text"
                name="floating_boxContent"
                id="floating_boxContent"
                className={`block shadow-md shadow-primary/10 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0  peer ${
                  errors.boxContent
                    ? "focus:border-red-500 border-red-500"
                    : "focus:border-secondary"
                }`}
                placeholder=" "
                {...register("boxContent", { required: true })}
              />
              <label
                for="floating_boxContent"
                className="peer-focus:font-medium absolute pl-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Box Content: What you provide in the box
              </label>
              {errors.boxContent && (
                <span className="text-xs text-red-500">
                  This field is required
                </span>
              )}
            </div>
          </div>
          {/* Box content & Price  */}
          <div className="grid gap-5 md:grid-cols-2 mt-6 md:gap-6">
            <div className="relative w-full mb-6 group">
              <input
                onKeyUp={(e) => setErrPrice(e.target.value)}
                type="number"
                min="1"
                name="floating_price"
                id="floating_price"
                className={`block py-2.5 shadow-md shadow-primary/10 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0 peer ${
                  parseInt(errPrice) < 0
                    ? "border-red-500 focus:border-red-500"
                    : "focus:border-secondary"
                }`}
                placeholder=" "
                {...register("price", { required: true })}
              />
              <label
                for="floating_price"
                className="peer-focus:font-medium pl-2 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Price
              </label>
              {errors.price && (
                <span className="text-xs text-red-500">
                  This field is required
                </span>
              )}
            </div>
            {/* Product  Size  */}

            <div className="relative w-full mb-6 group">
              <input
                type="text"
                name="floating_heading"
                id="floating_heading"
                className={`block shadow-md shadow-primary/10 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0  peer ${
                  errors.size
                    ? "focus:border-red-500 border-red-500"
                    : "focus:border-secondary"
                }`}
                placeholder=" "
                {...register("size")}
              />
              <label
                for="floating_heading"
                className="peer-focus:font-medium absolute pl-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Size
              </label>
            </div>
            {/* Box Content here  */}
            {/* Product price here  */}
          </div>

          <div className="grid gap-5 md:grid-cols-3 md:gap-6">
            <div className="relative w-full mb-6 group">
              <label
                className="block mb-2 mt-2 pl-2 text-xs font-medium text-gray-600 dark:text-white"
                for="user_avatar"
              >
                Upload Product Primary img
              </label>
              <input
                style={{ lineHeight: "10px" }}
                className="block w-full text-xs text-gray-900 rounded-sm shadow-md cursor-pointer shadow-primary/10 bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:placeholder-gray-400"
                aria-describedby="user_avatar_help"
                id="user_avatar small_input"
                type="file"
                {...register("primaryImg", { required: true })}
              />
              {errors?.primaryImg && (
                <p className="absolute text-xs text-red-500">
                  Image must be provided
                </p>
              )}
            </div>
            <div className="relative w-full mb-6 group">
              <label
                className="block mb-2 mt-2 pl-2 text-xs font-medium text-gray-600 dark:text-white"
                for="user_avatar"
              >
                Product Feature img 01
              </label>
              <input
                style={{ lineHeight: "10px" }}
                className="block w-full text-xs text-gray-900 rounded-sm shadow-md cursor-pointer shadow-primary/10 bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:placeholder-gray-400"
                aria-describedby="user_avatar_help"
                id="user_avatar small_input"
                type="file"
                {...register("optionalImg1", { required: true })}
              />
              {errors?.optionalImg1 && (
                <p className="absolute text-xs text-red-500">
                  Image must be provided
                </p>
              )}
            </div>
            <div className="relative w-full mb-6 group">
              <label
                className="block mb-2 mt-2 pl-2 text-xs font-medium text-gray-600 dark:text-white"
                for="user_avatar"
              >
                Product Feature img 02
              </label>
              <input
                style={{ lineHeight: "10px" }}
                className="block w-full text-xs text-gray-900 rounded-sm shadow-md cursor-pointer shadow-primary/10 bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:placeholder-gray-400"
                aria-describedby="user_avatar_help"
                id="user_avatar small_input"
                type="file"
                {...register("optionalImg2", { required: true })}
              />
              {errors?.optionalImg2 && (
                <p className="absolute text-xs text-red-500">
                  Image must be provided
                </p>
              )}
            </div>
          </div>

          {/* <div className="flex flex-col items-start mb-6">
            <label
              for="productHighlight"
              className="block mb-2 text-sm pl-2 font-medium text-gray-900 dark:text-white"
            >
              Product Highlight
            </label>
            <textarea
              id="productHighlight"
              rows="4"
              className="block py-2.5 pl-2 shadow-md shadow-primary/10 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0 focus:border-secondary peer"
              placeholder="Write your product key feature..."
              {...register("productHighlight", { required: true })}
            ></textarea>
            {errors.description && (
              <span className="text-xs text-red-500">
                This field is required
              </span>
            )}
          </div>

          <div className="flex flex-col items-start mb-6">
            <label
              for="message"
              className="block mb-2 pl-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Product Description
            </label>
            <textarea
              id="message"
              rows="4"
              className="block py-2.5 pl-2 shadow-md shadow-primary/10 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0 focus:border-secondary peer"
              placeholder="Write your product description here..."
              {...register("description", { required: true })}
            ></textarea>
            {errors.description && (
              <span className="text-xs text-red-500">
                This field is required
              </span>
            )}
          </div> */}
          <div className="flex flex-col items-start mb-6 ">
            <label
              htmlFor="productHighlight"
              className="block mb-2 text-sm pl-2 font-medium text-gray-900 dark:text-white"
            >
              Product Highlight
            </label>
            <ReactQuill
              id="productHighlight"
              value={highlights}
              onChange={(value) => setHighlights(value)}
              className="block w-full text-sm text-gray-900 rounded-sm h-36"
              modules={{
                toolbar: [
                  [{ header: [1, 2, 3, 4, false] }],
                  ["bold", "italic", "underline", "strike"], // Add 'underline' and 'strike'
                  [{ list: "ordered" }, { list: "bullet" }], // Add ordered and unordered lists
                  ["link"],
                  ["clean"],
                ],
              }} // Customize the toolbar as needed
              placeholder="Write your product key feature..."
            />
          </div>

          {/* Product description */}
          <div className="flex flex-col items-start my-12">
            <label
              htmlFor="message"
              className="block mb-2 pl-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Product Description
            </label>
            <ReactQuill
              modules={{
                toolbar: [
                  [{ header: [1, 2, 3, 4, false] }],
                  ["bold", "italic", "underline", "strike"], // Add 'underline' and 'strike'
                  [{ list: "ordered" }, { list: "bullet" }], // Add ordered and unordered lists
                  ["link"],
                  ["clean"],
                ],
              }}
              className="block w-full text-sm text-gray-900 rounded-sm h-36"
              id="description"
              value={description}
              onChange={(value) => setDescription(value)}
              placeholder="Write your product description here..."
            />
          </div>
          <button
            type="submit"
            className={`mt-2 text-white bg-secondary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-secondary/60  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-secondary dark:hover:bg-secondary dark:focus:ring-secondary/60 transition  duration-300  ${"transform active:translate-y-1"}`}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
export default AddProducts;
