
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Plus, Trash2, LogOut, FileText, X } from 'lucide-react';
import { getWorks, saveWorks, getPhilosophy, savePhilosophy, getResume, saveResume } from '../services/dataStore';
import { PortfolioItem, PhilosophyData, ResumeData } from '../types';

type Tab = 'philosophy' | 'resume' | 'works';

// 유튜브 ID 추출 로직 (다양한 형식 대응)
const extractYoutubeId = (input: string) => {
  if (!input) return '';
  let target = input.trim();
  if (target.includes('<iframe')) {
    const srcMatch = target.match(/src=["']([^"']+)["']/);
    if (srcMatch) target = srcMatch[1];
  }
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(shorts\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = target.match(regExp);
  const id = (match && match[8] && match[8].length === 11) ? match[8] : target.trim();
  return id.length === 11 ? id : '';
};

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('philosophy');
  
  const [works, setWorks] = useState<PortfolioItem[]>([]);
  const [philosophy, setPhilosophy] = useState<PhilosophyData | null>(null);
  const [resume, setResume] = useState<ResumeData | null>(null);
  
  const [editingWorkId, setEditingWorkId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setWorks(getWorks());
      setPhilosophy(getPhilosophy());
      setResume(getResume());
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1513') {
      setIsAuthenticated(true);
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  const handleUnifiedSave = async () => {
    setIsSaving(true);
    try {
      saveWorks(works);
      if (philosophy) savePhilosophy(philosophy);
      if (resume) saveResume(resume);
      
      await new Promise(r => setTimeout(r, 600));
      alert('저장 완료.');
      navigate('/');
    } catch (error) {
      alert('오류 발생.');
    } finally {
      setIsSaving(false);
    }
  };

  const addWork = () => {
    const newItem: PortfolioItem = {
      id: Date.now().toString(),
      title: 'NEW PROJECT', subtitle: 'GENRE / CATEGORY', videoUrl: '', thumbnailUrl: '',
      intent: '', details: [{ label: 'CONTEXT', value: '' }],
      ctaButtonName: 'VIEW RESUME', ctaLink: '/resume'
    };
    setWorks([...works, newItem]);
    setEditingWorkId(newItem.id);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black p-6">
        <form onSubmit={handleLogin} className="glass p-10 rounded-none w-full max-w-md space-y-8 border-2 border-[#11d493]/20">
          <div className="text-center">
            <h2 className="text-4xl font-black text-[#11d493] tracking-tighter uppercase">Admin</h2>
          </div>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-none px-6 py-4 focus:border-[#11d493] transition-all outline-none text-center text-xl tracking-[0.5em]"
            placeholder="••••"
            autoFocus
          />
          <button className="w-full bg-[#11d493] text-black font-black py-4 rounded-none hover:brightness-110">LOGIN</button>
        </form>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-48 max-w-6xl mx-auto px-6">
      <div className="flex justify-between items-end mb-16">
        <h1 className="text-5xl font-black text-white tracking-tighter uppercase">Dashboard</h1>
        <button onClick={() => setIsAuthenticated(false)} className="px-6 py-2 bg-white/5 rounded-none text-neutral-400 font-black text-xs uppercase hover:text-white transition-colors">LOGOUT</button>
      </div>

      <div className="flex gap-2 mb-16 p-1 glass rounded-none w-fit border border-white/10">
        {['philosophy', 'resume', 'works'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as Tab)}
            className={`px-10 py-4 rounded-none text-xs font-black transition-all uppercase tracking-widest ${
              activeTab === tab ? 'bg-[#11d493] text-black shadow-[0_0_20px_rgba(17,212,147,0.2)]' : 'text-neutral-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="min-h-[500px]">
        {activeTab === 'philosophy' && philosophy && (
          <div className="space-y-16 animate-in fade-in duration-500">
            <div className="glass p-10 rounded-none space-y-10 border-l-4 border-[#11d493]">
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
                <FileText size={24} className="text-[#11d493]"/> HERO CONTENT
              </h2>
              <div className="grid md:grid-cols-2 gap-12">
                <TextArea label="MAIN TITLE" value={philosophy.heroTitle} onChange={v => setPhilosophy({...philosophy, heroTitle: v})} />
                <TextArea label="SUBTITLE" value={philosophy.heroSubtitle} onChange={v => setPhilosophy({...philosophy, heroSubtitle: v})} />
              </div>
            </div>
            
            <div className="glass p-10 rounded-none space-y-10 border-l-4 border-[#11d493]">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">PRINCIPLES</h2>
                <button onClick={() => setPhilosophy({...philosophy, principles: [...philosophy.principles, { title: '', desc: '' }]})} className="p-3 bg-white/5 hover:bg-[#11d493] hover:text-black transition-all"><Plus size={20}/></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {philosophy.principles.map((p, i) => (
                  <div key={i} className="flex flex-col space-y-6 glass p-8 rounded-none relative group border-white/5">
                    <button onClick={() => setPhilosophy({...philosophy, principles: philosophy.principles.filter((_, idx) => idx !== i)})} className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 text-white rounded-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-20"><X size={16}/></button>
                    <Input label="TITLE" value={p.title} onChange={v => { const n = [...philosophy.principles]; n[i].title = v; setPhilosophy({...philosophy, principles: n}); }} />
                    <TextArea label="DESCRIPTION" value={p.desc} onChange={v => { const n = [...philosophy.principles]; n[i].desc = v; setPhilosophy({...philosophy, principles: n}); }} className="min-h-[120px]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'resume' && resume && (
          <div className="space-y-16 animate-in fade-in duration-500">
            <div className="glass p-10 rounded-none space-y-10 border-l-4 border-[#11d493]">
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter">BASICS</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Input label="NAME" value={resume.name} onChange={v => setResume({...resume, name: v})} />
                <Input label="EMAIL" value={resume.email} onChange={v => setResume({...resume, email: v})} />
                <Input label="PHONE" value={resume.phone} onChange={v => setResume({...resume, phone: v})} />
              </div>
              <TextArea label="SUMMARY" value={resume.summary} onChange={v => setResume({...resume, summary: v})} className="min-h-[100px]" />
            </div>
            {/* 나머지 Resume 입력 로직 생략(기존 유지) */}
          </div>
        )}

        {activeTab === 'works' && (
          <div className="space-y-16 animate-in fade-in duration-500">
            <button onClick={addWork} className="w-full py-20 glass rounded-none border-dashed border-[#11d493]/30 flex flex-col items-center gap-6 group hover:border-[#11d493] transition-all">
              <div className="w-20 h-20 bg-white/5 rounded-none flex items-center justify-center group-hover:bg-[#11d493] group-hover:text-black transition-all"><Plus size={40} /></div>
              <span className="font-black text-2xl tracking-tighter uppercase">ADD PROJECT</span>
            </button>
            
            {works.map((work, idx) => (
              <div key={work.id} className="glass rounded-none overflow-hidden group border-white/5 hover:border-[#11d493]/20 transition-all">
                <div className="p-10 flex justify-between items-center cursor-pointer hover:bg-white/[0.02]" onClick={() => setEditingWorkId(editingWorkId === work.id ? null : work.id)}>
                  <div className="flex items-center gap-10">
                    <span className="text-sm font-black text-[#11d493] bg-[#11d493]/10 px-4 py-2 uppercase">WORK {String(idx+1).padStart(2, '0')}</span>
                    <h3 className="font-black text-3xl text-white tracking-tighter uppercase">{work.title || 'UNTITLED'}</h3>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); setWorks(works.filter(w => w.id !== work.id)); }} className="text-neutral-700 hover:text-red-500 transition-colors p-3"><Trash2 size={24} /></button>
                </div>

                {editingWorkId === work.id && (
                  <div className="p-10 border-t border-white/5 space-y-16 bg-white/[0.01]">
                    <div className="grid md:grid-cols-2 gap-12">
                      <div className="space-y-8">
                        <Input label="PROJECT TITLE" value={work.title} onChange={v => setWorks(works.map(w => w.id === work.id ? {...w, title: v} : w))} />
                        <Input label="SUBTITLE / CATEGORY" value={work.subtitle} onChange={v => setWorks(works.map(w => w.id === work.id ? {...w, subtitle: v} : w))} />
                        <Input 
                          label="YOUTUBE URL / IFRAME" 
                          value={work.videoUrl} 
                          onChange={v => setWorks(works.map(w => w.id === work.id ? {...w, videoUrl: v} : w))} 
                          placeholder="Shorts, watch, iframe 태그 모두 가능"
                        />
                      </div>
                      <TextArea label="CORE INTENT" value={work.intent} onChange={v => setWorks(works.map(w => w.id === work.id ? {...w, intent: v} : w))} className="min-h-[240px]" />
                    </div>
                    {/* 세부 항목 편집 로직 생략(기존 유지) */}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-32 pt-16 border-t border-white/5 flex justify-center">
        <button onClick={handleUnifiedSave} disabled={isSaving} className={`w-full max-w-lg h-24 flex items-center justify-center gap-6 rounded-none font-black text-2xl tracking-tighter transition-all shadow-2xl ${isSaving ? 'bg-neutral-800 text-neutral-500' : 'bg-[#11d493] text-black hover:scale-[1.02] shadow-[0_0_50px_rgba(17,212,147,0.3)]'}`}>
          {isSaving ? <div className="w-10 h-10 border-4 border-neutral-600 border-t-black rounded-full animate-spin"></div> : <><Save size={32} /> COMMIT CHANGES</>}
        </button>
      </div>
    </div>
  );
};

const Input = ({ label, value, onChange, placeholder }: { label: string, value: string, onChange: (v: string) => void, placeholder?: string }) => (
  <div className="space-y-2 w-full">
    <label className="text-[10px] font-black text-[#11d493] uppercase tracking-[0.4em] ml-1">{label}</label>
    <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="w-full bg-white/[0.04] border border-white/10 rounded-none px-6 py-4 text-base font-bold text-white outline-none focus:border-[#11d493] transition-all" />
  </div>
);

const TextArea = ({ label, value, onChange, className = "" }: { label: string, value: string, onChange: (v: string) => void, className?: string }) => (
  <div className={`flex flex-col space-y-2 ${className}`}>
    <label className="text-[10px] font-black text-[#11d493] uppercase tracking-[0.4em] ml-1">{label}</label>
    <textarea value={value} onChange={e => onChange(e.target.value)} className={`w-full bg-white/[0.04] border border-white/10 rounded-none px-6 py-5 text-base font-bold text-white outline-none focus:border-[#11d493] transition-all resize-none leading-relaxed flex-1 ${className}`} />
  </div>
);

export default Admin;
