import Schemes from './Schemes'; // <--- Add this line
import Logs from './Logs';
import Alerts from './Alerts';
import Analytics from './Analytics';
import Controls from './Controls';
import Home from './Home';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FaHome, FaThLarge, FaChartLine, FaSlidersH, FaBell, FaClipboardList, FaLeaf, FaLandmark } from 'react-icons/fa';
import Chart from 'react-apexcharts';

// --- 1. The Sidebar Component ---
const SidebarItem = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link to={to} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${isActive ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200/20' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
      <div className="text-xl">{icon}</div>
      <span>{label}</span>
    </Link>
  );
};

const Layout = ({ children, connectionStatus }) => {
  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <aside className="w-64 bg-gray-900 text-white p-6 flex flex-col fixed h-full z-50">
        <div className="flex items-center gap-3 mb-10 px-2">
           <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-emerald-500/20"><FaLeaf /></div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Annadata</h1>
            <p className="text-xs text-gray-400 opacity-70">Admin Panel</p>
          </div>
        </div>
        <nav className="space-y-2 flex-1">
          <SidebarItem to="/" icon={<FaHome />} label="Home" />
          <SidebarItem to="/dashboard" icon={<FaThLarge />} label="Dashboard" />
          <SidebarItem to="/analytics" icon={<FaChartLine />} label="Analytics" />
          <SidebarItem to="/controls" icon={<FaSlidersH />} label="Controls" />
          <SidebarItem to="/schemes" icon={<FaLandmark />} label="Schemes" />
          <div className="pt-6 pb-2">
             <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">System</p>
             <SidebarItem to="/alerts" icon={<FaBell />} label="Alerts" />
             <SidebarItem to="/logs" icon={<FaClipboardList />} label="Logs" />
          </div>
        </nav>
        <div className={`px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2 ${connectionStatus ? 'bg-emerald-900/50 text-emerald-400' : 'bg-red-900/50 text-red-400'}`}>
            <div className={`w-2 h-2 rounded-full ${connectionStatus ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`}></div>
            {connectionStatus ? 'System Online' : 'Offline'}
        </div>
      </aside>
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

// --- 2. Page Placeholders ---
const PlaceholderPage = ({ title }) => (
  <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-200/50 min-h-[50vh] flex flex-col items-center justify-center text-center">
    <div className="text-6xl text-gray-200 mb-4"><FaLeaf /></div>
    <h2 className="text-3xl font-bold text-gray-800 mb-2">{title}</h2>
    <p className="text-gray-500 max-w-md">This module is part of the extended Annadata system showcase.</p>
  </div>
);

// --- 3. The Dashboard Page ---
const Dashboard = ({ data }) => {
  const chartOptions = {
    chart: { type: 'area', toolbar: { show: false }, sparkline: { enabled: true } },
    stroke: { curve: 'smooth', width: 2 },
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.2, stops: [0, 90, 100] } },
    tooltip: { fixed: { enabled: false }, x: { show: false }, y: { title: { formatter: () => '' } }, marker: { show: false } }
  };

  const MetricCard = ({ title, value, unit, icon, color, chartData }) => {
      const colorClasses = {
          emerald: 'text-emerald-600 bg-emerald-50',
          blue: 'text-blue-600 bg-blue-50',
          orange: 'text-orange-600 bg-orange-50',
          yellow: 'text-yellow-600 bg-yellow-50'
      }
      const gradientColors = {
          emerald: ['#10B981'], blue: ['#3B82F6'], orange: ['#F97316'], yellow: ['#EAB308']
      }

    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200/50 hover:shadow-md transition-shadow relative overflow-hidden h-40">
        <div className="flex justify-between items-start mb-4 relative z-10">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
            <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-gray-800">{value}</span>
                <span className="text-sm font-medium text-gray-500">{unit}</span>
            </div>
          </div>
          <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
             <span className="text-xl">{icon}</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 opacity-50">
             <Chart options={{...chartOptions, colors: gradientColors[color]}} series={[{ data: chartData || [10,15,12,20,18,25,22] }]} type="area" height="100%" width="100%" />
        </div>
      </div>
    );
  };

  return (
    <div>
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Overview</h2>
        <p className="text-gray-500">Real-time farm monitoring summary.</p>
      </header>

      <div className="bg-gradient-to-br from-emerald-800 to-emerald-600 rounded-3xl p-8 text-white shadow-xl shadow-emerald-200/40 mb-8 relative overflow-hidden">
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
                <h3 className="text-emerald-100 font-medium mb-2">AI-Powered Recommendation</h3>
                <div className="text-5xl font-extrabold mb-2 tracking-tight">{data.prediction}</div>
                <div className="inline-flex items-center gap-2 bg-emerald-900/30 px-4 py-2 rounded-lg backdrop-blur-md border border-emerald-500/30 text-sm font-medium">
                    <FaLeaf className="text-emerald-300" />
                    Confidence Score: <span className="text-emerald-300">{data.confidence}%</span>
                </div>
            </div>
            <div className="flex gap-3">
                {[['N', data.nitrogen, 'bg-emerald-500/20'], ['P', data.phosphorus, 'bg-orange-500/20'], ['K', data.potassium, 'bg-yellow-500/20']].map(([label, val, bg]) => (
                     <div key={label} className={`${bg} backdrop-blur-md rounded-2xl p-4 text-center border border-white/10 w-20`}>
                        <div className="text-xs opacity-80 mb-1 font-bold">{label}</div>
                        <div className="text-xl font-bold">{val}</div>
                    </div>
                ))}
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard title="Soil Moisture" value={data.moisture} unit="%" icon={<FaLeaf />} color="emerald" chartData={[45,48,50,52,50,data.moisture]} />
        <MetricCard title="Temperature" value={data.temperature} unit="°C" icon={<FaChartLine />} color="orange" chartData={[28,29,30,31,30,data.temperature]} />
        <MetricCard title="Humidity" value={data.humidity} unit="%" icon={<FaChartLine />} color="blue" chartData={[55,52,50,48,50,data.humidity]}/>
        <MetricCard title="pH Level (Sim)" value="6.5" unit="" icon={<FaSlidersH />} color="yellow" chartData={[6.2,6.3,6.4,6.5,6.5,6.5]}/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-gray-200/50">
             <h3 className="text-lg font-bold text-gray-800 mb-6">Nutrient Analysis (NPK)</h3>
            <div className="space-y-6">
                {[
                    { label: 'Nitrogen (N)', value: data.nitrogen, color: 'bg-emerald-500' },
                    { label: 'Phosphorus (P)', value: data.phosphorus, color: 'bg-orange-500' },
                    { label: 'Potassium (K)', value: data.potassium, color: 'bg-yellow-500' }
                ].map((item) => (
                    <div key={item.label}>
                        <div className="flex justify-between text-sm font-medium text-gray-600 mb-2">
                            <span>{item.label}</span><span>{item.value} ppm</span>
                        </div>
                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                            <div className={`h-full ${item.color} transition-all duration-1000 ease-out`} style={{ width: `${item.value}%` }}></div>
                        </div>
                    </div>
                ))}
            </div>
         </div>

         <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200/50 flex flex-col">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Quick Controls</h3>
            <div className="flex-1 flex flex-col justify-center gap-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-200">
                    <span className="font-medium text-gray-700">Water Pump</span>
                    <div className="w-12 h-6 bg-gray-300 rounded-full relative cursor-not-allowed">
                        <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1 shadow-sm"></div>
                    </div>
                </div>
                 <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-200 opacity-60">
                    <span className="font-medium text-gray-700">Auto-Irrigation</span>
                    <span className="text-sm font-bold text-emerald-600">ACTIVE</span>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
};

// --- 4. The Main App Component ---
function App() {
  const [data, setData] = useState({
    temperature: 0, humidity: 0, moisture: 0,
    prediction: "Loading...", confidence: 0,
    nitrogen: 50, phosphorus: 30, potassium: 20
  });
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/get_dashboard_data');
      setData(response.data);
      setIsConnected(true);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsConnected(false);
    }
  };

  return (
    <Router>
      <Layout connectionStatus={isConnected}>
        <Routes>
         <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard data={data} />} />
          <Route path="/analytics" element={<Analytics />} />
         <Route path="/controls" element={<Controls />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/schemes" element={<Schemes />} />
          
        </Routes>
      </Layout>
    </Router>
  );
}


export default App;