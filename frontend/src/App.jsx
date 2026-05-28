import { useState } from "react";
import Sidebar from "./components/admin/Sidebar.jsx";
import EmployeePage from "./pages/admin/EmployeePage.jsx";
import MenuPage from "./pages/admin/MenuPage.jsx";

// Import 2 trang phân hệ Nhân viên phục vụ của bạn
import TableOverviewPage from "./pages/staff/TableOverviewPage.jsx";
import StaffOrderPage from "./pages/staff/StaffOrderPage.jsx";

export default function App() {
  // Trang mặc định khi vừa mở web là Quản lý nhân viên giống của nhóm
  const [page, setPage] = useState("employee");

  // State lưu id của bàn ăn được chọn khi chuyển sang màn hình gọi món
  const [selectedTableId, setSelectedTableId] = useState("ban01");

  return (
    <div className="app" style={{ display: "flex", minHeight: "100vh" }}>
      {/* Truyền state page và setPage vào Sidebar để bấm chuyển trang */}
      <Sidebar page={page} setPage={setPage} />

      {/* Vùng nội dung hiển thị các trang tương ứng theo điều kiện */}
      <div className="main-content" style={{ flex: 1, padding: "20px" }}>
        
        {/* Các trang có sẵn của nhóm */}
        {page === "employee" && <EmployeePage />}
        {page === "menu" && <MenuPage />}
        
        {/* Trang Sơ đồ bàn ăn của bạn */}
        {page === "staff-tables" && (
          <TableOverviewPage 
            setPage={setPage} 
            setSelectedTableId={setSelectedTableId} 
          />
        )}
        
        {/* Trang Gọi món / Lên đơn của bạn */}
        {page === "staff-order" && (
          <StaffOrderPage 
            tableId={selectedTableId} 
            setPage={setPage} 
          />
        )}
        
      </div>
    </div>
  );
}