import { BarChart3, Users, FileText, CreditCard } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function AdminDashboard() {
  const stats = [
    { title: "Customers", value: "12,430", icon: <Users size={24} /> },
    { title: "Invoices", value: "4,210", icon: <FileText size={24} /> },
    { title: "Payments", value: "$98,000", icon: <CreditCard size={24} /> },
    { title: "Reports", value: "321", icon: <BarChart3 size={24} /> },
  ];

  const revenueData = [
    { month: "Jan", revenue: 4000 },
    { month: "Feb", revenue: 3200 },
    { month: "Mar", revenue: 4800 },
    { month: "Apr", revenue: 5100 },
    { month: "May", revenue: 6100 },
    { month: "Jun", revenue: 7200 },
  ];

  const recentInvoices = [
    { id: "#INV001", customer: "John Doe", amount: "$1,200", status: "Paid" },
    { id: "#INV002", customer: "Jane Smith", amount: "$850", status: "Pending" },
    { id: "#INV003", customer: "Michael Lee", amount: "$3,000", status: "Paid" },
    { id: "#INV004", customer: "Sarah Kim", amount: "$2,100", status: "Overdue" },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-secondary">Admin Overview</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

      {/* Revenue Chart */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#54bd95" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Invoices */}
      <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4">Recent Invoices</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-light text-gray-dark">
              <th className="p-3">Invoice ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentInvoices.map((inv, i) => (
              <tr key={i} className="border-b hover:bg-gray-light/40">
                <td className="p-3 font-medium">{inv.id}</td>
                <td className="p-3">{inv.customer}</td>
                <td className="p-3">{inv.amount}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium
                      ${
                        inv.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : inv.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                  >
                    {inv.status}
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
