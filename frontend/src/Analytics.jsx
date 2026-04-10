import React from 'react';
import { FaLeaf, FaHistory, FaThermometerHalf, FaTint } from 'react-icons/fa';

const Analytics = () => {
  // Mock Data for the Showcase (Since we don't have a real database yet)
  const historyData = [
    { time: "2:35:04 PM", moisture: "92.0%", temp: "26.3°C" },
    { time: "2:35:01 PM", moisture: "90.3%", temp: "26.4°C" },
    { time: "2:34:58 PM", moisture: "92.4%", temp: "27.1°C" },
    { time: "2:34:55 PM", moisture: "93.1%", temp: "27.3°C" },
    { time: "2:34:52 PM", moisture: "94.1%", temp: "26.9°C" },
    { time: "2:34:49 PM", moisture: "93.8%", temp: "26.8°C" },
  ];

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Analytics</h2>
        <p className="text-gray-500">Deep dive into your soil health and historical trends.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* --- LEFT CARD: NPK Analysis --- */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200/50 h-full relative overflow-hidden">
          <div className="flex justify-between items-center mb-10 relative z-10">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <FaLeaf className="text-emerald-500"/> Soil Nutrients (NPK)
            </h3>
            {/* Decorative leaf watermark */}
            <div className="absolute top-0 right-0 text-9xl text-gray-100 opacity-50 pointer-events-none -mr-8 -mt-8">
                <FaLeaf />
            </div>
          </div>

          <div className="space-y-8 relative z-10">
            {/* Nitrogen */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-gray-700">Nitrogen (N)</span>
                <span className="font-bold text-emerald-600">104.1 ppm</span>
              </div>
              <div className="h-4 bg-emerald-50 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[75%] rounded-full shadow-lg shadow-emerald-200"></div>
              </div>
            </div>

            {/* Phosphorus */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-gray-700">Phosphorus (P)</span>
                <span className="font-bold text-orange-600">21.0 ppm</span>
              </div>
              <div className="h-4 bg-orange-50 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 w-[25%] rounded-full shadow-lg shadow-orange-200"></div>
              </div>
            </div>

            {/* Potassium */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-gray-700">Potassium (K)</span>
                <span className="font-bold text-yellow-600">54.0 ppm</span>
              </div>
              <div className="h-4 bg-yellow-50 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500 w-[55%] rounded-full shadow-lg shadow-yellow-200"></div>
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT CARD: Recent History --- */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200/50 h-full">
           <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-6">
              <FaHistory className="text-gray-500"/> Recent History
           </h3>

           <div className="space-y-3">
             {historyData.map((item, index) => (
               <div key={index} className="flex justify-between items-center p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 hover:bg-emerald-50 transition-colors">
                  <span className="text-sm font-bold text-emerald-800 font-mono">{item.time}</span>
                  <div className="flex gap-6 text-sm text-gray-600">
                     <span className="flex items-center gap-1"><FaTint className="text-blue-400"/> {item.moisture}</span>
                     <span className="flex items-center gap-1"><FaThermometerHalf className="text-orange-400"/> {item.temp}</span>
                  </div>
               </div>
             ))}
           </div>
        </div>

      </div>
    </div>
  );
};

export default Analytics;