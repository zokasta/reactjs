import { User, Mail, Phone, MapPin, Briefcase, FileText, CheckCircle } from "lucide-react";

export default function CustomerProfile() {
  const profile = {
    name: "John Doe",
    role: "Customer",
    company: "Doe Constructions Pvt. Ltd.",
    email: "johndoe@email.com",
    phone: "+1 (555) 234-5678",
    address: "123 Business Street, New York, USA",
  };

  const stats = [
    { title: "My Tenders", value: "32", icon: <FileText size={24} /> },
    { title: "Active Bids", value: "12", icon: <Briefcase size={24} /> },
    { title: "Contracts Won", value: "8", icon: <CheckCircle size={24} /> },
  ];

  const recentActivity = [
    { id: "#TDR001", project: "Road Construction", date: "2025-08-10", status: "In Review" },
    { id: "#TDR002", project: "School Maintenance", date: "2025-08-12", status: "Approved" },
    { id: "#TDR003", project: "IT Upgrade", date: "2025-08-15", status: "Rejected" },
    { id: "#TDR004", project: "Hospital Renovation", date: "2025-08-20", status: "Pending" },
  ];

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row md:items-center gap-6">
        <div className="w-28 h-28 rounded-full bg-primary flex items-center justify-center text-white text-4xl font-bold">
          {profile.name.charAt(0)}
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-secondary">{profile.name}</h2>
          <p className="text-primary font-medium">{profile.role}</p>
          <p className="mt-1 text-gray-dark">{profile.company}</p>
          <div className="mt-4 space-y-2 text-gray-dark">
            <p className="flex items-center gap-2">
              <Mail size={18} className="text-primary" /> {profile.email}
            </p>
            <p className="flex items-center gap-2">
              <Phone size={18} className="text-primary" /> {profile.phone}
            </p>
            <p className="flex items-center gap-2">
              <MapPin size={18} className="text-primary" /> {profile.address}
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <div
            key={i}
            className="rounded-2xl shadow-md hover:shadow-lg transition bg-white p-6 flex flex-col items-center text-center"
          >
            <div className="p-4 bg-primary rounded-full text-white">{s.icon}</div>
            <h3 className="mt-4 font-semibold text-lg">{s.title}</h3>
            <p className="text-2xl font-bold text-secondary">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-light text-gray-dark">
              <th className="p-3">Tender ID</th>
              <th className="p-3">Project</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentActivity.map((t, i) => (
              <tr key={i} className="border-b hover:bg-gray-light/40">
                <td className="p-3 font-medium">{t.id}</td>
                <td className="p-3">{t.project}</td>
                <td className="p-3">{t.date}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium
                      ${
                        t.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : t.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : t.status === "In Review"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                      }`}
                  >
                    {t.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
