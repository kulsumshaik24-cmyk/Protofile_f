import React, { useState } from 'react';

export default function Navbar({ activeTab, setActiveTab }) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <nav className="flex justify-between items-center px-6 md:px-10 py-5 bg-[#0e1322] border-b border-purple-950/50 sticky top-0 z-50">
      <div className="text-purple-400 font-bold text-lg">&lt;/&gt; Kulsum Shaik</div>
      
      {/* Desktop Navigation Links */}
      <div className="hidden md:flex gap-6 text-sm text-gray-300">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => setActiveTab(link.id)}
            className={`hover:text-purple-400 transition uppercase tracking-wider ${activeTab === link.id ? 'text-purple-400 font-bold border-b-2 border-purple-500 pb-1' : ''}`}
          >
            {link.label}
          </button>
        ))}
      </div>

      {/* Mobile Hamburger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-800/40 text-purple-300 flex items-center justify-center text-xl transition focus:outline-none"
        aria-label="Toggle Menu"
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Mobile Dropdown Menu Drawer */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#0e1322] border-b border-purple-900/50 shadow-2xl flex flex-col py-4 px-6 md:hidden z-40">
          {navLinks.map((link) => (
            <button
              key={link.id} 
              onClick={() => {
                setActiveTab(link.id);
                setIsOpen(false);
              }}
              className={`text-left py-3 text-xs uppercase tracking-wider transition ${activeTab === link.id ? 'text-purple-400 font-bold' : 'text-gray-300 hover:text-purple-400'}`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
