import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [identifier, setIdentifier] = useState(""); // email or phone
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // Start countdown timer when OTP step
  useEffect(() => {
    let interval;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // Simple validation for email or phone
  const validateIdentifier = (value) => {
    const emailRegex = /\S+@\S+\.\S+/;
    const phoneRegex = /^[0-9]{10}$/;
    return emailRegex.test(value) || phoneRegex.test(value);
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!validateIdentifier(identifier)) {
        toast.error("Please enter a valid Email or 10-digit Phone Number.");
        return;
      }
      toast.success("OTP sent successfully!");
      setStep(2);
      setTimer(30);
    } else if (step === 2) {
      if (otp.length !== 6) {
        toast.error("Please enter a valid 6-digit OTP.");
        return;
      }
      toast.success("OTP verified successfully!");
      setStep(3);
    } else if (step === 3) {
      if (newPassword.length < 6) {
        toast.error("Password must be at least 6 characters.");
        return;
      }
      if (newPassword !== confirmPassword) {
        toast.error("Passwords do not match.");
        return;
      }
      toast.success("Password reset successful!");
      setTimeout(() => navigate("/login"), 1500); // Redirect after short delay
    }
  };

  return (
    <div className="bg-[#eeeeee] w-full h-dvh flex items-center justify-center">
      <div className="w-96 bg-white shadow-md border border-gray-200 rounded-md p-6">
        <h2 className="text-2xl font-bold text-center text-[#081c4e] mb-6">
          Forgot Password - Step {step} of 3
        </h2>

        {/* STEP 1 - Enter Email or Phone */}
        {step === 1 && (
          <>
            <label className="block text-sm mb-1">Email or Phone</label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Enter your email or phone"
              className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-[#54bd95]"
            />
            <button
              onClick={handleNextStep}
              className="w-full mt-4 py-2 rounded-lg bg-[#54bd95] text-white font-medium hover:bg-[#3da97d] transition"
            >
              Send OTP
            </button>
          </>
        )}

        {/* STEP 2 - Enter OTP */}
        {step === 2 && (
          <>
            <label className="block text-sm mb-1">Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-[#54bd95]"
            />
            <div className="flex justify-between items-center mt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-sm text-gray-600 hover:underline"
              >
                Change Email/Phone
              </button>
              <button
                type="button"
                disabled={timer > 0}
                onClick={() => {
                  setTimer(30);
                  toast.info("OTP resent successfully!");
                }}
                className={`text-sm ${
                  timer > 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-[#54bd95] hover:underline"
                }`}
              >
                {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
              </button>
            </div>
            <button
              onClick={handleNextStep}
              className="w-full mt-4 py-2 rounded-lg bg-[#54bd95] text-white font-medium hover:bg-[#3da97d] transition"
            >
              Verify OTP
            </button>
          </>
        )}

        {/* STEP 3 - Reset Password */}
        {step === 3 && (
          <>
            <label className="block text-sm mb-1">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-[#54bd95]"
            />
            <label className="block text-sm mb-1 mt-3">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-[#54bd95]"
            />
            <button
              onClick={handleNextStep}
              className="w-full mt-4 py-2 rounded-lg bg-[#54bd95] text-white font-medium hover:bg-[#3da97d] transition"
            >
              Reset Password
            </button>
          </>
        )}

        {/* Link to Login */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Back to{" "}
          <Link to="/login" className="text-[#54bd95] font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}
