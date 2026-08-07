import React from 'react';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-5 bg-[#1E293B] border-b border-slate-800 sticky top-0 z-50">
      <div className="text-blue-500 font-bold text-lg">&lt;/&gt; Kulsum Shaik</div>
      <div className="flex gap-6 text-sm text-gray-300">
        <a href="#home" className="hover:text-blue-500">Home</a>
        <a href="#about" className="hover:text-blue-500">About</a>
        <a href="#skills" className="hover:text-blue-500">Skills</a>
        <a href="#projects" className="hover:text-blue-500">Projects</a>
        <a href="#certificates" className="hover:text-blue-500">Certificates</a>
        <a href="#contact" className="hover:text-blue-500">Contact</a>
      </div>
    </nav>
  );
}