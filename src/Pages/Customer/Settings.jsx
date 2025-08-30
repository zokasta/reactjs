import { useState } from "react";
import { Mail, Phone, Building2, User, Lock } from "lucide-react";

export default function CustomerSettings() {
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "johndoe@email.com",
    phone: "+1 (555) 234-5678",
    company: "Doe Constructions Pvt. Ltd.",
    currentPassword: "",
    newPassword: "",
    notifications: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saved Data:", formData);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-secondary">Settings</h2>

      {/* Profile Settings */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-gray-dark text-sm mb-1">
                <User size={16} className="text-primary" /> Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-light rounded-lg p-2 focus:outline-primary"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-gray-dark text-sm mb-1">
                <Building2 size={16} className="text-primary" /> Company
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full border border-gray-light rounded-lg p-2 focus:outline-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-gray-dark text-sm mb-1">
                <Mail size={16} className="text-primary" /> Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-light rounded-lg p-2 focus:outline-primary"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-gray-dark text-sm mb-1">
                <Phone size={16} className="text-primary" /> Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-light rounded-lg p-2 focus:outline-primary"
              />
            </div>
          </div>
        </form>
      </div>

      {/* Password Settings */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Change Password</h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="flex items-center gap-2 text-gray-dark text-sm mb-1">
              <Lock size={16} className="text-primary" /> Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full border border-gray-light rounded-lg p-2 focus:outline-primary"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-gray-dark text-sm mb-1">
              <Lock size={16} className="text-primary" /> New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full border border-gray-light rounded-lg p-2 focus:outline-primary"
            />
          </div>
        </form>
      </div>

      {/* Preferences */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Preferences</h3>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="notifications"
            name="notifications"
            checked={formData.notifications}
            onChange={handleChange}
            className="w-5 h-5 text-primary rounded focus:ring-primary"
          />
          <label htmlFor="notifications" className="text-gray-dark">
            Enable Email Notifications
          </label>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-primary text-white font-medium rounded-lg shadow hover:bg-primary-dark transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
