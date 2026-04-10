import React, { useState } from 'react';
import { FaSearch, FaFilter, FaExternalLinkAlt, FaRupeeSign, FaTractor, FaLeaf, FaShieldAlt, FaLandmark } from 'react-icons/fa';

const Schemes = () => {
  // Real Database of Indian Govt Schemes
  const schemesData = [
    {
      id: 1,
      name: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
      type: "Financial Assistance",
      agency: "Central Govt",
      description: "Direct income support of ₹6,000 per year to farmer families across the country in three equal installments of ₹2,000 each.",
      eligibility: "Small & Marginal Farmers (Landholding up to 2 Hectares)",
      benefits: "₹6,000 / year direct bank transfer",
      link: "https://pmkisan.gov.in/",
      icon: <FaRupeeSign />,
      color: "emerald"
    },
    {
      id: 2,
      name: "Sub-Mission on Agricultural Mechanization (SMAM)",
      type: "Technology & Drones",
      agency: "Central Govt",
      description: "Subsidy for purchasing modern agricultural machinery, including 'Kisan Drones' for spraying and monitoring.",
      eligibility: "Individual Farmers, FPOs, and SHGs",
      benefits: "40% to 100% subsidy on Drones & Machinery",
      link: "https://agrimachinery.nic.in/",
      icon: <FaTractor />,
      color: "blue"
    },
    {
      id: 3,
      name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
      type: "Insurance",
      agency: "Central Govt",
      description: "Crop insurance scheme that covers yield losses due to non-preventable natural risks (Drought, Flood, Pests).",
      eligibility: "All Farmers (Loanee & Non-Loanee)",
      benefits: "Extremely low premium (1.5% - 2%) for full insurance coverage",
      link: "https://pmfby.gov.in/",
      icon: <FaShieldAlt />,
      color: "orange"
    },
    {
      id: 4,
      name: "Soil Health Card Scheme",
      type: "Soil Health",
      agency: "Central Govt",
      description: "Provides a report card on nutrient status of the soil and recommendations on appropriate dosage of fertilizers.",
      eligibility: "All Farmers across India",
      benefits: "Free Soil Testing & Personalized Fertilizer Recommendations",
      link: "https://soilhealth.dac.gov.in/",
      icon: <FaLeaf />,
      color: "green"
    },
    {
      id: 5,
      name: "Rythu Bandhu Scheme",
      type: "State Scheme",
      agency: "Telangana State",
      description: "Investment support scheme to take care of initial investment needs of every farmer.",
      eligibility: "Land-owning farmers in Telangana",
      benefits: "₹10,000 per acre per year",
      link: "https://rythubandhu.telangana.gov.in/",
      icon: <FaLandmark />,
      color: "purple"
    },
    {
      id: 6,
      name: "National Agriculture Market (e-NAM)",
      type: "Market & Smart Ag",
      agency: "Central Govt",
      description: "Pan-India electronic trading portal which networks existing APMC mandis to create a unified national market.",
      eligibility: "Farmers with valid license/registration",
      benefits: "Better price discovery & transparent auction process",
      link: "https://enam.gov.in/web/",
      icon: <FaLeaf />,
      color: "teal"
    }
  ];

  // Filters State
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterAgency, setFilterAgency] = useState("All");

  // Filtering Logic
  const filteredSchemes = schemesData.filter(scheme => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "All" || scheme.type.includes(filterType);
    const matchesAgency = filterAgency === "All" || (filterAgency === "Central" ? scheme.agency.includes("Central") : scheme.agency.includes(filterAgency));

    return matchesSearch && matchesType && matchesAgency;
  });

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-emerald-900 to-emerald-700 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">Government Schemes & Subsidies</h2>
          <p className="text-emerald-100 max-w-2xl">
            Access financial support, subsidies for drones, and insurance plans tailored for smart agriculture.
          </p>
        </div>
        <FaLandmark className="absolute right-0 bottom-0 text-9xl opacity-10 transform translate-x-4 translate-y-4" />
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
           <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
           <input 
              type="text" 
              placeholder="Search schemes (e.g., 'Drone', 'Loan', 'Insurance')..." 
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
           />
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
            <select 
              className="px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              onChange={(e) => setFilterAgency(e.target.value)}
            >
              <option value="All">All Agencies</option>
              <option value="Central">Central Govt</option>
              <option value="Telangana">State Specific</option>
            </select>

            <select 
              className="px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Financial">Financial Aid</option>
              <option value="Technology">Technology/Drones</option>
              <option value="Insurance">Insurance</option>
              <option value="Soil">Soil Health</option>
            </select>
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchemes.map((scheme) => (
          <div key={scheme.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all hover:-translate-y-1 group">
            <div className="flex justify-between items-start mb-4">
               <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-${scheme.color}-50 text-${scheme.color}-600 group-hover:bg-${scheme.color}-600 group-hover:text-white transition-colors`}>
                 {scheme.icon}
               </div>
               <span className="text-xs font-bold uppercase tracking-wider bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                 {scheme.agency}
               </span>
            </div>
            
            <h3 className="text-lg font-bold text-gray-800 mb-2 leading-tight h-14">{scheme.name}</h3>
            <p className="text-gray-500 text-sm mb-4 line-clamp-3 h-16">{scheme.description}</p>
            
            <div className="space-y-3 mb-6 bg-gray-50 p-4 rounded-xl">
               <div className="flex flex-col">
                  <span className="text-xs font-semibold text-gray-400 uppercase">Benefits</span>
                  <span className="text-sm font-bold text-emerald-700">{scheme.benefits}</span>
               </div>
               <div className="h-px bg-gray-200"></div>
               <div className="flex flex-col">
                  <span className="text-xs font-semibold text-gray-400 uppercase">Eligibility</span>
                  <span className="text-sm font-medium text-gray-700">{scheme.eligibility}</span>
               </div>
            </div>

            <a 
              href={scheme.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-emerald-600 transition-colors"
            >
              Apply Now <FaExternalLinkAlt className="text-xs" />
            </a>
          </div>
        ))}
      </div>
      
      {filteredSchemes.length === 0 && (
          <div className="text-center py-20 text-gray-400">
              <p>No schemes found matching your search.</p>
          </div>
      )}
    </div>
  );
};

export default Schemes;