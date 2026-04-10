import React, { useState } from 'react';
import { FaExclamationTriangle, FaInfoCircle, FaCheckCircle, FaBell, FaTrash } from 'react-icons/fa';

const Alerts = () => {
  // Mock Alert Data
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'critical', message: 'Critical Soil Moisture Level (12%) - Pump Activated Emergency Mode', time: '10 min ago' },
    { id: 2, type: 'warning', message: 'Temperature exceeding optimal range for Rice (34°C)', time: '2 hours ago' },
    { id: 3, type: 'info', message: 'System firmware updated to v2.4.0 successfully.', time: '5 hours ago' },
    { id: 4, type: 'success', message: 'Scheduled irrigation completed. Water usage: 12 Liters.', time: 'Yesterday' },
  ]);

  const clearAlerts = () => {
    if (window.confirm("Are you sure you want to clear all notifications?")) {
      setAlerts([]);
    }
  };

  // Helper to get styles based on alert type
  const getAlertStyle = (type) => {
    switch(type) {
      case 'critical': return 'bg-red-50 border-red-100 text-red-800 icon-red-500';
      case 'warning': return 'bg-amber-50 border-amber-100 text-amber-800 icon-amber-500';
      case 'success': return 'bg-emerald-50 border-emerald-100 text-emerald-800 icon-emerald-500';
      default: return 'bg-blue-50 border-blue-100 text-blue-800 icon-blue-500';
    }
  };

  const getIcon = (type) => {
    switch(type) {
      case 'critical': return <FaExclamationTriangle className="text-red-500 text-xl" />;
      case 'warning': return <FaExclamationTriangle className="text-amber-500 text-xl" />;
      case 'success': return <FaCheckCircle className="text-emerald-500 text-xl" />;
      default: return <FaInfoCircle className="text-blue-500 text-xl" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <header className="flex justify-between items-end mb-8">
        <div>
           <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
             System Alerts
             {alerts.length > 0 && <span className="text-sm bg-red-500 text-white px-3 py-1 rounded-full text-xs align-middle">{alerts.length} New</span>}
           </h2>
           <p className="text-gray-500 mt-2">Notifications and system warnings.</p>
        </div>
        
        {alerts.length > 0 && (
            <button 
                onClick={clearAlerts}
                className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors font-medium text-sm"
            >
                <FaTrash /> Clear History
            </button>
        )}
      </header>

      <div className="space-y-4">
        {alerts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                <FaBell className="mx-auto text-4xl text-gray-200 mb-4" />
                <p className="text-gray-400">No new notifications.</p>
            </div>
        ) : (
            alerts.map((alert) => (
                <div key={alert.id} className={`p-6 rounded-2xl border flex items-start gap-4 transition-all hover:shadow-md ${getAlertStyle(alert.type).split(' ')[0]} ${getAlertStyle(alert.type).split(' ')[1]}`}>
                    <div className="mt-1 bg-white p-2 rounded-full shadow-sm">
                        {getIcon(alert.type)}
                    </div>
                    <div className="flex-1">
                        <h4 className={`font-bold text-lg mb-1 ${getAlertStyle(alert.type).split(' ')[2]}`}>
                            {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)} Alert
                        </h4>
                        <p className="text-gray-600 leading-relaxed">{alert.message}</p>
                    </div>
                    <span className="text-xs font-semibold text-gray-400 whitespace-nowrap bg-white/60 px-3 py-1 rounded-lg">
                        {alert.time}
                    </span>
                </div>
            ))
        )}
      </div>
    </div>
  );
};

export default Alerts;