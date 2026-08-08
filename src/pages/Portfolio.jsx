import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  
  const [certificates, setCertificates] = useState([
    { 
      id: 1, 
      title: 'Google Developer Hackathon Certificate', 
      category: 'Hackathon & Leadership', 
      desc: 'Certificate of participation and leadership in the Google hackathon event.', 
      fileUrl: 'https://drive.google.com/file/d/15UFyBj9m3XlYhA1hGxWRRqiPCTm62RSF/view?usp=sharing' 
    },
    { 
      id: 2, 
      title: 'Purplane Certificate', 
      category: 'Workshop & Tech', 
      desc: 'Professional participation and completion certificate from Purplane.', 
      fileUrl: 'https://drive.google.com/file/d/1V8OV4Pp0R-wAUU7oTodKYnd34o9JBvoY/view?usp=sharing' 
    },
    { 
      id: 3, 
      title: 'Internship Completion Certificate', 
      category: 'Internship', 
      desc: 'Hands-on practical experience and project development internship completion.', 
      fileUrl: 'https://drive.google.com/file/d/1r3U4XoOPtGy1KSuE_OT2ZyfCthUicP-Y/view?usp=sharing' 
    },
    { 
      id: 4, 
      title: 'Cambridge English Spoken Skills Certificate', 
      category: 'Communication', 
      desc: 'Professional English communication and interpersonal skills verification.', 
      fileUrl: '#' 
    },
    { 
      id: 5, 
      title: 'AWS Workshop Certificate', 
      category: 'Cloud & Tech', 
      desc: 'Cloud computing fundamentals and architecture deployment.', 
      fileUrl: '#' 
    }
  ]);

  const [activeTab, setActiveTab] = useState('home');
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newFileUrl, setNewFileUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);

  // Contact form state
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [contactStatus, setContactStatus] = useState('');

  const liveSiteUrl = 'https://protofile-f-five.vercel.app';

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://protofile-x2ie.onrender.com';
    
    axios.get(`${API_BASE_URL}/api/projects`)
      .then(res => {
        const uniqueProjects = Array.from(
          new Map(res.data.map(proj => [proj.title, proj])).values()
        );
        setProjects(uniqueProjects);
      })
      .catch(err => console.log(err));
  };

  const handleCertificateAdd = (e) => {
    e.preventDefault();
    if (!newTitle) return;

    const newCert = {
      id: Date.now(),
      title: newTitle,
      category: newCategory || 'General',
      desc: newDesc || 'Newly added professional certificate.',
      fileUrl: newFileUrl || '#'
    };

    setCertificates([newCert, ...certificates]);
    setNewTitle('');
    setNewCategory('');
    setNewDesc('');
    setNewFileUrl('');
    setIsUploading(false);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactStatus('Message sent successfully!');
    setContactForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setContactStatus(''), 5000);
  };

  return (
    <div className="bg-[#080b14] min-h-screen text-slate-200 font-sans selection:bg-purple-600 selection:text-white pb-28 relative overflow-x-hidden">
      
      {/* Background Ambient Glow Effects */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Top Navbar */}
      <nav className="flex justify-between items-center px-6 md:px-10 py-5 bg-[#0e1322]/85 backdrop-blur-md border-b border-purple-950/50 sticky top-0 z-50 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-2.5 font-bold text-base text-white">
          <span className="bg-purple-600/30 border border-purple-500/50 px-2 py-1 rounded-lg text-purple-300 text-xs shadow-[0_0_10px_rgba(147,51,234,0.3)]">&lt;/&gt;</span> MyPortfolio
        </div>
        <div className="hidden md:flex gap-6 text-xs text-slate-400 font-medium cursor-pointer">
          <span onClick={() => setActiveTab('home')} className={`hover:text-purple-400 transition uppercase tracking-wider ${activeTab === 'home' ? 'text-purple-400 font-bold border-b-2 border-purple-500 pb-1' : ''}`}>HOME</span>
          <span onClick={() => setActiveTab('about')} className={`hover:text-purple-400 transition uppercase tracking-wider ${activeTab === 'about' ? 'text-purple-400 font-bold border-b-2 border-purple-500 pb-1' : ''}`}>ABOUT</span>
          <span onClick={() => setActiveTab('education')} className={`hover:text-purple-400 transition uppercase tracking-wider ${activeTab === 'education' ? 'text-purple-400 font-bold border-b-2 border-purple-500 pb-1' : ''}`}>EDUCATION</span>
          <span onClick={() => setActiveTab('skills')} className={`hover:text-purple-400 transition uppercase tracking-wider ${activeTab === 'skills' ? 'text-purple-400 font-bold border-b-2 border-purple-500 pb-1' : ''}`}>SKILLS</span>
          <span onClick={() => setActiveTab('projects')} className={`hover:text-purple-400 transition uppercase tracking-wider ${activeTab === 'projects' ? 'text-purple-400 font-bold border-b-2 border-purple-500 pb-1' : ''}`}>PROJECTS</span>
          <span onClick={() => setActiveTab('experience')} className={`hover:text-purple-400 transition uppercase tracking-wider ${activeTab === 'experience' ? 'text-purple-400 font-bold border-b-2 border-purple-500 pb-1' : ''}`}>EXPERIENCE</span>
          <span onClick={() => setActiveTab('certificates')} className={`hover:text-purple-400 transition uppercase tracking-wider ${activeTab === 'certificates' ? 'text-purple-400 font-bold border-b-2 border-purple-500 pb-1' : ''}`}>CERTIFICATES</span>
          <span onClick={() => setActiveTab('contact')} className={`hover:text-purple-400 transition uppercase tracking-wider ${activeTab === 'contact' ? 'text-purple-400 font-bold border-b-2 border-purple-500 pb-1' : ''}`}>CONTACT</span>
        </div>
        <button 
          onClick={() => setShowQRModal(true)}
          className="bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/50 text-purple-300 text-xs px-3.5 py-2 rounded-xl font-medium transition flex items-center gap-2 shadow-sm"
        >
          <span>📱</span> Open on Phone
        </button>
      </nav>

      {/* Mobile QR Code Modal Popup */}
      {showQRModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0e1322] border border-purple-500/50 rounded-3xl p-6 md:p-8 max-w-sm w-full text-center relative shadow-[0_0_50px_rgba(147,51,234,0.3)] animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setShowQRModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-purple-950/60 border border-purple-800/40 text-purple-300 flex items-center justify-center hover:bg-purple-900 transition"
            >
              ✕
            </button>
            <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center mx-auto text-xl mb-3">
              📱
            </div>
            <h3 className="text-lg font-extrabold text-white">Open on Your Phone</h3>
            <p className="text-xs text-slate-400 mt-1 mb-5">
              Scan this QR code with your mobile camera to instantly open your live portfolio.
            </p>

            <div className="bg-white p-4 rounded-2xl inline-block shadow-inner mb-5">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(liveSiteUrl)}`} 
                alt="Portfolio QR Code" 
                className="w-44 h-44 mx-auto rounded-lg"
              />
            </div>

            <div className="bg-[#131b2e] border border-purple-950 p-2.5 rounded-xl text-[11px] text-purple-300 truncate select-all mb-4">
              {liveSiteUrl}
            </div>

            <a 
              href={liveSiteUrl} 
              target="_blank" 
              rel="noreferrer"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white text-xs font-bold py-3 rounded-xl transition block shadow-md"
            >
              Open Live Link in New Tab ↗
            </a>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-[1400px] mx-auto px-6 pt-10 flex flex-col gap-10 relative z-10">

        {/* HOME VIEW */}
        {activeTab === 'home' && (
          <div className="space-y-8">
            <div className="bg-[#0e1322]/90 backdrop-blur-xl border border-purple-900/40 rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-[0_0_40px_rgba(147,51,234,0.1)] gap-10">
              
              <div className="max-w-xl relative z-10">
                <p className="text-purple-400 font-medium text-sm tracking-wide">Hi, I'm</p>
                <h1 className="text-4xl md:text-6xl font-extrabold text-white mt-1 tracking-tight">Shaik Kulsum</h1>
                <h2 className="text-lg md:text-xl text-purple-300 font-medium mt-1">Next-Gen Developer | AI & Intelligent Systems</h2>
                
                <p className="text-slate-400 text-sm mt-4 leading-relaxed">
                  I'm a third-year B.Tech student specializing in Artificial Intelligence & Machine Learning at SASI Institute of Technology and Engineering, passionate about building intelligent, user-focused web applications and AI-powered solutions.
                </p>

                <div className="mt-5 flex flex-col gap-1.5 text-xs text-purple-300 font-medium">
                  <p>📍 <strong className="text-slate-300">Location:</strong> Nidadavolue, Andhra Pradesh</p>
                  <p>📞 <strong className="text-slate-300">Phone:</strong> +91 9014167179</p>
                  <p>📧 <strong className="text-slate-300">Email:</strong> <a href="mailto:badi.kulsum06@gmail.com" className="text-purple-300 hover:underline">badi.kulsum06@gmail.com</a></p>
                  <p>🚀 <strong className="text-slate-300">Currently Exploring:</strong> Full-Stack Development, Artificial Intelligence, and Machine Learning</p>
                </div>

                {/* Social Media Logos Section with Colorful Official Logos */}
                <div className="flex items-center gap-4 mt-6">
                  <a 
                    href="https://github.com/kulsumshaik24-cmyk" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="w-10 h-10 rounded-xl bg-[#131b2e] border border-purple-500/30 hover:border-purple-400 flex items-center justify-center p-2.5 transition-all duration-300 hover:scale-110 shadow-md group"
                    title="GitHub Profile"
                  >
                    <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg" alt="GitHub" className="w-full h-full filter invert group-hover:scale-105" />
                  </a>

                  <a 
                    href="https://www.linkedin.com/in/kulsum-shaik-a19276345/" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="w-10 h-10 rounded-xl bg-[#131b2e] border border-purple-500/30 hover:border-purple-400 flex items-center justify-center p-2.5 transition-all duration-300 hover:scale-110 shadow-md group"
                    title="LinkedIn Profile"
                  >
                    <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg" alt="LinkedIn" className="w-full h-full" style={{ filter: 'none' }} />
                  </a>

                  <a 
                    href="https://www.codechef.com/users/bask_moles_15" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="w-10 h-10 rounded-xl bg-[#131b2e] border border-purple-500/30 hover:border-purple-400 flex items-center justify-center p-2.5 transition-all duration-300 hover:scale-110 shadow-md group"
                    title="CodeChef Profile"
                  >
                    <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/codechef.svg" alt="CodeChef" className="w-full h-full" style={{ filter: 'none' }} />
                  </a>
                </div>

                <div className="flex gap-4 mt-8 flex-wrap">
                  <button onClick={() => setActiveTab('projects')} className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-6 py-3 rounded-full text-sm font-medium transition shadow-[0_0_20px_rgba(147,51,234,0.4)] flex items-center gap-2">View My Work ➔</button>
                  <button onClick={() => setShowQRModal(true)} className="bg-[#131b2e] border border-purple-500/40 hover:bg-purple-950/50 text-purple-300 px-5 py-3 rounded-full text-sm font-medium transition flex items-center gap-2">📱 Scan for Phone</button>
                </div>
              </div>
              
              {/* Profile Image Container with Interactive Floating Badges */}
              <div className="relative flex items-center justify-center p-6 z-10">
                <div className="absolute w-72 h-72 rounded-full border border-purple-500/20 animate-ping duration-1000"></div>
                <div className="absolute w-80 h-80 rounded-full border border-indigo-500/10"></div>
                
                <div className="relative w-64 h-64 rounded-full p-1 bg-gradient-to-b from-purple-500 via-indigo-600 to-pink-500 shadow-[0_0_30px_rgba(147,51,234,0.5)] z-10 flex items-center justify-center">
                  <img src="/profile.jpg" alt="Shaik Kulsum" className="w-full h-full rounded-full object-cover border-4 border-[#0e1322]" />
                </div>

                {/* Status Badge (Top Right) */}
                <div className="absolute -top-2 right-2 sm:right-6 bg-[#131b2e]/90 border border-purple-500/40 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2.5 z-20 animate-bounce duration-1000">
                  <span className="w-7 h-7 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 text-xs">⚡</span>
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-slate-400 font-bold leading-none">STATUS</p>
                    <p className="text-xs font-extrabold text-white mt-0.5">Active Builder</p>
                  </div>
                </div>

                {/* Focus Badge (Bottom Left) */}
                <div className="absolute -bottom-2 left-2 sm:left-6 bg-[#131b2e]/90 border border-purple-500/40 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2.5 z-20">
                  <span className="w-7 h-7 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 text-xs">💻</span>
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-slate-400 font-bold leading-none">FOCUS</p>
                    <p className="text-xs font-extrabold text-white mt-0.5">Full-Stack Dev</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ABOUT ME VIEW */}
        {activeTab === 'about' && (
          <div className="max-w-5xl mx-auto w-full bg-[#0e1322]/90 backdrop-blur-2xl border border-purple-500/30 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(147,51,234,0.15)] relative">
            
            <div className="flex items-center gap-3 mb-10">
              <div className="w-3 h-8 bg-gradient-to-b from-purple-500 to-indigo-600 rounded-full shadow-[0_0_12px_rgba(147,51,234,0.8)]"></div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">About Me</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-4 flex justify-center">
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 rounded-full blur-md opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
                  
                  <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full p-1.5 bg-[#0e1322] border-2 border-purple-500/50 shadow-[0_0_30px_rgba(147,51,234,0.4)] overflow-hidden">
                    <img 
                      src="/profile.jpg" 
                      alt="Shaik Kulsum" 
                      className="w-full h-full rounded-full object-cover transform transition duration-500 group-hover:scale-105" 
                    />
                  </div>

                  <div className="absolute bottom-2 right-2 bg-[#131b2e]/90 border border-purple-500/60 backdrop-blur-md px-3 py-1 rounded-full shadow-lg text-purple-300 text-xs font-bold flex items-center gap-1">
                    <span>⚡ AI/ML</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-6">
                <p className="text-slate-200 text-sm md:text-base leading-relaxed">
                  Hello! I'm <span className="text-white font-bold bg-purple-950/60 px-2 py-0.5 rounded-md border border-purple-800/40">Shaik Kulsum</span>, a dedicated third-year B.Tech student in Computer Science and Engineering (Artificial Intelligence &amp; Machine Learning) at <span className="text-purple-300 font-semibold">SASI Institute of Technology and Engineering</span>.
                </p>

                <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                  Passionate about full-stack development and intelligent systems, I combine a robust technical foundation in HTML, CSS, JavaScript, Python, SQL, C, Java, DSA, and DBMS with practical experience gained through specialized workshops (AWS, MERN Stack, Generative AI) and an Artificial Intelligence internship at Convergences. As a proactive team leader in hackathons, I excel at turning complex challenges into scalable, user-centric web applications and real-world AI solutions.
                </p>

                <div className="relative bg-gradient-to-r from-[#131b2e] to-[#181028] border-l-4 border-purple-500 border-y border-r border-purple-950/80 p-4 rounded-r-2xl shadow-inner">
                  <p className="text-xs md:text-sm italic text-purple-200 font-medium tracking-wide">
                    "Leveraging AI/ML foundations to bridge intelligence with implementation and build innovative digital systems."
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 pt-8 border-t border-purple-950/80">
              {[
                { count: '9+', label: 'Core Skills & Tech', icon: '⚡' },
                { count: `${projects.length || '3+'}+`, label: 'Projects Built', icon: '🚀' },
                { count: `${certificates.length}+`, label: 'Certificates & Milestones', icon: '🏆' }
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className="bg-[#131b2e]/80 hover:bg-[#182038] border border-purple-950 hover:border-purple-500/40 p-6 rounded-2xl text-center transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_20px_rgba(0,0,0,0.3)] group"
                >
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <h3 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-1 group-hover:drop-shadow-[0_0_10px_rgba(147,51,234,0.5)]">
                    {stat.count}
                  </h3>
                  <p className="text-xs font-medium text-slate-400 tracking-wider uppercase">{stat.label}</p>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* EDUCATION VIEW */}
        {activeTab === 'education' && (
          <div className="bg-[#0e1322] border border-purple-900/40 rounded-3xl p-10 md:p-12 shadow-[0_0_30px_rgba(147,51,234,0.1)] max-w-5xl mx-auto w-full relative">
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-8 flex items-center gap-3">
              <span>🎓</span> Education & Academic Milestones
            </h3>
            
            <div className="space-y-6 relative border-l-2 border-purple-600/40 pl-6 ml-2">
              <div className="relative bg-[#131b2e] border border-purple-950/80 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all hover:border-purple-500/40 shadow-md">
                <span className="absolute -left-[31px] top-6 w-3 h-3 bg-purple-500 rounded-full border-2 border-[#0e1322]"></span>
                <div>
                  <span className="text-xs text-purple-400 font-bold uppercase tracking-wider">Secondary School Education (10th Grade / SSC)</span>
                  <h4 className="text-base font-bold text-white mt-1">Sasi E.M High School</h4>
                </div>
                <span className="text-sm font-extrabold text-purple-300 bg-purple-950/60 px-3 py-1 rounded-xl border border-purple-800/40">90.3%</span>
              </div>

              <div className="relative bg-[#131b2e] border border-purple-950/80 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all hover:border-purple-500/40 shadow-md">
                <span className="absolute -left-[31px] top-6 w-3 h-3 bg-purple-500 rounded-full border-2 border-[#0e1322]"></span>
                <div>
                  <span className="text-xs text-purple-400 font-bold uppercase tracking-wider">Intermediate / Senior Secondary (MPC)</span>
                  <h4 className="text-base font-bold text-white mt-1">Sasi Intermediate College</h4>
                </div>
                <span className="text-sm font-extrabold text-purple-300 bg-purple-950/60 px-3 py-1 rounded-xl border border-purple-800/40">96%</span>
              </div>

              <div className="relative bg-[#131b2e] border border-purple-950/80 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all hover:border-purple-500/40 shadow-md">
                <span className="absolute -left-[31px] top-6 w-3 h-3 bg-purple-500 rounded-full border-2 border-[#0e1322]"></span>
                <div>
                  <span className="text-xs text-purple-400 font-bold uppercase tracking-wider">Third-Year Student (Pursuing)</span>
                  <h4 className="text-base font-bold text-white mt-1">B.Tech in Computer Science and Engineering (AI &amp; ML)</h4>
                  <p className="text-xs text-slate-400 mt-0.5">SASI Institute of Technology and Engineering</p>
                </div>
                <span className="text-sm font-extrabold text-purple-300 bg-purple-950/60 px-3 py-1 rounded-xl border border-purple-800/40">8.6 SGPA</span>
              </div>
            </div>

            <div className="mt-8 text-center text-xs text-slate-400 font-medium">
              Education is the foundation of every achievement. 📖
            </div>
          </div>
        )}

        {/* SKILLS VIEW (With Colorful Official Brand Logos) */}
        {activeTab === 'skills' && (
          <div className="bg-[#0e1322] border border-purple-900/40 rounded-3xl p-10 md:p-12 shadow-[0_0_30px_rgba(147,51,234,0.1)] max-w-6xl mx-auto w-full flex flex-col gap-10">
            <div>
              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-2">⚡ TECHNICAL SKILLS</h3>
                <p className="text-xs text-slate-400 mt-1">Core languages, frameworks, and tools powering my development stack.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {[
                  { name: 'HTML5', desc: 'Semantic markup & layout structure', level: '90%', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/html5.svg' },
                  { name: 'CSS3', desc: 'Styling, flexbox, grid & animations', level: '88%', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/css3.svg' },
                  { name: 'JavaScript', desc: 'Dynamic client-side scripting', level: '85%', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/javascript.svg' },
                  { name: 'Python', desc: 'Core logic, scripting & backend logic', level: '90%', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/python.svg' },
                  { name: 'C Programming', desc: 'Foundational programming & algorithms', level: '90%', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/c.svg' },
                  { name: 'Java', desc: 'Object-oriented programming', level: '85%', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/openjdk.svg' },
                  { name: 'SQL', desc: 'Relational database management', level: '85%', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/mysql.svg' },
                  { name: 'MERN Stack', desc: 'MongoDB, Express, React, Node.js', level: '85%', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/react.svg' },
                  { name: 'Generative AI', desc: 'AI models, prompt engineering & APIs', level: '85%', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/openai.svg' }
                ].map((skill, index) => (
                  <div key={index} className="bg-[#131b2e] border border-purple-950/80 rounded-2xl p-5 flex flex-col justify-between shadow-md">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-[#080b14] border border-purple-500/20 flex items-center justify-center p-2 shadow-sm">
                            <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain" style={{ filter: 'none' }} />
                          </div>
                          <h4 className="font-bold text-white text-sm">{skill.name}</h4>
                        </div>
                        <span className="text-xs font-bold text-purple-400">{skill.level}</span>
                      </div>
                      <p className="text-xs text-slate-400 mb-4">{skill.desc}</p>
                    </div>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full" style={{ width: skill.level }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-purple-950/60 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#131b2e] border border-purple-950/80 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold text-sm">🌐</div>
                  <h4 className="font-bold text-white text-base">Languages Known</h4>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {['English', 'Telugu', 'Hindi'].map((lang, idx) => (
                    <span key={idx} className="text-xs bg-purple-950/60 border border-purple-800/50 text-purple-300 px-4 py-2 rounded-xl font-medium">
                      🗣️ {lang}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-[#131b2e] border border-purple-950/80 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold text-sm">💡</div>
                  <h4 className="font-bold text-white text-base">Professional Soft Skills</h4>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2">✨ Fast Learner with Strong Adaptability.</li>
                  <li className="flex items-center gap-2">✨ Excellent Time Management Skills.</li>
                  <li className="flex items-center gap-2">✨ Good Communication Skills.</li>
                  <li className="flex items-center gap-2">✨ Collaborative Team Player with proven leadership capabilities.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* PROJECTS VIEW */}
        {activeTab === 'projects' && (
          <section className="bg-[#0e1322] border border-purple-900/40 rounded-3xl p-10 md:p-12 shadow-[0_0_30px_rgba(147,51,234,0.1)]">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-2">⭐ FEATURED PROJECTS</h3>
                <p className="text-xs text-slate-400 mt-1">Showing database-synced solutions</p>
              </div>
              <span className="text-xs text-purple-400 bg-purple-950/50 border border-purple-800/40 px-3 py-1 rounded-full">Database Synced</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project._id} className="bg-[#131b2e] border border-purple-950/80 rounded-2xl p-6 flex flex-col justify-between shadow-lg hover:border-purple-500/40 transition">
                  <div>
                    {project.imageUrl && (
                      <div className="w-full h-36 rounded-xl overflow-hidden bg-slate-900 mb-4 border border-purple-950">
                        <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <h4 className="font-bold text-white text-base mb-2">{project.title}</h4>
                    <p className="text-xs text-slate-400 mb-4 line-clamp-3 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.technologies && project.technologies.map((tech, idx) => (
                        <span key={idx} className="text-[10px] bg-purple-950/80 text-purple-300 px-2.5 py-1 rounded-lg border border-purple-800/40">{tech}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-3 border-t border-purple-950/80 flex-wrap">
                    {project.title && project.title.includes('MERN Stack') ? (
                      <>
                        <a href={project.frontendLink || '#'} target="_blank" rel="noreferrer" className="flex-1 bg-[#0e1322] hover:bg-purple-950/50 text-center text-xs py-2 rounded-xl text-purple-300 border border-purple-900/50 transition">Frontend</a>
                        <a href={project.backendLink || '#'} target="_blank" rel="noreferrer" className="flex-1 bg-[#0e1322] hover:bg-purple-950/50 text-center text-xs py-2 rounded-xl text-purple-300 border border-purple-900/50 transition">Backend</a>
                      </>
                    ) : project.title && project.title.includes('GenAI') ? (
                      <a href={project.backendLink || project.githubLink || '#'} target="_blank" rel="noreferrer" className="flex-1 bg-[#0e1322] hover:bg-purple-950/50 text-center text-xs py-2 rounded-xl text-purple-300 border border-purple-900/50 transition">Google Colab</a>
                    ) : project.title && (project.title.includes('Movie Recommendation') || project.title.includes('AI Chatbot') || project.title.includes('Predictive Analytics')) ? (
                      <a href={project.githubLink || project.backendLink || '#'} target="_blank" rel="noreferrer" className="flex-1 bg-[#0e1322] hover:bg-purple-950/50 text-center text-xs py-2 rounded-xl text-purple-300 border border-purple-900/50 transition">GitHub</a>
                    ) : project.githubLink ? (
                      <a href={project.githubLink} target="_blank" rel="noreferrer" className="flex-1 bg-[#0e1322] hover:bg-purple-950/50 text-center text-xs py-2 rounded-xl text-purple-300 border border-purple-900/50 transition">GitHub</a>
                    ) : project.backendLink ? (
                      <a href={project.backendLink} target="_blank" rel="noreferrer" className="flex-1 bg-[#0e1322] hover:bg-purple-950/50 text-center text-xs py-2 rounded-xl text-purple-300 border border-purple-900/50 transition">Backend</a>
                    ) : (
                      <span className="flex-1 bg-slate-900 text-slate-500 text-center text-xs py-2 rounded-xl cursor-not-allowed">N/A</span>
                    )}

                    {project.liveLink ? (
                      <a href={project.liveLink} target="_blank" rel="noreferrer" className="flex-1 bg-purple-600 hover:bg-purple-500 text-center text-xs py-2 rounded-xl text-white transition shadow-md">Live Demo</a>
                    ) : (
                      <span className="flex-1 bg-slate-900 text-slate-500 text-center text-xs py-2 rounded-xl cursor-not-allowed">Colab / Video</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* EXPERIENCE VIEW */}
        {activeTab === 'experience' && (
          <div className="bg-[#0e1322] border border-purple-900/40 rounded-3xl p-10 md:p-12 shadow-[0_0_30px_rgba(147,51,234,0.1)] max-w-4xl mx-auto w-full">
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-8 flex items-center gap-3">
              <span>💼</span> Experience &amp; Workshops
            </h3>
            <div className="space-y-8 border-l-2 border-purple-600/40 pl-6 ml-2">
              
              <div className="relative bg-[#131b2e] border border-purple-950/80 p-6 rounded-2xl shadow-md">
                <span className="absolute -left-[31px] top-6 w-3 h-3 bg-purple-500 rounded-full border-2 border-[#0e1322]"></span>
                <span className="text-xs text-purple-400 font-bold uppercase tracking-wider">Internship Experience</span>
                <h4 className="text-base font-bold text-white mt-1">Artificial Intelligence Intern — Convergences</h4>
                <ul className="mt-3 space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">🔹 Gained hands-on experience in Artificial Intelligence and Machine Learning through practical projects.</li>
                  <li className="flex items-start gap-2">🔹 Developed a Movie Recommendation System using machine learning techniques to generate personalized recommendations.</li>
                  <li className="flex items-start gap-2">🔹 Built an AI Chatbot using natural language processing concepts for conversational interactions.</li>
                  <li className="flex items-start gap-2">🔹 Strengthened problem-solving, programming, and AI development skills through real-world project work.</li>
                </ul>
              </div>

              <div className="relative bg-[#131b2e] border border-purple-950/80 p-6 rounded-2xl shadow-md">
                <span className="absolute -left-[31px] top-6 w-3 h-3 bg-purple-500 rounded-full border-2 border-[#0e1322]"></span>
                <span className="text-xs text-purple-400 font-bold uppercase tracking-wider">Hackathon Experience</span>
                <h4 className="text-base font-bold text-white mt-1">Google Hackathon — Team Leader</h4>
                <ul className="mt-3 space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">🔹 Led a team in developing and submitting a functional prototype, Smart Resource Management System.</li>
                  <li className="flex items-start gap-2">🔹 Coordinated team members, managed project tasks, and contributed to the technical development of the solution.</li>
                  <li className="flex items-start gap-2">🔹 Gained practical experience in team leadership, collaboration, problem-solving, and rapid project development.</li>
                </ul>
              </div>

              <div className="relative bg-[#131b2e] border border-purple-950/80 p-6 rounded-2xl shadow-md">
                <span className="absolute -left-[31px] top-6 w-3 h-3 bg-purple-500 rounded-full border-2 border-[#0e1322]"></span>
                <span className="text-xs text-purple-400 font-bold uppercase tracking-wider">Workshops &amp; Training</span>
                <h4 className="text-base font-bold text-white mt-1">Technical Workshops — AWS | MERN Stack | Generative AI</h4>
                <ul className="mt-3 space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">🔹 Participated in hands-on workshops focused on AWS, MERN Stack, and Generative AI.</li>
                  <li className="flex items-start gap-2">🔹 Worked on practical projects and collaborated with team members to implement technology-based solutions.</li>
                  <li className="flex items-start gap-2">🔹 Gained exposure to cloud computing, full-stack development, and AI technologies.</li>
                </ul>
              </div>

            </div>
          </div>
        )}

        {/* CERTIFICATES VIEW */}
        {activeTab === 'certificates' && (
          <section className="bg-[#0e1322] border border-purple-900/40 rounded-3xl p-10 md:p-12 shadow-[0_0_30px_rgba(147,51,234,0.1)] max-w-6xl mx-auto w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-2">🏆 CERTIFICATES &amp; WORKSHOPS</h3>
                <p className="text-xs text-slate-400 mt-1">Professional credentials, certifications, and technical milestones completed.</p>
              </div>
              <button 
                onClick={() => setIsUploading(!isUploading)} 
                className="bg-purple-600 hover:bg-purple-500 text-white text-xs px-4 py-2.5 rounded-xl font-medium transition shadow-md"
              >
                <span>{isUploading ? '✕ Close Form' : '➕ Add Certificate'}</span>
              </button>
            </div>

            {isUploading && (
              <form onSubmit={handleCertificateAdd} className="bg-[#131b2e] border border-purple-500/40 p-6 rounded-2xl mb-8 flex flex-col gap-4">
                <h4 className="text-sm font-bold text-white">Add New Certificate Link &amp; Metadata</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="Certificate Title" 
                    value={newTitle} 
                    onChange={(e) => setNewTitle(e.target.value)} 
                    className="bg-[#080b14] border border-purple-950 text-xs text-white p-3 rounded-xl focus:outline-none focus:border-purple-500"
                    required 
                  />
                  <input 
                    type="text" 
                    placeholder="Category (e.g., Hackathon)" 
                    value={newCategory} 
                    onChange={(e) => setNewCategory(e.target.value)} 
                    className="bg-[#080b14] border border-purple-950 text-xs text-white p-3 rounded-xl focus:outline-none focus:border-purple-500"
                  />
                </div>
                <input 
                  type="text" 
                  placeholder="Google Drive Shareable Link (URL)" 
                  value={newFileUrl} 
                  onChange={(e) => setNewFileUrl(e.target.value)} 
                  className="bg-[#080b14] border border-purple-950 text-xs text-white p-3 rounded-xl focus:outline-none focus:border-purple-500"
                />
                <textarea 
                  placeholder="Short description..." 
                  value={newDesc} 
                  onChange={(e) => setNewDesc(e.target.value)} 
                  className="bg-[#080b14] border border-purple-950 text-xs text-white p-3 rounded-xl focus:outline-none focus:border-purple-500"
                  rows="2"
                />
                <button type="submit" className="bg-purple-600 hover:bg-purple-500 text-white text-xs px-6 py-2.5 rounded-xl font-medium transition self-end">
                  Save Certificate
                </button>
              </form>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              {certificates.map((cert) => (
                <div key={cert.id} className="bg-[#131b2e] border border-purple-950/80 p-6 rounded-2xl flex flex-col justify-between shadow-md">
                  <div>
                    <span className="text-[10px] bg-purple-950 text-purple-300 px-2.5 py-1 rounded-lg border border-purple-800/40 uppercase font-semibold">{cert.category}</span>
                    <h4 className="text-sm font-bold text-white mt-4 mb-2">{cert.title}</h4>
                    <p className="text-xs text-slate-400 mb-6 leading-relaxed">{cert.desc}</p>
                  </div>
                  <a href={cert.fileUrl} target="_blank" rel="noreferrer" className="w-full bg-[#0e1322] border border-purple-900/50 hover:bg-purple-950/50 text-purple-300 text-xs py-2 rounded-xl transition text-center block">
                    View Certificate
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CONTACT VIEW */}
        {activeTab === 'contact' && (
          <section className="bg-[#0e1322] border border-purple-900/40 rounded-3xl p-6 md:p-12 shadow-[0_0_30px_rgba(147,51,234,0.1)] max-w-7xl mx-auto w-full flex flex-col gap-10">
            
            {/* Top Header Section */}
            <div className="text-center space-y-3">
              <p className="text-purple-400 font-bold text-xs uppercase tracking-widest">--- CONTACT ME ---</p>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-pink-400">Connect</span>
              </h2>
              <p className="text-slate-400 text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
                Have an idea, project, or opportunity in mind? I'd love to hear from you!<br />
                Let's turn ideas into <span className="text-purple-300 font-semibold">intelligent digital solutions</span>.
              </p>
            </div>

            {/* Top Grid: "New Opportunities" & Contact Form */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: "New Opportunities" & Get in Touch Card */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                
                {/* New Opportunities Card */}
                <div className="bg-[#131b2e] border border-purple-950/80 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wide block">I'm always open to</span>
                      <h3 className="text-xl font-extrabold text-white mt-0.5">New Opportunities</h3>
                    </div>
                    <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400 text-xs shadow-[0_0_10px_rgba(147,51,234,0.4)]">
                      ⚡
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-y-3 gap-x-2 pt-2">
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span> Internships
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span> Collaborations
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span> Projects
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span> Learning
                    </div>
                  </div>
                </div>

                {/* Get in Touch Card */}
                <div className="bg-[#131b2e] border border-purple-950/80 rounded-2xl p-6 md:p-8 shadow-xl flex flex-col gap-6">
                  <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                    Get in <span className="text-purple-400">Touch</span>
                  </h3>

                  <div className="flex flex-col gap-5">
                    {/* Email */}
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 flex-shrink-0">
                        📧
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">EMAIL</span>
                        <a href="mailto:badi.kulsum06@gmail.com" className="text-xs md:text-sm font-medium text-purple-300 hover:underline">
                          badi.kulsum06@gmail.com
                        </a>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 flex-shrink-0">
                        📞
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">PHONE</span>
                        <span className="text-xs md:text-sm font-medium text-slate-200">+91 9014167179</span>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 flex-shrink-0">
                        📍
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">LOCATION</span>
                        <span className="text-xs md:text-sm font-medium text-slate-200">Andhra Pradesh, India</span>
                      </div>
                    </div>

                    {/* CodeChef */}
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 flex-shrink-0">
                        &lt;/&gt;
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">CODECHEF</span>
                        <a href="https://www.codechef.com/users/bask_moles_15" target="_blank" rel="noreferrer" className="text-xs md:text-sm font-medium text-purple-300 hover:underline">
                          codechef.com/users/bask_moles_15
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Contact Form */}
              <div className="lg:col-span-7 bg-[#131b2e] border border-purple-950/80 rounded-2xl p-6 md:p-8 shadow-xl">
                <h3 className="text-xl font-extrabold text-white mb-6">
                  Send Me a <span className="text-purple-400">Message</span>
                </h3>

                {contactStatus && (
                  <div className="bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs p-3 rounded-xl mb-4 text-center">
                    {contactStatus}
                  </div>
                )}

                <form onSubmit={handleContactSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-slate-300 font-medium">Your Name</label>
                      <input 
                        type="text" 
                        placeholder="Your Name" 
                        value={contactForm.name}
                        onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                        className="bg-[#080b14] border border-purple-950 rounded-xl text-xs text-white p-3.5 focus:outline-none focus:border-purple-500"
                        required 
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-slate-300 font-medium">Your Email</label>
                      <input 
                        type="email" 
                        placeholder="Your Email" 
                        value={contactForm.email}
                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                        className="bg-[#080b14] border border-purple-950 rounded-xl text-xs text-white p-3.5 focus:outline-none focus:border-purple-500"
                        required 
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-300 font-medium">Subject</label>
                    <input 
                      type="text" 
                      placeholder="Subject" 
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                      className="bg-[#080b14] border border-purple-950 rounded-xl text-xs text-white p-3.5 focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-300 font-medium">Your Message</label>
                    <textarea 
                      placeholder="Your Message" 
                      rows="4"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      className="bg-[#080b14] border border-purple-950 rounded-xl text-xs text-white p-3.5 focus:outline-none focus:border-purple-500 resize-none"
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold py-3.5 rounded-xl transition shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2">
                    Send Message 🪄
                  </button>
                </form>

                <p className="text-[11px] text-slate-400 text-center mt-4 flex items-center justify-center gap-1.5">
                  <span>🔒</span> Your information is safe with me.
                </p>
              </div>

            </div>

            {/* Bottom Section: Find Me Online & Quote / Quick Response Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Find Me Online Box (With Colorful Brand Logos) */}
              <div className="lg:col-span-5 bg-[#131b2e] border border-purple-950/80 rounded-2xl p-6 shadow-xl">
                <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400 block mb-4">FIND ME ONLINE</span>
                <div className="flex items-center gap-3">
                  <a href="https://github.com/kulsumshaik24-cmyk" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-xl bg-[#080b14] border border-purple-950 hover:border-purple-500/50 flex flex-col items-center justify-center p-2 transition group" title="GitHub">
                    <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg" alt="GitHub" className="w-5 h-5 filter invert group-hover:scale-110 transition" />
                    <span className="text-[9px] text-slate-400 mt-1">GitHub</span>
                  </a>

                  <a href="https://www.linkedin.com/in/kulsum-shaik-a19276345/" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-xl bg-[#080b14] border border-purple-950 hover:border-purple-500/50 flex flex-col items-center justify-center p-2 transition group" title="LinkedIn">
                    <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg" alt="LinkedIn" className="w-5 h-5 group-hover:scale-110 transition" style={{ filter: 'none' }} />
                    <span className="text-[9px] text-slate-400 mt-1">LinkedIn</span>
                  </a>

                  <a href="https://www.codechef.com/users/bask_moles_15" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-xl bg-[#080b14] border border-purple-950 hover:border-purple-500/50 flex flex-col items-center justify-center p-2 transition group" title="CodeChef">
                    <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/codechef.svg" alt="CodeChef" className="w-5 h-5 group-hover:scale-110 transition" style={{ filter: 'none' }} />
                    <span className="text-[9px] text-slate-400 mt-1">CodeChef</span>
                  </a>

                  <a href="mailto:badi.kulsum06@gmail.com" className="w-12 h-12 rounded-xl bg-[#080b14] border border-purple-950 hover:border-purple-500/50 flex flex-col items-center justify-center p-2 transition group" title="Email">
                    <span className="text-base">📧</span>
                    <span className="text-[9px] text-slate-400 mt-0.5">Email</span>
                  </a>
                </div>
              </div>

              {/* Quote & Quick Response Banner */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-[#131b2e] border border-purple-950/80 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
                  <p className="text-xs italic text-purple-200 font-medium">
                    "Great solutions start with meaningful conversations."
                  </p>
                  <p className="text-xs text-slate-300 font-medium mt-3 flex items-center gap-1.5">
                    <span>🧠</span> Let's create something impactful together! ❤️
                  </p>
                </div>

                <div className="bg-[#131b2e] border border-purple-950/80 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span> Quick Response
                    </span>
                    <span className="text-sm">🚀</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2">
                    I usually reply within 24 hours. Looking forward to your message!
                  </p>
                </div>
              </div>

            </div>

          </section>
        )}

      </div>
    </div>
  );
}
