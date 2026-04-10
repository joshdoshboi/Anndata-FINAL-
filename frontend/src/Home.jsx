import React from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf, FaSeedling, FaTractor, FaChartLine, FaRobot, FaArrowRight } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="font-sans text-gray-800">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-4 py-1.5 rounded-full text-emerald-700 font-semibold text-xs tracking-wide uppercase mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Top Notch Agriculture Platform
          </div>
          <h1 className="mx-auto max-w-4xl font-display text-5xl font-extrabold tracking-tight text-slate-900 sm:text-7xl">
            Cultivating The Future <br />
            <span className="relative whitespace-nowrap text-emerald-600">
              <span className="relative">Of Agriculture</span>
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
            Empowering farmers with innovation, sustainability, and smart solutions to grow more efficiently and responsibly—for today and generations to come.
          </p>
          <div className="mt-10 flex justify-center gap-x-6">
            <Link to="/dashboard" className="group inline-flex items-center justify-center rounded-full py-3 px-8 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 transition-all hover:scale-105">
              Get Started <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform"/>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. IMAGE SHOWCASE (The Rice Field) */}
      <section className="relative w-full max-w-7xl mx-auto px-4 mb-24">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl h-96 group">
          <img 
            src="https://images.unsplash.com/photo-1625246333195-098e475c5393?q=80&w=1974&auto=format&fit=crop" 
            alt="Smart Farming" 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-10">
            <h3 className="text-white text-4xl font-bold mb-2">The Journey to Perfection.</h3>
            <p className="text-gray-300">Sustainable methods combined with smart tech.</p>
          </div>
        </div>
        
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 border-b border-gray-100 pb-12">
            {[
                { label: 'Years Experience', value: '35+' },
                { label: 'Fields Connected', value: '260+' },
                { label: 'Farmers Helped', value: '80k+' },
                { label: 'Data Points', value: '16M+' },
            ].map((stat) => (
                <div key={stat.label} className="text-center">
                    <div className="text-3xl font-extrabold text-slate-900">{stat.value}</div>
                    <div className="text-sm font-medium text-slate-500 mt-1">{stat.label}</div>
                </div>
            ))}
        </div>
      </section>

      {/* 3. FEATURES GRID */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Next-Gen Solutions</h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">We deliver advanced solutions to support farmers in boosting crop yields.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<FaLeaf />} 
              title="Farming Precision" 
              desc="Our precision farming employs state-of-the-art technology to optimize every aspect of farm operations."
              img="https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?auto=format&fit=crop&q=80&w=800"
            />
            <FeatureCard 
              icon={<FaChartLine />} 
              title="Crop Surveillance" 
              desc="Track your crops' health and growth in real-time with our innovative solutions."
              img="https://images.unsplash.com/photo-1615811361524-7f32b34a5323?auto=format&fit=crop&q=80&w=800"
            />
            <FeatureCard 
              icon={<FaRobot />} 
              title="Automated Farming" 
              desc="Enhance farm efficiency and productivity with our cutting-edge automation solutions."
              img="https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&q=80&w=800"
            />
          </div>
        </div>
      </section>

      {/* 4. FOOTER */}
      <footer className="bg-white border-t border-gray-200 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white"><FaSeedling /></div>
                <span className="text-xl font-bold text-gray-900">Annadata</span>
            </div>
            <p className="text-gray-500 text-sm">© 2026 Annadata. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
};

// Helper Component for the Feature Cards
const FeatureCard = ({ icon, title, desc, img }) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
    <div className="h-48 overflow-hidden">
        <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
    </div>
    <div className="p-6">
      <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 text-xl mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default Home;