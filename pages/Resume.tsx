
import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Instagram, Copy, Check, ArrowRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getResume } from '../services/dataStore';
import { ResumeData } from '../types';

const Resume: React.FC = () => {
  const [data, setData] = useState<ResumeData | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setData(getResume());
  }, []);

  const copyToClipboard = () => {
    if (!data) return;
    navigator.clipboard.writeText(data.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!data) return null;

  return (
    <div className="pt-32 pb-48 max-w-6xl mx-auto px-6 animate-in fade-in duration-700">
      <div className="grid md:grid-cols-12 gap-20">
        {/* 사이드바: 인적 사항, 기술 스택, 학력 */}
        <aside className="md:col-span-4 space-y-16">
          <div className="space-y-8">
            <div className="space-y-2">
              <h1 className="text-6xl font-black tracking-tighter text-white uppercase italic leading-none">{data.name}</h1>
              <p className="text-2xl font-black text-neutral-400 tracking-tighter uppercase italic">{data.birthDate || '1997. 07. 28'}</p>
            </div>
            
            <div className="space-y-4 border-t border-white/5 pt-8">
              <div className="flex items-center gap-4 text-neutral-400 group">
                <Mail size={16} className="text-[#11d493]" />
                <span className="text-sm font-bold">{data.email}</span>
                <button onClick={copyToClipboard} className="p-1 hover:bg-white/10 transition-colors">
                  {copied ? <Check size={14} className="text-[#11d493]" /> : <Copy size={14} />}
                </button>
              </div>
              <div className="flex items-center gap-4 text-neutral-400">
                <Phone size={16} className="text-[#11d493]" />
                <span className="text-sm font-bold">{data.phone}</span>
              </div>
              <div className="flex items-center gap-4 text-neutral-400">
                <MapPin size={16} className="text-[#11d493]" />
                <span className="text-sm font-bold">{data.location}</span>
              </div>
              {data.address && (
                <div className="flex items-center gap-4 text-neutral-400">
                  <Home size={16} className="text-[#11d493]" />
                  <span className="text-sm font-bold leading-snug">{data.address}</span>
                </div>
              )}
            </div>
            
            <div className="flex gap-4 pt-4">
              {data.instagram && (
                <a href={data.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 hover:border-[#11d493]/50 hover:text-[#11d493] transition-all">
                  <Instagram size={18} />
                  <span className="text-[10px] font-black tracking-widest uppercase italic">Instagram</span>
                </a>
              )}
            </div>
          </div>

          <div className="space-y-10">
            <h2 className="text-sm font-black uppercase tracking-[0.15em] text-[#11d493] italic">기술 스택 (Tech Stack)</h2>
            <div className="space-y-8">
              {data.techStack.map((stack, i) => (
                <div key={i} className="group border-l border-white/5 pl-6 hover:border-[#11d493]/30 transition-all">
                  <h4 className="text-white font-black mb-1 text-sm uppercase tracking-wider">{stack.name}</h4>
                  <p className="text-xs text-neutral-500 leading-relaxed">{stack.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-10">
            <h2 className="text-sm font-black uppercase tracking-[0.15em] text-[#11d493] italic">학력 (Education)</h2>
            <div className="space-y-8">
              {data.education && data.education.map((edu, i) => (
                <div key={i} className="group border-l border-white/5 pl-6 hover:border-[#11d493]/30 transition-all">
                  <h4 className="text-white font-black mb-1 text-sm uppercase tracking-wider">{edu.school}</h4>
                  <p className="text-xs text-neutral-400 font-bold mb-1">{edu.major}</p>
                  <p className="text-[10px] text-neutral-600 uppercase font-black">{edu.status}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* 메인 섹션: 경험 */}
        <main className="md:col-span-8 space-y-24">
          <section className="space-y-16">
            <h2 className="text-lg md:text-xl font-black uppercase tracking-[0.15em] text-[#11d493] italic border-b border-[#11d493]/20 pb-4">경력 및 프로젝트 (Experience)</h2>
            <div className="space-y-20">
              {data.experience.map((exp, i) => (
                <div key={i} className="group relative">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-4 mb-6">
                    <h3 className="text-3xl font-black uppercase tracking-tighter italic text-white group-hover:text-[#11d493] transition-colors">
                      {exp.title}
                    </h3>
                    <span className="text-xs text-neutral-700 font-black font-mono tracking-widest">{exp.period}</span>
                  </div>
                  <p className="text-base text-neutral-500 leading-relaxed font-medium whitespace-pre-line">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <div className="pt-20 border-t border-white/5 flex justify-center md:justify-start">
            <Link 
              to="/works" 
              className="inline-flex items-center gap-6 bg-[#11d493] text-black px-20 py-8 font-black text-2xl tracking-tighter hover:scale-105 transition-all group italic"
            >
              포트폴리오 보기 (PROJECTS) <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Resume;
