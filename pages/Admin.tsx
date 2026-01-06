
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Plus, Trash2, FileText, X, Instagram, Briefcase, GraduationCap, Cpu, Workflow, Link as LinkIcon, Home, LogOut } from 'lucide-react';
import { getWorks, saveWorks, getPhilosophy, savePhilosophy, getResume, saveResume } from '../services/dataStore';
import { PortfolioItem, PhilosophyData, ResumeData } from '../types';

type Tab = 'philosophy' | 'resume' | 'works';

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
      
      await new Promise(r => setTimeout(r, 800));
      alert('데이터가 성공적으로 업데이트되었습니다.');
      navigate('/');
    } catch (error) {
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  const addWork = () => {
    const newItem: PortfolioItem = {
      id: Date.now().toString(),
      projectLabel: `PROJECT ${String(works.length + 1).padStart(2, '0')}`,
      title: '새 프로젝트', subtitle: '장르 / 카테고리', videoUrl: '', thumbnailUrl: '',
      intent: '', details: [{ label: '맥락(CONTEXT)', value: '' }]
    };
    setWorks([...works, newItem]);
    setEditingWorkId(newItem.id);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505] p-6">
        <form onSubmit={handleLogin} className="glass p-8 rounded-none w-full max-w-xs space-y-6 border border-[#11d493]/20 shadow-2xl">
          <div className="text-center">
            <h2 className="text-xl md:text-2xl font-black text-[#11d493] tracking-tight uppercase italic">ADMIN ACCESS</h2>
          </div>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 focus:border-[#11d493] transition-all outline-none text-center text-base md:text-lg text-white"
            placeholder="PASSWORD"
            autoFocus
          />
          <button className="w-full bg-[#11d493] text-black font-black py-3 rounded-none hover:brightness-110 tracking-widest uppercase text-xs md:text-sm transition-all">ENTER</button>
        </form>
      </div>
    );
  }

  const tabLabels: Record<Tab, string> = {
    philosophy: '철학',
    resume: '이력서',
    works: '작업물'
  };

  return (
    <div className="pt-24 md:pt-32 pb-48 max-w-6xl mx-auto px-4 md:px-6">
      <div className="flex flex-row justify-between items-center mb-8 md:mb-10 gap-4">
        <h1 className="text-xl md:text-5xl font-black text-white tracking-tighter uppercase italic">시스템 설정</h1>
        <button 
          onClick={() => setIsAuthenticated(false)} 
          className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-white/5 rounded-none text-neutral-400 font-black text-[9px] md:text-xs uppercase hover:text-white transition-colors"
        >
          <LogOut size={12} className="md:w-4 md:h-4" />
          <span className="hidden xs:inline">로그아웃</span>
        </button>
      </div>

      <div className="flex gap-1 mb-10 md:mb-12 p-1 glass rounded-none w-full border border-white/10 overflow-x-auto no-scrollbar scroll-smooth">
        {(['philosophy', 'resume', 'works'] as Tab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 min-w-[90px] md:flex-none px-4 md:px-10 py-3 md:py-4 rounded-none text-[9px] md:text-xs font-black transition-all uppercase tracking-widest whitespace-nowrap ${
              activeTab === tab ? 'bg-[#11d493] text-black' : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            {tabLabels[tab]}
          </button>
        ))}
      </div>

      <div className="min-h-[500px]">
        {/* 철학 탭 */}
        {activeTab === 'philosophy' && philosophy && (
          <div className="space-y-10 md:space-y-16 animate-in fade-in duration-500">
            <section className="glass p-5 md:p-10 border-l-4 border-[#11d493]">
              <h2 className="text-lg md:text-2xl font-black text-white uppercase mb-6 md:mb-8 flex items-center gap-3 italic">
                <FileText size={18} className="text-[#11d493] md:w-5 md:h-5"/> 히어로 섹션
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
                <TextArea label="메인 타이틀 (*강조단어*)" value={philosophy.heroTitle} onChange={v => setPhilosophy({...philosophy, heroTitle: v})} />
                <TextArea label="히어로 서브타이틀" value={philosophy.heroSubtitle} onChange={v => setPhilosophy({...philosophy, heroSubtitle: v})} />
              </div>
            </section>
            
            <section className="glass p-5 md:p-10 border-l-4 border-[#11d493]">
              <div className="flex justify-between items-center mb-6 md:mb-8">
                <h2 className="text-lg md:text-2xl font-black text-white uppercase italic">핵심 원칙</h2>
                <button onClick={() => setPhilosophy({...philosophy, principles: [...philosophy.principles, { title: '', desc: '' }]})} className="p-2 md:p-3 bg-white/5 hover:bg-[#11d493] hover:text-black transition-all"><Plus size={16} className="md:w-[18px] md:h-[18px]" /></button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
                {philosophy.principles.map((p, i) => (
                  <div key={i} className="flex flex-col space-y-4 glass p-6 relative group border-white/5">
                    <button onClick={() => setPhilosophy({...philosophy, principles: philosophy.principles.filter((_, idx) => idx !== i)})} className="absolute -top-2 -right-2 w-6 h-6 md:w-7 md:h-7 bg-red-500 text-white flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all z-20"><X size={12}/></button>
                    <Input label="제목" value={p.title} onChange={v => { const n = [...philosophy.principles]; n[i].title = v; setPhilosophy({...philosophy, principles: n}); }} />
                    <TextArea label="설명" value={p.desc} onChange={v => { const n = [...philosophy.principles]; n[i].desc = v; setPhilosophy({...philosophy, principles: n}); }} className="min-h-[100px]" />
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* 이력서 탭 */}
        {activeTab === 'resume' && resume && (
          <div className="space-y-10 md:space-y-16 animate-in fade-in duration-500">
            <section className="glass p-5 md:p-10 border-l-4 border-[#11d493] space-y-6 md:space-y-8">
              <h2 className="text-lg md:text-2xl font-black text-white uppercase italic">기본 프로필</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
                <Input label="이름" value={resume.name} onChange={v => setResume({...resume, name: v})} />
                <Input label="생년월일" value={resume.birthDate || ''} onChange={v => setResume({...resume, birthDate: v})} />
                <Input label="이메일" value={resume.email} onChange={v => setResume({...resume, email: v})} />
                <Input label="연락처" value={resume.phone} onChange={v => setResume({...resume, phone: v})} />
                <Input label="위치" value={resume.location} onChange={v => setResume({...resume, location: v})} />
              </div>
              <TextArea label="전문가 요약" value={resume.summary} onChange={v => setResume({...resume, summary: v})} className="min-h-[80px]" />
            </section>
          </div>
        )}

        {/* 포트폴리오 탭 */}
        {activeTab === 'works' && (
          <div className="space-y-10 md:space-y-16 animate-in fade-in duration-500">
            <button onClick={addWork} className="w-full py-10 md:py-20 glass border-dashed border-[#11d493]/30 flex flex-col items-center gap-4 md:gap-6 group hover:border-[#11d493] transition-all">
              <div className="w-12 h-12 md:w-20 md:h-20 bg-white/5 flex items-center justify-center group-hover:bg-[#11d493] group-hover:text-black transition-all"><Plus size={24} className="md:w-8 md:h-8" /></div>
              <span className="font-black text-lg md:text-2xl tracking-tighter uppercase italic text-center px-4">새 포트폴리오 추가</span>
            </button>
            
            <div className="space-y-5 md:space-y-8">
              {works.map((work, idx) => (
                <div key={work.id} className="glass overflow-hidden group border-white/5 hover:border-[#11d493]/20 transition-all">
                  <div className="p-5 md:p-10 flex justify-between items-center cursor-pointer hover:bg-white/[0.02]" onClick={() => setEditingWorkId(editingWorkId === work.id ? null : work.id)}>
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-10">
                      <span className="text-[9px] md:text-sm font-black text-[#11d493] bg-[#11d493]/10 px-2.5 md:px-4 py-1 md:py-2 uppercase italic whitespace-nowrap">{work.projectLabel || `PROJECT ${idx+1}`}</span>
                      <h3 className="font-black text-base md:text-3xl text-white tracking-tighter uppercase truncate max-w-[140px] sm:max-w-[200px] md:max-w-none">{work.title || '제목 없음'}</h3>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); setWorks(works.filter(w => w.id !== work.id)); }} className="text-neutral-700 hover:text-red-500 transition-colors p-2"><Trash2 size={18} className="md:w-5 md:h-5" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-6 md:bottom-12 left-0 right-0 z-[60] flex justify-center px-4 md:px-6">
        <button 
          onClick={handleUnifiedSave}
          disabled={isSaving}
          className={`w-full max-w-lg h-14 md:h-24 flex items-center justify-center gap-3 md:gap-6 rounded-none font-black text-xs md:text-2xl tracking-tighter transition-all shadow-2xl ${
            isSaving ? 'bg-neutral-800 text-neutral-500' : 'bg-[#11d493] text-black hover:scale-[1.02] md:hover:scale-[1.05] shadow-[0_0_50px_rgba(17,212,147,0.3)]'
          }`}
        >
          {isSaving ? <div className="w-5 h-5 md:w-8 md:h-8 border-2 md:border-4 border-neutral-600 border-t-black rounded-full animate-spin"></div> : <><Save size={18} className="md:w-8 md:h-8" /> 변경사항 저장하기</>}
        </button>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        @media (max-width: 400px) {
          .xs\:inline { display: none; }
        }
      `}</style>
    </div>
  );
};

const Input = ({ label, value, onChange, placeholder }: { label: string, value: string, onChange: (v: string) => void, placeholder?: string }) => (
  <div className="space-y-1.5 md:space-y-2 w-full">
    <label className="text-[8px] md:text-[10px] font-black text-[#11d493] uppercase tracking-[0.4em] ml-1">{label}</label>
    <input 
      value={value} 
      onChange={e => onChange(e.target.value)} 
      placeholder={placeholder}
      className="w-full bg-white/[0.04] border border-white/10 rounded-none px-4 py-2.5 md:py-4 text-xs md:text-base font-bold text-white outline-none focus:border-[#11d493] transition-all placeholder:text-neutral-700" 
    />
  </div>
);

const TextArea = ({ label, value, onChange, className = "" }: { label: string, value: string, onChange: (v: string) => void, className?: string }) => (
  <div className={`flex flex-col space-y-1.5 md:space-y-2 ${className}`}>
    <label className="text-[8px] md:text-[10px] font-black text-[#11d493] uppercase tracking-[0.4em] ml-1">{label}</label>
    <textarea 
      value={value} 
      onChange={e => onChange(e.target.value)} 
      className={`w-full bg-white/[0.04] border border-white/10 rounded-none px-4 py-3 md:py-5 text-xs md:text-base font-bold text-white outline-none focus:border-[#11d493] transition-all resize-none leading-relaxed flex-1 ${className}`} 
    />
  </div>
);

export default Admin;
