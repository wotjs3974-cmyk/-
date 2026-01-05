
import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Github, Youtube, Music, Copy, Check, ArrowRight } from 'lucide-react';
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
    <div className="pt-32 pb-20 max-w-6xl mx-auto px-6">
      <div className="grid md:grid-cols-12 gap-16">
        <aside className="md:col-span-4 space-y-12">
          <div className="space-y-6">
            <h1 className="text-5xl font-black tracking-tighter text-white uppercase">{data.name}</h1>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-neutral-400 group">
                <Mail size={16} />
                <span className="text-sm">{data.email}</span>
                <button 
                  onClick={copyToClipboard}
                  className="p-1 hover:bg-white/10 rounded-md transition-colors"
                >
                  {copied ? <Check size={14} className="text-[#11d493]" /> : <Copy size={14} />}
                </button>
              </div>
              <a href={`tel:${data.phone.replace(/\./g, '')}`} className="flex items-center gap-3 text-neutral-400 hover:text-[#11d493] transition-colors">
                <Phone size={16} />
                <span className="text-sm">{data.phone}</span>
              </a>
              <div className="flex items-center gap-3 text-neutral-400">
                <MapPin size={16} />
                <span className="text-sm">{data.location}</span>
              </div>
            </div>
            
            <div className="flex gap-3 pt-4">
              {data.github && (
                <a href={data.github} target="_blank" className="w-10 h-10 glass flex items-center justify-center rounded-none hover:border-[#11d493]/30 hover:text-[#11d493] transition-all">
                  <Github size={18} />
                </a>
              )}
              {data.youtube && (
                <a href={data.youtube} target="_blank" className="w-10 h-10 glass flex items-center justify-center rounded-none hover:border-[#11d493]/30 hover:text-[#11d493] transition-all">
                  <Youtube size={18} />
                </a>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[#11d493]">Tech Stack</h2>
            <div className="space-y-6">
              {data.techStack.map((stack, i) => (
                <div key={i} className="group">
                  <h4 className="text-white font-black mb-1 text-sm uppercase">{stack.name}</h4>
                  <p className="text-xs text-neutral-500 leading-relaxed">{stack.description}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <main className="md:col-span-8 space-y-16">
          <section>
            <p className="text-2xl md:text-3xl font-black text-neutral-300 leading-tight border-l-4 border-[#11d493] pl-10 uppercase tracking-tighter">
              {data.summary}
            </p>
          </section>

          <section className="space-y-10">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[#11d493]">Experience & Projects</h2>
            <div className="space-y-12">
              {data.experience.map((exp, i) => (
                <div key={i} className="relative pl-10 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-[#11d493] before:rounded-none">
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-xl font-black uppercase tracking-tight">{exp.title}</h3>
                    <span className="text-xs text-neutral-600 font-black font-mono">{exp.period}</span>
                  </div>
                  <p className="text-sm text-neutral-500 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          {data.education && data.education.length > 0 && (
            <section className="space-y-8">
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[#11d493]">Education</h2>
              <div className="space-y-6">
                {data.education.map((edu, i) => (
                  <div key={i} className="glass p-6 rounded-none border-white/5 border-l-2 border-l-[#11d493]">
                    <h3 className="text-lg font-black uppercase tracking-tight">{edu.school}</h3>
                    <p className="text-sm text-neutral-400 mt-1 uppercase">{edu.major} • {edu.status}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="pt-10 border-t border-white/5 flex justify-center md:justify-start">
            <Link 
              to="/works" 
              className="inline-flex items-center gap-4 bg-[#11d493] text-black px-16 py-6 rounded-full font-black text-xl tracking-tighter hover:brightness-110 transition-all group"
            >
              WORKS <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Resume;
