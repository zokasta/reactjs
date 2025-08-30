import { FileText, Briefcase, CheckCircle } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function CustomerDashboard() {
  const stats = [
    { title: "My Tenders", value: "32", icon: <FileText size={24} /> },
    { title: "Active Bids", value: "12", icon: <Briefcase size={24} /> },
    { title: "Successful Contracts", value: "8", icon: <CheckCircle size={24} /> },
  ];

  const bidData = [
    { month: "Jan", bids: 3 },
    { month: "Feb", bids: 2 },
    { month: "Mar", bids: 5 },
    { month: "Apr", bids: 6 },
    { month: "May", bids: 4 },
    { month: "Jun", bids: 7 },
  ];

  const recentTenders = [
    { id: "#TDR001", project: "Road Construction", date: "2025-08-10", status: "In Review" },
    { id: "#TDR002", project: "School Maintenance", date: "2025-08-12", status: "Approved" },
    { id: "#TDR003", project: "IT Upgrade", date: "2025-08-15", status: "Rejected" },
    { id: "#TDR004", project: "Hospital Renovation", date: "2025-08-20", status: "Pending" },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-secondary">Customer Dashboard</h2>

      {/* Stats Grid */}
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

      {/* Bids Chart */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Bids Overview</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={bidData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="bids" fill="#54bd95" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Tenders */}
      <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4">Recent Tenders</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-light text-gray-dark">
              <th className="p-3">Tender ID</th>
              <th className="p-3">Project</th>
              <th className="p-3">Applied Date</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentTenders.map((t, i) => (
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
