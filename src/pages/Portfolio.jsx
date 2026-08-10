import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Portfolio({ activeTab, setActiveTab }) {
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

  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [contactStatus, setContactStatus] = useState('');

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
        
        const updatedProjects = uniqueProjects.map(proj => {
          if (proj.title && proj.title.toLowerCase().includes('volunteer')) {
            return {
              ...proj,
              githubLink: 'https://github.com/kulsumshaik24-cmyk/volunteer-connect-prototype.git',
              liveLink: 'https://kulsumshaik24-cmyk.github.io/volunteer-connect-prototype/'
            };
          }
          if (proj.title && proj.title.toLowerCase().includes('chatbot')) {
            return { ...proj, githubLink: 'https://github.com/kulsumshaik24-cmyk/cognevance_AIChatbotUsingNLP.git' };
          }
          if (proj.title && proj.title.toLowerCase().includes('predictive')) {
            return { ...proj, githubLink: 'https://github.com/kulsumshaik24-cmyk/cognevance_PredictiveAnalytics.git' };
          }
          if (proj.title && proj.title.toLowerCase().includes('movie')) {
            return { ...proj, githubLink: 'https://github.com/kulsumshaik24-cmyk/cognevance_MovieRecommendationSystem.git' };
          }
          if (proj.title && proj.title.toLowerCase().includes('colab')) {
            return { ...proj, liveLink: 'https://colab.research.google.com/drive/1QRSxLBsXwBQFJPeqSW_wRRq2qa9kDPnG?usp=sharing' };
          }
          return proj;
        });

        setProjects(updatedProjects);
      })
      .catch(err => console.log(err));
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

      {/* Main Container */}
      <div className="max-w-[1400px] mx-auto px-6 pt-10 flex flex-col gap-10 relative z-10">

        {/* HOME VIEW */}
        {activeTab === 'home' && (
          <div className="space-y-8">
            <div className="bg-[#0e1322]/90 backdrop-blur-xl border border-purple-900/40 rounded-3xl p-6 md:p-14 flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-[0_0_40px_rgba(147,51,234,0.1)] gap-10">
              
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

                {/* Social Media Logos Section with Fixed Visible CodeChef Logo */}
                <div className="flex items-center gap-4 mt-6">
                  {/* GitHub */}
                  <a 
                    href="https://github.com/kulsumshaik24-cmyk" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="w-10 h-10 rounded-xl bg-[#131b2e] border border-purple-500/30 hover:border-purple-400 flex items-center justify-center p-2.5 transition-all duration-300 hover:scale-110 shadow-md"
                    title="GitHub Profile"
                  >
                    <svg className="w-full h-full fill-white" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                  </a>

                  {/* LinkedIn */}
                  <a 
                    href="https://www.linkedin.com/in/kulsum-shaik-a19276345/" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="w-10 h-10 rounded-xl bg-[#131b2e] border border-purple-500/30 hover:border-purple-400 flex items-center justify-center p-2.5 transition-all duration-300 hover:scale-110 shadow-md"
                    title="LinkedIn Profile"
                  >
                    <svg className="w-full h-full fill-[#0A66C2]" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>

                  {/* CodeChef with Visible Inline Color Styling */}
                  <a 
                    href="https://www.codechef.com/users/bask_moles_15" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="w-10 h-10 rounded-xl bg-[#131b2e] border border-purple-500/30 hover:border-purple-400 flex items-center justify-center p-2 transition-all duration-300 hover:scale-110 shadow-md"
                    title="CodeChef Profile"
                  >
                    <svg style={{ fill: '#f97316' }} className="w-full h-full" viewBox="0 0 512 512">
                      <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zM176.7 348.6c-20.9 20.9-54.8 20.9-75.7 0-20.9-20.9-20.9-54.8 0-75.7l102.2-102.2c20.9-20.9 54.8-20.9 75.7 0s20.9 54.8 0 75.7L176.7 348.6zm183.1 0c-20.9 20.9-54.8 20.9-75.7 0L181.9 246.4c-20.9-20.9-20.9-54.8 0-75.7 20.9-20.9 54.8-20.9 75.7 0l102.2 102.2c20.9 20.9 20.9 54.8 0 75.7z"/>
                    </svg>
                  </a>
                </div>

                <div className="flex gap-4 mt-8 flex-wrap">
                  <button onClick={() => setActiveTab('projects')} className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white px-6 py-3 rounded-full text-sm font-medium transition shadow-[0_0_20px_rgba(147,51,234,0.4)] flex items-center gap-2">View My Work ➔</button>
                </div>
              </div>
              
              {/* Profile Image Container */}
              <div className="relative flex items-center justify-center p-6 z-10">
                <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full p-1 bg-gradient-to-b from-purple-500 via-indigo-600 to-pink-500 shadow-[0_0_30px_rgba(147,51,234,0.5)] z-10 flex items-center justify-center">
                  <img src="/profile.jpg" alt="Shaik Kulsum" className="w-full h-full rounded-full object-cover border-4 border-[#0e1322]" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ABOUT ME VIEW */}
        {activeTab === 'about' && (
          <div className="max-w-5xl mx-auto w-full bg-[#0e1322]/90 backdrop-blur-2xl border border-purple-500/30 rounded-3xl p-6 md:p-12 shadow-[0_0_50px_rgba(147,51,234,0.15)]">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-3 h-8 bg-gradient-to-b from-purple-500 to-indigo-600 rounded-full"></div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">About Me</h2>
            </div>
            <p className="text-slate-200 text-sm md:text-base leading-relaxed mb-6">
              Hello! I'm <span className="text-white font-bold bg-purple-950/60 px-2 py-0.5 rounded-md border border-purple-800/40">Shaik Kulsum</span>, a dedicated third-year B.Tech student in Computer Science and Engineering (Artificial Intelligence &amp; Machine Learning) at <span className="text-purple-300 font-semibold">SASI Institute of Technology and Engineering</span>.
            </p>
          </div>
        )}

        {/* EDUCATION VIEW */}
        {activeTab === 'education' && (
          <div className="bg-[#0e1322] border border-purple-900/40 rounded-3xl p-6 md:p-12 max-w-5xl mx-auto w-full">
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-8 flex items-center gap-3">
              <span>🎓</span> Education & Academic Milestones
            </h3>
            <div className="space-y-6 relative border-l-2 border-purple-600/40 pl-6 ml-2">
              <div className="relative bg-[#131b2e] border border-purple-950/80 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="text-xs text-purple-400 font-bold uppercase tracking-wider">Secondary School Education (10th Grade / SSC)</span>
                  <h4 className="text-base font-bold text-white mt-1">Sasi E.M High School</h4>
                </div>
                <span className="text-sm font-extrabold text-purple-300 bg-purple-950/60 px-3 py-1 rounded-xl border border-purple-800/40">90.3%</span>
              </div>
              <div className="relative bg-[#131b2e] border border-purple-950/80 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="text-xs text-purple-400 font-bold uppercase tracking-wider">Intermediate / Senior Secondary (MPC)</span>
                  <h4 className="text-base font-bold text-white mt-1">Sasi Intermediate College</h4>
                </div>
                <span className="text-sm font-extrabold text-purple-300 bg-purple-950/60 px-3 py-1 rounded-xl border border-purple-800/40">96%</span>
              </div>
              <div className="relative bg-[#131b2e] border border-purple-950/80 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="text-xs text-purple-400 font-bold uppercase tracking-wider">Third-Year Student (Pursuing)</span>
                  <h4 className="text-base font-bold text-white mt-1">B.Tech in Computer Science and Engineering (AI &amp; ML)</h4>
                </div>
                <span className="text-sm font-extrabold text-purple-300 bg-purple-950/60 px-3 py-1 rounded-xl border border-purple-800/40">8.6 SGPA</span>
              </div>
            </div>
          </div>
        )}

        {/* SKILLS VIEW */}
        {activeTab === 'skills' && (
          <div className="bg-[#0e1322] border border-purple-900/40 rounded-3xl p-6 md:p-12 max-w-6xl mx-auto w-full flex flex-col gap-10">
            <div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2">⚡ TECHNICAL SKILLS</h3>
              <p className="text-xs text-slate-400 mb-6">Core languages, frameworks, and tools powering my development stack.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {['HTML5', 'CSS3', 'JavaScript', 'Python', 'C Programming', 'Java', 'SQL', 'MERN Stack', 'Generative AI'].map((skill, index) => (
                  <div key={index} className="bg-[#131b2e] border border-purple-950/80 rounded-2xl p-5 shadow-md">
                    <h4 className="font-bold text-white text-sm mb-1">{skill}</h4>
                    <p className="text-xs text-slate-400">Core proficiency &amp; practical application.</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PROJECTS VIEW */}
        {activeTab === 'projects' && (
          <section className="bg-[#0e1322] border border-purple-900/40 rounded-3xl p-6 md:p-12">
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-6">⭐ FEATURED PROJECTS</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project._id} className="bg-[#131b2e] border border-purple-950/80 rounded-2xl p-6 flex flex-col justify-between shadow-lg">
                  <div>
                    <h4 className="font-bold text-white text-base mb-2">{project.title}</h4>
                    <p className="text-xs text-slate-400 mb-4 line-clamp-3 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.technologies && project.technologies.map((tech, idx) => (
                        <span key={idx} className="text-[10px] bg-purple-950/80 text-purple-300 px-2.5 py-1 rounded-lg border border-purple-800/40">{tech}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-3 border-t border-purple-950/80 flex-wrap">
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noreferrer" className="flex-1 bg-[#0e1322] hover:bg-purple-950/50 text-center text-xs py-2 rounded-xl text-purple-300 border border-purple-900/50 transition">GitHub</a>
                    )}
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noreferrer" className="flex-1 bg-purple-600 hover:bg-purple-500 text-center text-xs py-2 rounded-xl text-white transition shadow-md">Live Demo</a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* EXPERIENCE VIEW */}
        {activeTab === 'experience' && (
          <div className="bg-[#0e1322] border border-purple-900/40 rounded-3xl p-6 md:p-12 max-w-4xl mx-auto w-full">
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-8 flex items-center gap-3">
              <span>💼</span> Experience &amp; Workshops
            </h3>
            <div className="space-y-6 border-l-2 border-purple-600/40 pl-6 ml-2">
              <div className="relative bg-[#131b2e] border border-purple-950/80 p-6 rounded-2xl shadow-md">
                <span className="text-xs text-purple-400 font-bold uppercase tracking-wider">Internship Experience</span>
                <h4 className="text-base font-bold text-white mt-1">Artificial Intelligence Intern — Convergences</h4>
                <p className="text-xs text-slate-300 mt-2">Developed machine learning models, movie recommendation systems, and AI chat assistants.</p>
              </div>
              <div className="relative bg-[#131b2e] border border-purple-950/80 p-6 rounded-2xl shadow-md">
                <span className="text-xs text-purple-400 font-bold uppercase tracking-wider">Hackathon Experience</span>
                <h4 className="text-base font-bold text-white mt-1">Google Hackathon — Team Leader</h4>
                <p className="text-xs text-slate-300 mt-2">Led a team to build and submit a Smart Resource Management prototype.</p>
              </div>
            </div>
          </div>
        )}

        {/* CERTIFICATES VIEW */}
        {activeTab === 'certificates' && (
          <section className="bg-[#0e1322] border border-purple-900/40 rounded-3xl p-6 md:p-12 max-w-6xl mx-auto w-full">
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-6">🏆 CERTIFICATES &amp; WORKSHOPS</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              {certificates.map((cert) => (
                <div key={cert.id} className="bg-[#131b2e] border border-purple-950/80 p-6 rounded-2xl flex flex-col justify-between shadow-md">
                  <div>
                    <span className="text-[10px] bg-purple-950 text-purple-300 px-2.5 py-1 rounded-lg border border-purple-800/40 uppercase font-semibold">{cert.category}</span>
                    <h4 className="text-sm font-bold text-white mt-4 mb-2">{cert.title}</h4>
                    <p className="text-xs text-slate-400 mb-6 leading-relaxed">{cert.desc}</p>
                  </div>
                  <a href={cert.fileUrl} target="_blank" rel="noreferrer" className="w-full bg-[#0e1322] border border-purple-900/50 text-purple-300 text-xs py-2 rounded-xl text-center block">
                    View Certificate
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CONTACT VIEW */}
        {activeTab === 'contact' && (
          <section className="bg-[#0e1322] border border-purple-900/40 rounded-3xl p-6 md:p-12 max-w-7xl mx-auto w-full">
            <h2 className="text-3xl font-extrabold text-white mb-6 text-center">Let's Connect</h2>
            {contactStatus && (
              <div className="bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs p-3 rounded-xl mb-4 text-center">
                {contactStatus}
              </div>
            )}
            <form onSubmit={handleContactSubmit} className="flex flex-col gap-4 max-w-xl mx-auto">
              <input 
                type="text" 
                placeholder="Your Name" 
                value={contactForm.name}
                onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                className="bg-[#080b14] border border-purple-950 rounded-xl text-xs text-white p-3.5 focus:outline-none"
                required 
              />
              <input 
                type="email" 
                placeholder="Your Email" 
                value={contactForm.email}
                onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                className="bg-[#080b14] border border-purple-950 rounded-xl text-xs text-white p-3.5 focus:outline-none"
                required 
              />
              <textarea 
                placeholder="Your Message" 
                rows="4"
                value={contactForm.message}
                onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                className="bg-[#080b14] border border-purple-950 rounded-xl text-xs text-white p-3.5 focus:outline-none resize-none"
                required
              ></textarea>
              <button type="submit" className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold py-3.5 rounded-xl transition shadow-lg">
                Send Message 🪄
              </button>
            </form>
          </section>
        )}

      </div>
    </div>
  );
}
