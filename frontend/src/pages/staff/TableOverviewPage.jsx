import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function TableOverviewPage({ setSelectedTableId, setPage }) {
    // 1. State lưu trữ danh sách bàn ăn thực tế từ Backend
    const [tables, setTables] = useState([]);
    // State quản lý trạng thái tải dữ liệu (loading) hoặc lỗi (error)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 2. useEffect tự động gọi API khi giao diện được mở ra
    useEffect(() => {
        axios.get('http://localhost:8083/api/staff/tables')
            .then(response => {
                setTables(response.data); // Gán mảng dữ liệu JSON trả về vào state
                setLoading(false);
            })
            .catch(err => {
                console.error("Lỗi khi kết nối API bàn ăn:", err);
                setError("Không thể tải danh sách bàn ăn. Vui lòng kiểm tra Backend!");
                setLoading(false);
            });
    }, []);

    // 3. Hàm xử lý khi nhân viên bấm chọn vào một bàn ăn cụ thể
    const handleTableClick = (tableId, status) => {
        setSelectedTableId(tableId); // Lưu lại ID bàn được chọn vào State tổng của App.jsx

        // Chuyển sang màn hình gọi món (StaffOrderPage)
        setPage("order");
    };

    // Định nghĩa màu sắc hiển thị tương ứng với trạng thái bàn ăn từ DB
    const getStatusStyle = (status) => {
        switch (status) {
            case 'available':
                return { backgroundColor: '#2ecc71', color: '#fff', label: 'Bàn trống' }; // Màu xanh lá
            case 'occupied':
                return { backgroundColor: '#e74c3c', color: '#fff', label: 'Có khách' }; // Màu đỏ
            default:
                return { backgroundColor: '#95a5a6', color: '#fff', label: 'Tạm khóa' }; // Màu xám
        }
    };

    // Giao diện hiển thị khi đang đợi API trả dữ liệu
    if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>Đang tải danh sách bàn ăn...</div>;
    if (error) return <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}>{error}</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ marginBottom: '20px', color: '#2c3e50' }}>Sơ đồ phòng ăn / Bàn ăn</h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                gap: '20px'
            }}>
                {tables.map((table) => {
                    const styleInfo = getStatusStyle(table.status);
                    return (
                        <div
                            key={table.id}
                            onClick={() => handleTableClick(table.id, table.status)}
                            style={{
                                padding: '20px',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                cursor: 'pointer',
                                backgroundColor: '#fff',
                                borderLeft: `8px solid ${styleInfo.backgroundColor}`,
                                transition: 'transform 0.2s',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{table.name}</h3>
                            <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#7f8c8d' }}>
                                Sức chứa: <strong>{table.seats} chỗ</strong>
                            </p>
                            <span style={{
                                padding: '4px 8px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                fontWeight: 'bold',
                                backgroundColor: styleInfo.backgroundColor,
                                color: styleInfo.color
                            }}>
                                {styleInfo.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}