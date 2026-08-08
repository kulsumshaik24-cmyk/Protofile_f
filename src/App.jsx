import React, { useState } from 'react';
import Navbar from './Navbar';
import Portfolio from './pages/Portfolio'; // Or wherever your portfolio content lives

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="bg-[#080b14] min-h-screen text-slate-200">
      {/* Pass activeTab and setActiveTab to your Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Pass activeTab down to display the correct section */}
      <Portfolio activeTab={activeTab} />
    </div>
  );
}
