import React, { useState } from 'react';
import { FaPowerOff, FaTint, FaClock, FaRobot, FaExclamationTriangle } from 'react-icons/fa';
import axios from 'axios';

const Controls = () => {
  // 1. State Variables (The "Memory" of the page)
  const [isAutoMode, setIsAutoMode] = useState(true);
  const [isPumpOn, setIsPumpOn] = useState(false);
  const [threshold, setThreshold] = useState(35);

  // 2. Function to Handle Pump Click
  const togglePump = () => {
    if (isAutoMode) {
      alert("Please disable Automatic Mode first to control the pump manually!");
      return;
    }
    const newState = !isPumpOn;
    setIsPumpOn(newState);
    
    // Send command to Python Backend (Optional - can be added later)
    // axios.post('http://127.0.0.1:5000/control_pump', { status: newState ? 'ON' : 'OFF' });
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-bold text-gray-800">System Controls</h2>
        <p className="text-gray-500">Manage irrigation and system parameters.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* --- LEFT CARD: Irrigation Control --- */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200/50 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-8">
             <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaTint className="text-blue-500"/> Irrigation Control
             </h3>
             {/* Auto Mode Toggle */}
             <div 
               className={`flex items-center gap-3 px-4 py-2 rounded-full cursor-pointer transition-colors ${isAutoMode ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}
               onClick={() => setIsAutoMode(!isAutoMode)}
             >
                <span className="text-sm font-bold">{isAutoMode ? 'Automatic Mode' : 'Manual Mode'}</span>
                <div className={`w-10 h-5 rounded-full relative transition-colors ${isAutoMode ? 'bg-emerald-500' : 'bg-gray-300'}`}>
                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all shadow-sm ${isAutoMode ? 'left-6' : 'left-1'}`}></div>
                </div>
             </div>
          </div>

          {/* THE BIG PUMP BUTTON */}
          <button 
            onClick={togglePump}
            className={`w-full py-12 rounded-2xl flex flex-col items-center justify-center gap-4 transition-all shadow-xl active:scale-95 ${
              isPumpOn 
                ? 'bg-emerald-500 shadow-emerald-200/50 hover:bg-emerald-600' 
                : 'bg-gray-800 shadow-gray-200/50 hover:bg-gray-700'
            }`}
          >
            <FaPowerOff className={`text-6xl ${isPumpOn ? 'text-white' : 'text-gray-400'}`} />
            <span className={`text-2xl font-bold ${isPumpOn ? 'text-white' : 'text-gray-400'}`}>
              {isPumpOn ? 'PUMP IS ON' : 'PUMP IS OFF'}
            </span>
          </button>
          
          <div className="mt-6 text-center">
            {isAutoMode && (
                <div className="inline-flex items-center gap-2 text-amber-600 bg-amber-50 px-4 py-2 rounded-lg text-sm font-medium border border-amber-100">
                    <FaRobot /> AI is currently controlling the pump
                </div>
            )}
             {!isAutoMode && (
                <div className="inline-flex items-center gap-2 text-gray-400 bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium border border-gray-100">
                    <FaExclamationTriangle /> Manual Control Enabled
                </div>
            )}
          </div>
        </div>

        {/* --- RIGHT CARD: System Settings --- */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200/50">
             <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-8">
                <FaClock className="text-orange-500"/> System Settings
             </h3>

             {/* Slider 1: Moisture Threshold */}
             <div className="mb-10">
                <div className="flex justify-between mb-4">
                    <label className="font-semibold text-gray-700">Moisture Threshold</label>
                    <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">{threshold}%</span>
                </div>
                <input 
                    type="range" 
                    min="0" max="100" 
                    value={threshold} 
                    onChange={(e) => setThreshold(e.target.value)}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <p className="text-xs text-gray-400 mt-2">Pump turns on automatically if moisture drops below this value.</p>
             </div>

             {/* Input 2: Update Frequency */}
             <div className="mb-8">
                <label className="block font-semibold text-gray-700 mb-3">Data Update Frequency</label>
                <select className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    <option>Real-time (Every 2 seconds)</option>
                    <option>Battery Saver (Every 1 minute)</option>
                    <option>Log Only (Every 10 minutes)</option>
                </select>
             </div>

              {/* Decorative Image/Box */}
             <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl p-6 border border-emerald-100/50 flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm">💧</div>
                <div>
                    <h4 className="font-bold text-gray-800">Water Conservation</h4>
                    <p className="text-xs text-gray-500">AI mode saves approx 40% water.</p>
                </div>
             </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;