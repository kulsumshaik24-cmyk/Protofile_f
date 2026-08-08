import React, { useState } from 'react';

export default function Navbar({ activeTab, setActiveTab }) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <nav className="flex justify-between items-center px-6 md:px-10 py-5 bg-[#0e1322] border-b border-purple-950/50 sticky top-0 z-50">
      
      {/* Brand Logo */}
      <div className="flex items-center gap-2 text-white font-bold text-lg tracking-wide">
        <span className="p-1.5 rounded-xl bg-purple-950/60 border border-purple-800/40 text-purple-400 text-xs">&lt;/&gt;</span> 
        <span>Kusnuth<span className="text-purple-500">.</span></span>
      </div>
      
      {/* Desktop Navigation Links */}
      <div className="hidden md:flex gap-6 text-sm text-gray-300">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => setActiveTab(link.id)}
            className={`hover:text-purple-400 transition uppercase tracking-wider text-xs font-medium ${
              activeTab === link.id ? 'text-purple-400 font-bold border-b-2 border-purple-500 pb-1' : ''
            }`}
          >
            {link.label}
          </button>
        ))}
      </div>

      {/* Mobile Hamburger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden w-10 h-10 rounded-2xl bg-purple-950/60 border border-purple-800/40 text-purple-300 flex items-center justify-center text-lg transition focus:outline-none shadow-md"
        aria-label="Toggle Menu"
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Mobile Dropdown Menu Drawer */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#080b14]/95 backdrop-blur-xl border-b border-purple-900/50 shadow-2xl flex flex-col p-6 md:hidden z-40 gap-3">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id} 
                onClick={() => {
                  setActiveTab(link.id);
                  setIsOpen(false);
                }}
                className={`text-left py-3 px-5 rounded-2xl text-sm font-medium transition ${
                  isActive 
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(147,51,234,0.4)] font-bold' 
                    : 'text-gray-300 hover:bg-purple-950/40 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}
