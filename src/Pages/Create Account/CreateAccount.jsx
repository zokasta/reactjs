import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function CreateAccount() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // form state
  const [form, setForm] = useState({
    email: "",
    number: "",
    password: "",
    emailOtp: "",
    numberOtp: "",
    firstName: "",
    lastName: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    company: "",
    website: "",
  });

  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // simulate API call
    setTimeout(() => {
      console.log("Form Submitted:", form);
      setLoading(false);
      navigate("/"); // redirect to home after signup
    }, 3000);
  };

  return (
    <div
      className={`bg-[#eeeeee] w-full h-dvh flex justify-center ${
        step === 3 ? "items-start pt-10 overflow-y-auto" : "items-center"
      }`}
    >
      <div className="w-[450px] bg-white shadow-md border border-gray-200 rounded-md p-6 mb-10">
        <h2 className="text-2xl font-bold text-center text-[#081c4e] mb-6">
          Create Account - Step {step} of 3
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* STEP 1 - Email, Number, Password */}
          {step === 1 && (
            <>
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-[#54bd95]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="number"
                  value={form.number}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-[#54bd95]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-[#54bd95]"
                  required
                />
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="w-4 h-4 text-[#54bd95] border-gray-300 rounded focus:ring-[#54bd95]"
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the{" "}
                  <span className="text-[#54bd95] cursor-pointer hover:underline">
                    Terms & Conditions
                  </span>
                </label>
              </div>

              <button
                type="button"
                onClick={nextStep}
                disabled={!acceptedTerms}
                className={`w-full py-2 rounded-lg font-medium transition ${
                  acceptedTerms
                    ? "bg-[#54bd95] text-white hover:bg-[#3da97d]"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Next
              </button>
            </>
          )}

          {/* STEP 2 - OTP Verification */}
          {step === 2 && (
            <>
              <div>
                <label className="block text-sm mb-1">Email OTP</label>
                <input
                  type="text"
                  name="emailOtp"
                  value={form.emailOtp}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-[#54bd95]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Number OTP</label>
                <input
                  type="text"
                  name="numberOtp"
                  value={form.numberOtp}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-[#54bd95]"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-4 py-2 rounded-lg bg-[#54bd95] text-white font-medium hover:bg-[#3da97d] transition"
                >
                  Next
                </button>
              </div>
            </>
          )}

          {/* STEP 3 - More Info */}
          {step === 3 && (
            <>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-[#54bd95]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-[#54bd95]"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">Country</label>
                <input
                  type="text"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-[#54bd95]"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm mb-1">State</label>
                  <input
                    type="text"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-[#54bd95]"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-[#54bd95]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-[#54bd95]"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Company Name</label>
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-[#54bd95]"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Website URL</label>
                <input
                  type="url"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-[#54bd95]"
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    loading
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-[#54bd95] text-white hover:bg-[#3da97d]"
                  }`}
                >
                  {loading ? "Creating Account..." : "Complete Signup"}
                </button>
              </div>
            </>
          )}
        </form>

        {/* Link to Login */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#54bd95] font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
