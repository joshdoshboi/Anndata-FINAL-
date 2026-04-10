import React, { useState } from 'react';
import { FaSearch, FaDownload, FaFilter, FaTerminal } from 'react-icons/fa';

const Logs = () => {
  // Mock Log Data
  const [logs] = useState([
    { id: 1024, type: 'System', event: 'Connection established with ESP32 Device', time: '2026-02-02 10:00:01 AM', status: 'Success' },
    { id: 1023, type: 'Sensor', event: 'Soil Moisture reading dropped below 30%', time: '2026-02-02 09:45:12 AM', status: 'Warning' },
    { id: 1022, type: 'Action', event: 'Automated Irrigation Cycle Started (Pump ON)', time: '2026-02-02 09:45:15 AM', status: 'Success' },
    { id: 1021, type: 'Action', event: 'Automated Irrigation Cycle Ended (Pump OFF)', time: '2026-02-02 09:50:00 AM', status: 'Success' },
    { id: 1020, type: 'User', event: 'Manual override: Pump disabled by Admin', time: '2026-02-01 06:30:22 PM', status: 'Info' },
    { id: 1019, type: 'Error', event: 'Failed to sync with Cloud Database (Timeout)', time: '2026-02-01 04:12:00 PM', status: 'Failed' },
    { id: 1018, type: 'System', event: 'System Boot Sequence Initiated', time: '2026-02-01 08:00:00 AM', status: 'Success' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  // Filter logic
  const filteredLogs = logs.filter(log => 
    log.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
           <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
             <FaTerminal className="text-gray-600 text-2xl"/> System Logs
           </h2>
           <p className="text-gray-500 mt-2">Detailed chronological record of system events.</p>
        </div>
        
        <div className="flex gap-3">
             <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 font-medium transition-colors">
                <FaDownload /> Export CSV
             </button>
             <button className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 font-medium transition-colors">
                <FaFilter /> Filter
             </button>
        </div>
      </header>

      {/* Search Bar */}
      <div className="relative">
         <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
         <input 
            type="text" 
            placeholder="Search logs by event or type..." 
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
         />
      </div>

      {/* The Data Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
         <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-bold tracking-wider">
                        <th className="p-6">ID</th>
                        <th className="p-6">Type</th>
                        <th className="p-6">Event Description</th>
                        <th className="p-6">Timestamp</th>
                        <th className="p-6">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {filteredLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-gray-50/50 transition-colors group">
                            <td className="p-6 font-mono text-gray-400 text-sm">#{log.id}</td>
                            <td className="p-6">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                                    log.type === 'Error' ? 'bg-red-50 text-red-600 border-red-100' :
                                    log.type === 'System' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                                    log.type === 'Action' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                    'bg-gray-100 text-gray-600 border-gray-200'
                                }`}>
                                    {log.type}
                                </span>
                            </td>
                            <td className="p-6 text-gray-800 font-medium">{log.event}</td>
                            <td className="p-6 text-gray-500 text-sm">{log.time}</td>
                            <td className="p-6">
                                <span className={`flex items-center gap-2 text-sm font-semibold ${
                                    log.status === 'Success' ? 'text-emerald-600' :
                                    log.status === 'Failed' ? 'text-red-600' :
                                    log.status === 'Warning' ? 'text-amber-600' :
                                    'text-blue-600'
                                }`}>
                                    <span className={`w-2 h-2 rounded-full ${
                                        log.status === 'Success' ? 'bg-emerald-500' :
                                        log.status === 'Failed' ? 'bg-red-500' :
                                        log.status === 'Warning' ? 'bg-amber-500' :
                                        'bg-blue-500'
                                    }`}></span>
                                    {log.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
             </table>
             {filteredLogs.length === 0 && (
                 <div className="p-10 text-center text-gray-400">No logs found matching "{searchTerm}"</div>
             )}
         </div>
      </div>
    </div>
  );
};

export default Logs;