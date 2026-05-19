import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import HomePage from "../pages/HomePage.jsx";
// ... các import khác của bạn

// Nhóm các trang nhân viên vào đây
import TableOverviewPage from "../pages/staff/TableOverviewPage.jsx";
import StaffOrderPage from "../pages/staff/StaffOrderPage.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      // ... routes khách hàng
    ],
  },
  {
    path: "/staff",
    // Lưu ý: Không bọc trong MainLayout để tránh hiện Header/Footer của khách
    children: [
      { index: true, element: <TableOverviewPage /> },
      { path: "order/:tableId", element: <StaffOrderPage /> },
    ],
  },
]);