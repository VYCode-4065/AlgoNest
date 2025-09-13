import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getProfileData } from "../features/authSlice";
import {
  useCreateOrderMutation,
  useGetRazorPayIdQuery,
  usePaymentVerificationMutation,
} from "../store/api/orderApi";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Markup } from "interweave";
import StyledBtn from "../components/StyledBtn";
import { FaArrowLeft } from "react-icons/fa6";

const CheckoutCourse = () => {
  const location = useLocation();

  const {
    _id: courseId,
    courseTitle,
    description,
    thumbnails,
    coursePrice,
  } = location.state;

  const course = {
    title: courseTitle,
    description:
      <Markup content={description} /> ||
      `Learn ${description} from scratch and build powerful web applications with modern tools and best practices.`,
    price: coursePrice,
    thumbnail: thumbnails,
  };

  const gstRate = 0.18;
  const discount = course.price * 0.02;

  const gstAmount = course.price * gstRate;
  const totalPrice = course.price + gstAmount - discount;

  const navigate = useNavigate();

  const { user: userData } = useSelector(getProfileData);

  const [createOrder, { data, isSuccess, isError }] = useCreateOrderMutation();

  const { data: idData } = useGetRazorPayIdQuery();
  const [paymentVerficiation, { data: paymentData, isLoading }] =
    usePaymentVerificationMutation();

  const paymentVerificationHandler = async (paymentVerifyData) => {
    try {
      const paymentVerificationRes = await paymentVerficiation({
        ...paymentVerifyData,
        courseId,
      });

      if (paymentVerificationRes.data.success) {
        toast.success("Course purchased successfully !");
        navigate("/my-learning");
      }
      if (!paymentVerificationRes.data.success) {
        toast.error(paymentVerificationRes.data?.message);
      }
    } catch (error) {
      console.log("error at payment verification !");
    }
  };
  const handlePaymentGateway = async () => {
    try {
      const createOrderResponse = await createOrder({
        amount: totalPrice,
        receipt: "vw-001",
      });

      if (!createOrderResponse.data.success)
        throw "Unable to place order at this moment !";

      const options = {
        key: idData?.data?.razorPayId,
        amount: totalPrice,
        currency: "INR",
        name: course.title,
        description: course.description,
        order_id: createOrderResponse.data?.data.id,
        handler: (response) => {
          paymentVerificationHandler(response);
        },
        prefill: {
          name: userData.name,
          email: userData.email,
          contact: "9999999999",
        },
        theme: {
          color: "#601598",
        },
      };

      const razorPay = new window.Razorpay(options);
      razorPay.open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-purple-50 dark:bg-slate-800 flex items-center justify-center p-6 relative">
      <div
        onClick={(e) => {
          history.back();
        }}
        className="absolute top-5 left-5 "
      >
        <StyledBtn>
          <FaArrowLeft />
          Back
        </StyledBtn>
      </div>
      <div className="max-w-5xl w-full bg-white rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden dark:border">
        {/* Left side - Course details */}
        <div className="checkout-image md:w-2/3 p-8 text-white flex flex-col justify-center  relative bg-gradient-to-tl from-purple-500 to-purple-900">
          <div className="container h-42 md:h-82 mb-3">
            <img
              src={course.thumbnail}
              alt="course image"
              className="h-full w-full lg:object-cover"
            />
          </div>
          <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
          <div className="mb-6 text-lg leading-relaxed line-clamp-2">
            {course.description}
          </div>
          <div className="text-3xl font-semibold">
            ₹{course.price?.toLocaleString("en-IN")}
          </div>
        </div>

        {/* Right side - Summary */}
        <div className="md:w-1/3 p-8 bg-purple-100 dark:bg-slate-800 flex flex-col justify-center ">
          <h2 className="text-2xl font-semibold text-purple-900 mb-6 dark:text-slate-300">
            Order Summary
          </h2>
          <div className="mb-4 flex justify-between text-purple-800 dark:text-slate-300">
            <span>Course Amount</span>
            <span>₹{course.price?.toLocaleString("en-IN")}</span>
          </div>
          <div className="mb-4 flex justify-between text-purple-800 dark:text-slate-300">
            <span>GST (18%)</span>
            <span>₹{gstAmount.toFixed(2)}</span>
          </div>
          <div className="mb-4 flex justify-between text-purple-800 dark:text-slate-300">
            <span>Discount</span>
            <span className="text-green-600 dark:text-purple-400">
              - ₹{discount?.toLocaleString("en-IN")}
            </span>
          </div>
          <hr className="my-4 border-purple-300" />
          <div className="mb-6 flex justify-between font-bold text-xl text-purple-900 dark:text-slate-300">
            <span>Total Price</span>
            <span>₹{totalPrice.toFixed(2)}</span>
          </div>
          <button
            type="button"
            className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 rounded-md transition cursor-pointer"
            onClick={handlePaymentGateway}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCourse;
