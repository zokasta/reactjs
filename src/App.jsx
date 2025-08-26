import { Routes, Route } from "react-router-dom";

import NotFound from "./Pages/NotFound/NotFound";
import Home from "./Pages/Home/Home";
import CreateAccount from "./Pages/Create Account/CreateAccount";
import LoginUser from "./Pages/Login/LoginUser";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";

// Layout
import DashboardLayout from "./layouts/DashboardLayout";

// Customer Pages
import CustomerDashboard from "./Pages/Customer/Dashboard";
import CustomerInvoices from "./Pages/Customer/Invoices";
import CustomerPayments from "./Pages/Customer/Payments";
import CustomerProfile from "./Pages/Customer/Profile";
import CustomerSettings from "./Pages/Customer/Settings";

// Admin Pages
import AdminDashboard from "./Pages/Admin/Dashboard";
import AdminTaxes from "./Pages/Admin/Taxes";
import AdminInvoices from "./Pages/Admin/Invoices";
import AdminCustomers from "./Pages/Admin/Customers";
import AdminLeads from "./Pages/Admin/Leads";
import AdminReviews from "./Pages/Admin/Reviews";
import AdminReports from "./Pages/Admin/Reports";
import AdminEmployees from "./Pages/Admin/Employees";
import AdminPayments from "./Pages/Admin/Payments";
import AdminBanks from "./Pages/Admin/Banks";
import AdminPages from "./Pages/Admin/Pages";

// Developer Pages
import DevApiCalls from "./Pages/Developer/ApiCalls";
import DevBugs from "./Pages/Developer/Bugs";
import DevReports from "./Pages/Developer/Reports";
import DevUsers from "./Pages/Developer/Users";

// Employee Pages
import EmpDashboard from "./Pages/Employee/Dashboard";
import EmpInvoices from "./Pages/Employee/Invoices";
import EmpCustomers from "./Pages/Employee/Customers";
import EmpLeads from "./Pages/Employee/Leads";
import EmpReports from "./Pages/Employee/Reports";
import EmpPayments from "./Pages/Employee/Payments";
import EmpTickets from "./Pages/Employee/Tickets";

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/login" element={<LoginUser />} />

      {/* ================== DASHBOARDS ================== */}
      {/* Customer */}
      <Route path="/customer" element={<DashboardLayout role="customer" />}>
        <Route path="dashboard" element={<CustomerDashboard />} />
        <Route path="invoices" element={<CustomerInvoices />} />
        <Route path="payments" element={<CustomerPayments />} />
        <Route path="profile" element={<CustomerProfile />} />
        <Route path="settings" element={<CustomerSettings />} />
      </Route>

      {/* Admin */}
      <Route path="/admin" element={<DashboardLayout role="admin" />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="taxes" element={<AdminTaxes />} />
        <Route path="invoices" element={<AdminInvoices />} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="leads" element={<AdminLeads />} />
        <Route path="reviews" element={<AdminReviews />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="employees" element={<AdminEmployees />} />
        <Route path="payments" element={<AdminPayments />} />
        <Route path="banks" element={<AdminBanks />} />
        <Route path="pages" element={<AdminPages />} />
      </Route>

      {/* Developer */}
      <Route path="/developer" element={<DashboardLayout role="developer" />}>
        <Route path="api-calls" element={<DevApiCalls />} />
        <Route path="bugs" element={<DevBugs />} />
        <Route path="reports" element={<DevReports />} />
        <Route path="users" element={<DevUsers />} />
      </Route>

      {/* Employee */}
      <Route path="/employee" element={<DashboardLayout role="employee" />}>
        <Route path="dashboard" element={<EmpDashboard />} />
        <Route path="invoices" element={<EmpInvoices />} />
        <Route path="customers" element={<EmpCustomers />} />
        <Route path="leads" element={<EmpLeads />} />
        <Route path="reports" element={<EmpReports />} />
        <Route path="payments" element={<EmpPayments />} />
        <Route path="tickets" element={<EmpTickets />} />
      </Route>

      {/* Others */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
