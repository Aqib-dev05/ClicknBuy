import React from "react";
import { Package, Users, ShoppingCart, DollarSign } from "lucide-react";

function Reports() {
  const stats = [
    { title: "Total Revenue", value: "Rs. 45,230", icon: DollarSign, bgColor: "bg-green-100", textColor: "text-green-600" },
    { title: "Total Orders", value: "128", icon: ShoppingCart, bgColor: "bg-blue-100", textColor: "text-blue-600" },
    { title: "Products", value: "86", icon: Package, bgColor: "bg-purple-100", textColor: "text-purple-600" },
    { title: "Active Users", value: "34", icon: Users, bgColor: "bg-orange-100", textColor: "text-orange-600" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Reports & Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex items-center gap-4">
              <div className={`p-4 rounded-lg flex-shrink-0 ${s.bgColor} ${s.textColor}`}>
                <Icon size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{s.title}</p>
                <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm min-h-[300px] flex items-center justify-center">
        <p className="text-gray-500 italic">Advanced analytics charts and graphs will appear here.</p>
      </div>
    </div>
  );
}

export default Reports;
