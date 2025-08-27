import React, { useState } from "react";
import { MdClose } from "react-icons/md";

const ForgetPassword = ({ close }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isVerified, setIsVerified] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Handle OTP input change
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  // Submit OTP
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length === 6) {
      // Simulate OTP verification (Replace with API call)
      if (code === "123456") {
        setIsVerified(true);
      } else {
        alert("Invalid OTP, please try again.");
      }
    } else {
      alert("Please enter a valid 6-digit OTP");
    }
  };

  // Submit Password Update
  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) {
      alert("Please fill in all fields");
      return;
    }

    // Call backend API to update password
    alert(
      `Password update request sent. Old: ${oldPassword}, New: ${newPassword}`
    );
  };

  return (
    <div className="fixed z-50 top-0 left-0 right-0 bottom-0 bg-slate-800/70">
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
          <div className="text-right">
            <h1 onClick={close} className="cursor-pointer">
              <MdClose size={25} />
            </h1>
          </div>
          {!isVerified ? (
            <>
              <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
                Verify Your Email
              </h2>
              <p className="text-center text-gray-600 mb-6">
                Enter the 6-digit code we sent to your email address.
              </p>

              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div className="flex justify-between gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      value={digit}
                      maxLength="1"
                      onChange={(e) => handleChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="w-12 h-12 border-2 rounded-lg text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
                >
                  Verify Code
                </button>
              </form>

              <p className="text-center text-sm text-gray-500 mt-4">
                Didn’t receive the code?{" "}
                <span className="text-blue-600 cursor-pointer hover:underline">
                  Resend
                </span>
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
                Update Password
              </h2>

              <form onSubmit={handlePasswordUpdate} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Old Password
                  </label>
                  <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition"
                >
                  Update Password
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
