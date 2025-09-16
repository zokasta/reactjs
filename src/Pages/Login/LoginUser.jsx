import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginUser() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate login delay (3 seconds)
    setTimeout(() => {
      setLoading(false);
      navigate("/admin/dashboard"); // redirect to home
    }, 3000);
  };

  return (
    <div className="bg-[#eeeeee] w-full h-dvh flex items-center justify-center">
      <div className="w-96 bg-white shadow-md border border-gray-200 rounded-md p-6">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-[#081c4e] mb-6">
          Login
        </h2>

        {/* Input fields */}
        <form className="space-y-4" onSubmit={handleLogin}>
          {/* Email / Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email or Phone Number
            </label>
            <input
              type="text"
              placeholder="Enter email or phone"
              className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-[#54bd95] focus:border-[#54bd95]"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-[#54bd95] focus:border-[#54bd95]"
              required
            />
          </div>

          {/* Remember me */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-[#54bd95] border-gray-300 rounded focus:ring-[#54bd95]"
              />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-[#54bd95] hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* Login button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-medium transition ${
              loading
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-[#54bd95] text-white hover:bg-[#3da97d]"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Google login */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="text-gray-700 font-medium">Continue with Google</span>
        </button>

        {/* Create account link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link
            to="/create-account"
            className="text-[#54bd95] font-medium hover:underline"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
