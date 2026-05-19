import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { menuItems, categories } from '../../data/mockMenu';
import Button from '../../components/ui/Button';

const StaffOrderPage = () => {
  const { tableId } = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [activeTab, setActiveTab] = useState("Tất cả");

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? {...i, qty: i.qty + 1} : i);
      return [...prev, {...item, qty: 1}];
    });
  };

  const totalAmount = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar chọn món */}
      <div className="flex-1 flex flex-col border-r border-line">
        <header className="p-4 border-b border-line flex items-center gap-4 bg-white sticky top-0 z-10">
          <Button variant="secondary" onClick={() => navigate('/staff')}>
            <span className="mr-1">←</span> Bàn {tableId}
          </Button>
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-1.5 rounded-full text-sm transition-all whitespace-nowrap ${
                  activeTab === cat ? 'bg-mint text-white' : 'bg-softGray text-gray-600 hover:bg-line'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-softGray/30">
          {menuItems.filter(i => activeTab === "Tất cả" || i.category === activeTab).map(item => (
            <div
              key={item.id}
              onClick={() => addToCart(item)}
              className="bg-white p-3 rounded-xl border border-line hover:border-mint hover:shadow-md cursor-pointer transition-all flex flex-col"
            >
              <div className="aspect-video bg-gray-100 rounded-lg mb-2 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-medium text-sm text-gray-800 line-clamp-2 h-10">{item.name}</h3>
              <p className="text-mint font-bold text-sm mt-auto">{item.price.toLocaleString()}đ</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cột hóa đơn tạm tính (Cart) */}
      <div className="w-[380px] flex flex-col bg-white shadow-xl">
        <div className="p-4 border-b border-line flex justify-between items-center">
          <h3 className="font-bold text-gray-800 uppercase tracking-wider">Đơn hàng</h3>
          <span className="bg-mint/10 text-mint px-2 py-1 rounded text-xs font-bold">BÀN {tableId}</span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 italic text-sm">
              <p>Chưa có món nào</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex justify-between items-start animate-fadeIn">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-700">{item.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button className="w-5 h-5 flex items-center justify-center border border-line rounded text-xs">-</button>
                    <span className="text-xs font-bold">x{item.qty}</span>
                    <button className="w-5 h-5 flex items-center justify-center border border-line rounded text-xs">+</button>
                  </div>
                </div>
                <p className="text-sm font-bold text-gray-900">{(item.price * item.qty).toLocaleString()}đ</p>
              </div>
            ))
          )}
        </div>

        <div className="p-6 bg-cream/30 border-t border-line">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Tạm tính:</span>
              <span>{totalAmount.toLocaleString()}đ</span>
            </div>
            <div className="flex justify-between text-lg font-black text-gray-800 border-t border-line/50 pt-2">
              <span>TỔNG CỘNG:</span>
              <span className="text-mint">{totalAmount.toLocaleString()}đ</span>
            </div>
          </div>
          <Button className="w-full py-4 text-base shadow-lg shadow-mint/20" onClick={() => alert("Đã gửi đơn hàng đến nhà bếp!")}>
            GỬI YÊU CẦU PHỤC VỤ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StaffOrderPage;