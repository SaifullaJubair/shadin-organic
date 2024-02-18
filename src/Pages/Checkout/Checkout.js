import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import { Button, Table } from "flowbite-react";
import { TableHead } from "flowbite-react/lib/esm/components/Table/TableHead";
import { TableHeadCell } from "flowbite-react/lib/esm/components/Table/TableHeadCell";
import { TableBody } from "flowbite-react/lib/esm/components/Table/TableBody";
import { TableRow } from "flowbite-react/lib/esm/components/Table/TableRow";
import { TableCell } from "flowbite-react/lib/esm/components/Table/TableCell";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Loader from "../../Shared/Loader/Loader";

const Checkout = () => {
  const { user, loading } = useContext(AuthContext);
  const [refetch, setRefetch] = useState(false);
  const [cartPosts, setCartPosts] = useState([]);
  const [singleUser, setSingleUser] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [deliveryType, setDeliveryType] = useState("home");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (user?.email) {
      fetch(`https://shadin-organic-server.vercel.app/mycart/${user?.email}`)
        .then((res) => res.json())
        .then((data) => {
          setCartPosts(data);
          const calculateTotalAmount = data
            .map((item) => item?.product?.price * item?.quantity)
            .reduce((sum, amount) => sum + amount, 0);
          setTotalAmount(calculateTotalAmount);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user?.email, refetch]);
  console.log(cartPosts);

  useEffect(() => {
    if (user && user.email) {
      // Fetch user data only if user is available and has an email
      fetch(`https://shadin-organic-server.vercel.app/singleuser/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setSingleUser(data);
        })
        .catch((error) => {
          // Handle fetch error if necessary
          console.error(error);
        });
    } else {
      // Handle case when user is not authenticated
      setSingleUser(null); // Set singleUser to null or an empty object
    }
  }, [user]);

  useEffect(() => {
    // Fetch division data from the backend when the component mounts
    fetch("https://shadin-organic-server.vercel.app/bangladesh")
      .then((res) => res.json())
      .then((data) => {
        // Assuming the division data is stored in the 'divisions' property

        setDivisions(
          data.find((item) => item.name === "divisions")?.data || []
        );
        // console.log(divisions);
        setDistricts(
          data.find((item) => item.name === "districts")?.data || []
        );
        // console.log(districts);
      })
      .catch((error) => {
        console.error(error);
        // Handle fetch error if necessary
      });
  }, []);
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
  const handleCheckout = async (data) => {
    if (!selectedDivision || !selectedDistrict) {
      toast.error("Please select both division and district.", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    const checkoutData = {
      userName: data.userName,
      userEmail: user.email,
      division: data.division,
      district: data.district,
      address: data.address,
      number: data.number,
      checkoutDate: formattedDate,
      cartProducts: cartPosts
        ?.filter((item) => item.product)
        .map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          // selectedColor: item?.selectedColor,
          // primary_color: item?.product?.primary_color,
          size: item?.product?.size,
          category: item?.product?.category,
          price: item?.product?.price,
          product_name: item?.product?.product_name,
          img: item?.product?.primary_img,
          subtotal: item?.product?.price * item?.quantity,
        })),
      totalAmount,
      grandTotal: totalAmount + 110,
    };
    console.log(checkoutData);

    fetch("https://shadin-organic-server.vercel.app/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checkoutData),
    }).then((res) => {
      res.json().then((data) => {
        toast.success("Checkout successful", {
          position: toast.POSITION.TOP_CENTER,
        });
        navigate("/dashboard/my-orders");
      });
    });
  };

  const validateBangladeshiMobileNumber = (value) => {
    // Regular expression for Bangladeshi mobile numbers
    const mobileNumberRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/;

    return mobileNumberRegex.test(value);
  };

  if (loading) {
    return <Loader />;
  }
  if (cartPosts.length === 0) {
    return (
      <div>
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-3xl font-bold">Your cart is empty!</h1>
          <Link to="/category/all">
            <Button className="btn btn-primary ml-4 bg-pred">Shop Now</Button>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-gray-100">
      <div className="max-w-[1440px] mx-auto">
        <div className="py-16 px-4">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 ">
            {/*  left  Product information */}

            <div className="bg-white col-span-2 py-8 ">
              <h1 className="text-xl font-semibold text-gray-800 px-4">
                Product information
              </h1>

              <div className="overflow-x-auto my-6">
                <Table striped>
                  <TableHead>
                    <TableHeadCell>Image</TableHeadCell>
                    <TableHeadCell>Item Name</TableHeadCell>
                    <TableHeadCell>Price</TableHeadCell>

                    <TableHeadCell>Quantity</TableHeadCell>
                    <TableHeadCell>Sub Total</TableHeadCell>
                  </TableHead>
                  <TableBody className="divide-y">
                    {cartPosts?.map((post, index) => (
                      <TableRow
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                        key={index}
                      >
                        <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          <img
                            className="w-16 h-12"
                            src={post?.product?.primary_img}
                            alt=""
                          />
                        </TableCell>
                        <TableCell className="min-w-[150px]">
                          <Link
                            to={`/singleproduct/${post?.product?._id}`}
                            className="hover:text-pred"
                          >
                            {post?.product?.product_name?.length > 30
                              ? post?.product?.product_name?.slice(0, 30) +
                                "..."
                              : post?.product?.product_name}
                            {post?.product?.size && `(${post?.product?.size})`}
                          </Link>
                        </TableCell>

                        <TableCell>{post?.product?.price}</TableCell>
                        <TableCell>{post?.quantity}</TableCell>
                        <TableCell>
                          {post?.product?.price * post?.quantity}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="text-right mt-4 mr-16 divide-y ">
                <p className="">Total: {totalAmount}</p>
              </div>
              <hr className="mx-4 my-3" />
              <div className="text-right mt-4 mr-16 flex justify-between ">
                <div className="flex-wrap max-w-7/12">
                  <p className="text-xs ml-4 text-pred font-semibold">
                    বিঃদ্রঃ ডেলিভারি চার্জের টাকা অগ্রিম পরিশোধ করতে হবে।
                    01760819195 (বিকাশ/নগদ/রকেট/উপায়)
                  </p>
                </div>
                <p> Delivery Charge: 110 </p>
              </div>
              <hr className="mx-4 my-4" />
              <div className="text-right mt-4 mr-16 divide-y ">
                <p>Grand Total: {totalAmount + 110} </p>
              </div>
            </div>

            {/*right Customer information */}
            <div className="bg-white col-span-1  py-8 px-4">
              <h1 className="text-xl font-semibold text-gray-800 p-4">
                Customer information
              </h1>

              <form onSubmit={handleSubmit(handleCheckout)}>
                {/* User name */}
                <div className="relative w-full mb-6 group">
                  <input
                    type="text"
                    name="floating_name"
                    id="floating_name"
                    className={`block shadow-md shadow-primary/10 py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0  peer ${
                      errors.userName
                        ? "focus:border-red-500 border-red-500"
                        : "focus:border-secondary"
                    }`}
                    placeholder=" "
                    {...register("userName", { required: true })}
                  />

                  <label
                    for="floating_name"
                    className="peer-focus:font-medium absolute pl-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Your Name
                  </label>
                  {errors.userName && (
                    <span className="text-xs text-red-500">
                      This field is required
                    </span>
                  )}
                </div>

                {/* Mobile Number */}
                <div className="relative w-full mb-6 group">
                  <input
                    type="text"
                    name="floating_number"
                    id="floating_number"
                    className={`block shadow-md shadow-primary/10 py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0  peer ${
                      errors.number
                        ? "focus:border-red-500 border-red-500"
                        : "focus:border-secondary"
                    }`}
                    placeholder=" "
                    {...register("number", {
                      required: "This field is required",
                      validate: {
                        isBangladeshiMobileNumber: (value) =>
                          validateBangladeshiMobileNumber(value) ||
                          "Invalid Bangladeshi mobile number",
                      },
                    })}
                  />

                  <label
                    htmlFor="floating_number"
                    className="peer-focus:font-medium absolute pl-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Number
                  </label>
                  {errors.number && (
                    <span className="text-xs text-red-500">
                      {errors.number.message}
                    </span>
                  )}
                </div>

                {/*division */}
                <p>Division:</p>
                <div className="relative w-full mb-6 group">
                  <label
                    for="division"
                    className="peer-focus:font-medium absolute text-md pl-2 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] font-semibold peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Division
                  </label>

                  <select
                    id="division"
                    className="block py-3 shadow-md pl-2 shadow-primary/10 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0 focus:border-secondary peer"
                    {...register("division", { required: true })}
                    onChange={(e) => {
                      setSelectedDivision(e.target.value);
                    }}
                  >
                    <option disabled selected>
                      Select Division
                    </option>
                    {divisions.map((division) => (
                      <option key={division._id} value={division.name}>
                        {division.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* districts */}
                <p>District:</p>
                <div className="relative w-full mb-6 group">
                  <label
                    for="district"
                    className="peer-focus:font-medium absolute text-md pl-2 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] font-semibold peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    District
                  </label>
                  <select
                    id="district"
                    className={`block py-2.5 shadow-md pl-2 shadow-primary/10 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0 focus:border-secondary peer ${
                      errors.district
                        ? "focus:border-red-500 border-red-500"
                        : "focus:border-secondary"
                    }`}
                    {...register("district", { required: true })}
                    onChange={(e) => {
                      setValue("district", e.target.value);
                      setSelectedDistrict(e.target.value);
                    }}
                  >
                    <option disabled selected>
                      Select District
                    </option>
                    {districts
                      .filter(
                        (district) =>
                          district.division_name === selectedDivision
                      )
                      .map((district) => (
                        <option key={district._id} value={district.name}>
                          {district.name}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Your Address */}
                <div className="relative w-full mb-6 group">
                  <input
                    type="text"
                    name="floating_address"
                    id="floating_address"
                    className={`block shadow-md shadow-primary/10 py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0  peer ${
                      errors.address
                        ? "focus:border-red-500 border-red-500"
                        : "focus:border-secondary"
                    }`}
                    placeholder=" "
                    {...register("address", { required: true })}
                  />

                  {/* Conditional label based on deliveryType */}
                  <label
                    htmlFor="floating_address"
                    className="peer-focus:font-medium absolute pl-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    {deliveryType === "home"
                      ? "Your Home Address"
                      : "Provide courier name & address"}
                  </label>

                  {errors.address && (
                    <span className="text-xs text-red-500">
                      This field is required
                    </span>
                  )}
                </div>

                <div className="flex justify-center gap-4 mt-8">
                  <Button color="success" type="submit">
                    Yes, I'm sure
                  </Button>
                  <Button
                    color="gray"
                    // onClick={() => {
                    //   setCheckoutData(null);
                    // }}
                  >
                    No, cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
