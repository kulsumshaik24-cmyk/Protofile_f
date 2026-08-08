import React, { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' }, // Added Experience link
    { href: '#certificates', label: 'Certificates' },
    { href: '#contact', label: 'Contact' }
  ];

  return (
    <nav className="flex justify-between items-center px-6 md:px-10 py-5 bg-[#1E293B] border-b border-slate-800 sticky top-0 z-50">
      <div className="text-blue-500 font-bold text-lg">&lt;/&gt; Kulsum Shaik</div>
      
      {/* Desktop Navigation Links */}
      <div className="hidden md:flex gap-6 text-sm text-gray-300">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} className="hover:text-blue-500 transition">
            {link.label}
          </a>
        ))}
      </div>

      {/* Mobile Hamburger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-gray-300 hover:text-white focus:outline-none text-2xl"
        aria-label="Toggle Menu"
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Mobile Dropdown Menu Drawer */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#1E293B] border-b border-slate-800 shadow-2xl flex flex-col py-4 px-6 md:hidden">
          {navLinks.map((link) => (
            <a 
              key={link.href} 
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className="py-3 text-sm text-gray-300 hover:text-blue-500 border-b border-slate-800/60 last:border-none transition"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
