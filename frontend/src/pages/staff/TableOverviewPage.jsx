import React from 'react';
import { tables } from '../data/mockTables';
import { useNavigate } from 'react-router-dom';

const TableOverviewPage = () => {
  const navigate = useNavigate();

  const getStatusStyle = (status) => {
    switch (status) {
      case 'occupied': return 'bg-mint text-white border-mintDark';
      case 'reserved': return 'bg-cream text-gray-700 border-line';
      default: return 'bg-white text-gray-400 border-softGray hover:border-mint';
    }
  };

  return (
    <div className="p-6 bg-softGray min-h-screen">
      <div className="max-w-page mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Sơ đồ bàn phục vụ</h1>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {tables.map((table) => (
            <div
              key={table.id}
              onClick={() => navigate(`/staff/order/${table.id}`)}
              className={`aspect-square flex flex-col items-center justify-center rounded-xl border-2 cursor-pointer transition-all shadow-sm ${getStatusStyle(table.status)}`}
            >
              <span className="text-lg font-bold">{table.name}</span>
              <span className="text-xs">{table.seats} chỗ</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableOverviewPage;