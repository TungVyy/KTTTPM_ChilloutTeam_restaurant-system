import React, { useState } from 'react';
import { menuData } from "../../data/mockData.js";

const categories = ["Tất cả", "Khai vị", "Món chính", "Đồ uống", "Tráng miệng"];

export default function StaffOrderPage({ tableId, setPage }) {
  const [cart, setCart] = useState([]);
  const [activeTab, setActiveTab] = useState("Tất cả");
  const [selectedCartItem, setSelectedCartItem] = useState(null); // Lưu món đang chọn trong giỏ để bấm số

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        const updated = prev.map(i => i.id === item.id ? {...i, qty: i.qty + 1} : i);
        // Tự động chọn món vừa tăng số lượng để thao tác bàn phím
        setSelectedCartItem(updated.find(i => i.id === item.id));
        return updated;
      }
      const newItem = {...item, qty: 1};
      setSelectedCartItem(newItem);
      return [...prev, newItem];
    });
  };

  // Thao tác bàn phím số giống Odoo
  const handleNumberPress = (num) => {
    if (!selectedCartItem) return;
    setCart(prev => {
      return prev.map(i => {
        if (i.id === selectedCartItem.id) {
          let newQty = num;
          if (num === 'back') {
            newQty = Math.max(0, Math.floor(i.qty / 10)); // Xóa số cuối
          } else {
            newQty = i.qty === 0 ? parseInt(num) : parseInt(`${i.qty}${num}`);
          }
          const updatedItem = {...i, qty: newQty};
          setSelectedCartItem(updatedItem);
          return updatedItem;
        }
        return i;
      }).filter(i => i.qty > 0); // Nếu số lượng về 0 thì tự xóa khỏi giỏ
    });
  };

  const totalAmount = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 40px)', fontFamily: 'Arial, sans-serif', backgroundColor: '#fff' }}>
      
      {/* 1. CỘT HÓA ĐƠN & BÀN PHÍM TÍNH TIỀN (BÊN TRÁI - CHUẨN ODOO) */}
      <div style={{ width: '420px', display: 'flex', flexDirection: 'column', borderRight: '1px solid #e1e4e8' }}>
        {/* Header bàn */}
        <div style={{ padding: '15px', borderBottom: '1px solid #e1e4e8', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8f9fa' }}>
          <button onClick={() => setPage('staff-tables')} style={{ padding: '8px 12px', border: '1px solid #ccc', borderRadius: '6px', cursor: 'pointer', backgroundColor: '#fff', fontWeight: 'bold' }}>
            ← Sơ đồ bàn
          </button>
          <span style={{ backgroundColor: '#7c5dfa', color: '#fff', padding: '6px 12px', borderRadius: '4px', fontWeight: 'bold', fontSize: '14px' }}>
            BÀN: {(tableId || "b1").toUpperCase()}
          </span>
        </div>

        {/* Danh sách giỏ hàng */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '15px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#999', marginTop: '40px', fontStyle: 'italic' }}>Chưa chọn món nào</div>
          ) : (
            cart.map(item => (
              <div 
                key={item.id} 
                onClick={() => setSelectedCartItem(item)}
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  padding: '10px', 
                  borderRadius: '6px',
                  cursor: 'pointer',
                  marginBottom: '5px',
                  backgroundColor: selectedCartItem?.id === item.id ? '#f0f3ff' : 'transparent',
                  borderLeft: selectedCartItem?.id === item.id ? '4px solid #7c5dfa' : '4px solid transparent'
                }}
              >
                <div>
                  <div style={{ fontWeight: 'bold', color: '#333', fontSize: '14px' }}>{item.name}</div>
                  <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                    {item.qty} Đơn vị x {item.price?.toLocaleString()}đ
                  </div>
                </div>
                <div style={{ fontWeight: 'bold', color: '#111' }}>{(item.price * item.qty).toLocaleString()}đ</div>
              </div>
            ))
          )}
        </div>

        {/* Phần Tổng tiền & Bàn phím số Odoo */}
        <div style={{ borderTop: '2px solid #e1e4e8', backgroundColor: '#f8f9fa', padding: '15px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: '900', color: '#ff5c5c', marginBottom: '15px' }}>
            <span>Tổng cộng:</span>
            <span>{totalAmount.toLocaleString()}đ</span>
          </div>

          {/* Khối chức năng điều khiển số lượng */}
          <div style={{ display: 'flex', gap: '10px' }}>
            {/* Bàn phím số */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', flex: 1 }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(num => (
                <button key={num} onClick={() => handleNumberPress(num)} style={{ height: '42px', fontSize: '16px', fontWeight: 'bold', border: '1px solid #d3d3d3', borderRadius: '4px', backgroundColor: '#fff', cursor: 'pointer' }}>
                  {num}
                </button>
              ))}
              <button onClick={() => handleNumberPress('back')} style={{ gridColumn: 'span 2', height: '42px', fontSize: '16px', fontWeight: 'bold', border: '1px solid #d3d3d3', borderRadius: '4px', backgroundColor: '#fce4e4', color: '#cc0000', cursor: 'pointer' }}>
                ⌫ Xóa bớt
              </button>
            </div>

            {/* Cột nút hành động lớn */}
            <div style={{ width: '120px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <button 
                onClick={() => {
                  if(cart.length === 0) return alert("Vui lòng chọn món trước!");
                  alert("Đã gửi đơn hàng đến nhà bếp thành công!");
                  setCart([]);
                  setPage('staff-tables');
                }} 
                style={{ flex: 1, backgroundColor: '#4caf50', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', padding: '10px' }}
              >
                GỬI NHÀ BẾP
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. VÙNG DANH SÁCH THỰC ĐƠN (BÊN PHẢI) */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#f4f5f7' }}>
        {/* Thanh lọc danh mục món */}
        <div style={{ padding: '15px', backgroundColor: '#fff', borderBottom: '1px solid #e1e4e8', display: 'flex', gap: '10px', overflowX: 'auto' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: 'none',
                fontWeight: 'bold',
                fontSize: '13px',
                cursor: 'pointer',
                backgroundColor: activeTab === cat ? '#7c5dfa' : '#eaedf1',
                color: activeTab === cat ? '#fff' : '#555',
                transition: '0.2s'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Lưới món ăn có hình ảnh */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '15px', alignContent: 'start' }}>
          {menuData
            .filter(i => activeTab === "Tất cả" || i.category === activeTab)
            .map(item => (
              <div
                key={item.id}
                onClick={() => addToCart(item)}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  border: '1px solid #e1e4e8',
                  padding: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 5px 10px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.02)';
                }}
              >
                {/* Hình ảnh món */}
                <div style={{ width: '100%', aspectRatio: '1.4/1', borderRadius: '6px', overflow: 'hidden', mb: '8px', backgroundColor: '#f0f0f0' }}>
                  <img 
                    src={item.img || "https://via.placeholder.com/120x90?text=No+Image"} 
                    alt={item.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>
                {/* Chi tiết món */}
                <div style={{ fontWeight: 'bold', fontSize: '13px', color: '#333', marginTop: '8px', height: '34px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                  {item.name}
                </div>
                <div style={{ color: '#7c5dfa', fontWeight: 'bold', fontSize: '13px', marginTop: 'auto', paddingTop: '5px' }}>
                  {item.price?.toLocaleString()}đ
                </div>
              </div>
            ))}
        </div>
      </div>

    </div>
  );
}