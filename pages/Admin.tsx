
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Plus, Trash2, FileText, X, Instagram, Briefcase, GraduationCap, Cpu, Workflow, Link as LinkIcon, Home } from 'lucide-react';
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
      <div className="min-h-screen flex items-center justify-center bg-black p-6">
        <form onSubmit={handleLogin} className="glass p-10 rounded-none w-full max-w-md space-y-8 border-2 border-[#11d493]/20">
          <div className="text-center">
            <h2 className="text-4xl font-black text-[#11d493] tracking-tighter uppercase italic">관리자 접속</h2>
          </div>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-none px-6 py-4 focus:border-[#11d493] transition-all outline-none text-center text-xl tracking-[0.5em]"
            placeholder="••••"
            autoFocus
          />
          <button className="w-full bg-[#11d493] text-black font-black py-4 rounded-none hover:brightness-110 tracking-widest uppercase">로그인</button>
        </form>
      </div>
    );
  }

  const tabLabels: Record<Tab, string> = {
    philosophy: '철학 (Philosophy)',
    resume: '이력서 (Resume)',
    works: '포트폴리오 (Works)'
  };

  return (
    <div className="pt-32 pb-48 max-w-6xl mx-auto px-6">
      <div className="flex justify-between items-end mb-16">
        <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic">시스템 설정</h1>
        <button onClick={() => setIsAuthenticated(false)} className="px-6 py-2 bg-white/5 rounded-none text-neutral-400 font-black text-xs uppercase hover:text-white transition-colors">로그아웃</button>
      </div>

      <div className="flex gap-2 mb-16 p-1 glass rounded-none w-fit border border-white/10 overflow-x-auto">
        {(['philosophy', 'resume', 'works'] as Tab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-10 py-4 rounded-none text-xs font-black transition-all uppercase tracking-widest whitespace-nowrap ${
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
          <div className="space-y-16 animate-in fade-in duration-500">
            <section className="glass p-10 border-l-4 border-[#11d493]">
              <h2 className="text-2xl font-black text-white uppercase mb-10 flex items-center gap-3 italic">
                <FileText size={24} className="text-[#11d493]"/> 히어로 섹션
              </h2>
              <div className="grid md:grid-cols-2 gap-12">
                <TextArea label="메인 타이틀 (*강조단어* 입력 시 녹색 표시)" value={philosophy.heroTitle} onChange={v => setPhilosophy({...philosophy, heroTitle: v})} />
                <TextArea label="히어로 서브타이틀" value={philosophy.heroSubtitle} onChange={v => setPhilosophy({...philosophy, heroSubtitle: v})} />
              </div>
            </section>
            
            <section className="glass p-10 border-l-4 border-[#11d493]">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-black text-white uppercase italic">핵심 원칙 (Core Principles)</h2>
                <button onClick={() => setPhilosophy({...philosophy, principles: [...philosophy.principles, { title: '', desc: '' }]})} className="p-3 bg-white/5 hover:bg-[#11d493] hover:text-black transition-all"><Plus size={20}/></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {philosophy.principles.map((p, i) => (
                  <div key={i} className="flex flex-col space-y-6 glass p-8 relative group border-white/5">
                    <button onClick={() => setPhilosophy({...philosophy, principles: philosophy.principles.filter((_, idx) => idx !== i)})} className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-20"><X size={16}/></button>
                    <Input label="제목" value={p.title} onChange={v => { const n = [...philosophy.principles]; n[i].title = v; setPhilosophy({...philosophy, principles: n}); }} />
                    <TextArea label="설명" value={p.desc} onChange={v => { const n = [...philosophy.principles]; n[i].desc = v; setPhilosophy({...philosophy, principles: n}); }} className="min-h-[120px]" />
                  </div>
                ))}
              </div>
            </section>

            <section className="glass p-10 border-l-4 border-[#11d493]">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-black text-white uppercase italic flex items-center gap-3"><Workflow size={24} className="text-[#11d493]"/> 작업 프로세스 (Working Process)</h2>
                <button onClick={() => setPhilosophy({...philosophy, process: [...philosophy.process, { title: '', desc: '' }]})} className="p-3 bg-white/5 hover:bg-[#11d493] hover:text-black transition-all"><Plus size={20}/></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {philosophy.process.map((item, i) => (
                  <div key={i} className="flex flex-col space-y-4 glass p-6 relative group border-white/5">
                    <button onClick={() => setPhilosophy({...philosophy, process: philosophy.process.filter((_, idx) => idx !== i)})} className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-20"><X size={16}/></button>
                    <span className="text-3xl font-black text-neutral-800 italic">{String(i+1).padStart(2, '0')}</span>
                    <Input label="단계 이름" value={item.title} onChange={v => { const n = [...philosophy.process]; n[i].title = v; setPhilosophy({...philosophy, process: n}); }} />
                    <TextArea label="상세 설명" value={item.desc} onChange={v => { const n = [...philosophy.process]; n[i].desc = v; setPhilosophy({...philosophy, process: n}); }} className="min-h-[80px]" />
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* 이력서 탭 */}
        {activeTab === 'resume' && resume && (
          <div className="space-y-16 animate-in fade-in duration-500">
            <section className="glass p-10 border-l-4 border-[#11d493] space-y-10">
              <h2 className="text-2xl font-black text-white uppercase italic">기본 프로필</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <Input label="이름" value={resume.name} onChange={v => setResume({...resume, name: v})} />
                <Input label="이메일" value={resume.email} onChange={v => setResume({...resume, email: v})} />
                <Input label="연락처" value={resume.phone} onChange={v => setResume({...resume, phone: v})} />
                <Input label="위치 (도시)" value={resume.location} onChange={v => setResume({...resume, location: v})} />
              </div>
              <div className="grid md:grid-cols-1 gap-8">
                <Input label="상세 주소" value={resume.address || ''} onChange={v => setResume({...resume, address: v})} placeholder="상세 주소를 입력하세요" />
              </div>
              <TextArea label="전문가 요약 (Summary)" value={resume.summary} onChange={v => setResume({...resume, summary: v})} className="min-h-[100px]" />
              <div className="grid md:grid-cols-2 gap-8 pt-6 border-t border-white/5">
                <Input label="인스타그램 링크" value={resume.instagram || ''} onChange={v => setResume({...resume, instagram: v})} placeholder="https://instagram.com/..." />
                <Input label="포트폴리오 더보기 링크" value={resume.moreWorksUrl || ''} onChange={v => setResume({...resume, moreWorksUrl: v})} placeholder="https://notion.so/..." />
              </div>
            </section>

            <section className="glass p-10 border-l-4 border-[#11d493]">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-black text-white uppercase italic flex items-center gap-3"><Cpu size={24} className="text-[#11d493]"/> 기술 스택 (Tech Stack)</h2>
                <button onClick={() => setResume({...resume, techStack: [...resume.techStack, { name: '', description: '' }]})} className="p-3 bg-white/5 hover:bg-[#11d493] hover:text-black transition-all"><Plus size={20}/></button>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {resume.techStack.map((tech, i) => (
                  <div key={i} className="glass p-8 relative group border-white/5 space-y-6">
                    <button onClick={() => setResume({...resume, techStack: resume.techStack.filter((_, idx) => idx !== i)})} className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-20"><X size={16}/></button>
                    <Input label="기술 / 도구명" value={tech.name} onChange={v => { const n = [...resume.techStack]; n[i].name = v; setResume({...resume, techStack: n}); }} />
                    <TextArea label="상세 활용 내용" value={tech.description} onChange={v => { const n = [...resume.techStack]; n[i].description = v; setResume({...resume, techStack: n}); }} className="min-h-[80px]" />
                  </div>
                ))}
              </div>
            </section>

            <section className="glass p-10 border-l-4 border-[#11d493]">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-black text-white uppercase italic flex items-center gap-3"><Briefcase size={24} className="text-[#11d493]"/> 경력 및 프로젝트 (Experience)</h2>
                <button onClick={() => setResume({...resume, experience: [...resume.experience, { title: '', period: '', description: '' }]})} className="p-3 bg-white/5 hover:bg-[#11d493] hover:text-black transition-all"><Plus size={20}/></button>
              </div>
              <div className="space-y-10">
                {resume.experience.map((exp, i) => (
                  <div key={i} className="glass p-8 relative group border-white/5 grid md:grid-cols-3 gap-8">
                    <button onClick={() => setResume({...resume, experience: resume.experience.filter((_, idx) => idx !== i)})} className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-20"><X size={16}/></button>
                    <Input label="프로젝트 / 역할" value={exp.title} onChange={v => { const n = [...resume.experience]; n[i].title = v; setResume({...resume, experience: n}); }} />
                    <Input label="수행 기간" value={exp.period} onChange={v => { const n = [...resume.experience]; n[i].period = v; setResume({...resume, experience: n}); }} />
                    <div className="md:col-span-3">
                      <TextArea label="상세 설명" value={exp.description} onChange={v => { const n = [...resume.experience]; n[i].description = v; setResume({...resume, experience: n}); }} className="min-h-[100px]" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="glass p-10 border-l-4 border-[#11d493]">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-black text-white uppercase italic flex items-center gap-3"><GraduationCap size={24} className="text-[#11d493]"/> 학력 (Education)</h2>
                <button onClick={() => setResume({...resume, education: [...(resume.education || []), { school: '', major: '', status: '' }]})} className="p-3 bg-white/5 hover:bg-[#11d493] hover:text-black transition-all"><Plus size={20}/></button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(resume.education || []).map((edu, i) => (
                  <div key={i} className="glass p-8 relative group border-white/5 space-y-4">
                    <button onClick={() => setResume({...resume, education: resume.education.filter((_, idx) => idx !== i)})} className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-20"><X size={16}/></button>
                    <Input label="학교명" value={edu.school} onChange={v => { const n = [...resume.education]; n[i].school = v; setResume({...resume, education: n}); }} />
                    <Input label="전공" value={edu.major} onChange={v => { const n = [...resume.education]; n[i].major = v; setResume({...resume, education: n}); }} />
                    <Input label="상태 (예: 졸업, 재학)" value={edu.status} onChange={v => { const n = [...resume.education]; n[i].status = v; setResume({...resume, education: n}); }} />
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* 포트폴리오 탭 */}
        {activeTab === 'works' && (
          <div className="space-y-16 animate-in fade-in duration-500">
            <button onClick={addWork} className="w-full py-20 glass border-dashed border-[#11d493]/30 flex flex-col items-center gap-6 group hover:border-[#11d493] transition-all">
              <div className="w-20 h-20 bg-white/5 flex items-center justify-center group-hover:bg-[#11d493] group-hover:text-black transition-all"><Plus size={40} /></div>
              <span className="font-black text-2xl tracking-tighter uppercase italic">새 포트폴리오 추가</span>
            </button>
            
            {works.map((work, idx) => (
              <div key={work.id} className="glass overflow-hidden group border-white/5 hover:border-[#11d493]/20 transition-all">
                <div className="p-10 flex justify-between items-center cursor-pointer hover:bg-white/[0.02]" onClick={() => setEditingWorkId(editingWorkId === work.id ? null : work.id)}>
                  <div className="flex items-center gap-10">
                    <span className="text-sm font-black text-[#11d493] bg-[#11d493]/10 px-4 py-2 uppercase italic">{work.projectLabel || `PROJECT ${idx+1}`}</span>
                    <h3 className="font-black text-3xl text-white tracking-tighter uppercase">{work.title || '제목 없음'}</h3>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); setWorks(works.filter(w => w.id !== work.id)); }} className="text-neutral-700 hover:text-red-500 transition-colors p-3"><Trash2 size={24} /></button>
                </div>

                {editingWorkId === work.id && (
                  <div className="p-10 border-t border-white/5 space-y-16 bg-white/[0.01]">
                    <div className="grid md:grid-cols-2 gap-12">
                      <div className="space-y-8">
                        <Input label="프로젝트 라벨 (예: PROJECT 01)" value={work.projectLabel || ''} onChange={v => setWorks(works.map(w => w.id === work.id ? {...w, projectLabel: v} : w))} />
                        <Input label="프로젝트 제목" value={work.title} onChange={v => setWorks(works.map(w => w.id === work.id ? {...w, title: v} : w))} />
                        <Input label="부제목 / 카테고리" value={work.subtitle} onChange={v => setWorks(works.map(w => w.id === work.id ? {...w, subtitle: v} : w))} />
                        <Input label="유튜브 영상 ID" value={work.videoUrl} onChange={v => setWorks(works.map(w => w.id === work.id ? {...w, videoUrl: v} : w))} placeholder="dQw4w9WgXcQ (URL 전체가 아닌 ID값)" />
                      </div>
                      <TextArea label="하이라이트 문구 (Intent)" value={work.intent} onChange={v => setWorks(works.map(w => w.id === work.id ? {...w, intent: v} : w))} className="min-h-[240px]" />
                    </div>

                    <div className="space-y-8">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs font-black text-[#11d493] tracking-[0.4em] uppercase italic">기술적 세부 사항 (Details)</h4>
                        <button onClick={() => setWorks(works.map(w => w.id === work.id ? { ...w, details: [...w.details, { label: '', value: '' }] } : w))} className="p-2 bg-white/5 hover:bg-[#11d493] hover:text-black transition-all"><Plus size={16}/></button>
                      </div>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {work.details.map((detail, dIdx) => (
                          <div key={dIdx} className="glass p-8 space-y-6 relative group/detail border-white/10">
                            <button onClick={() => {
                              const n = work.details.filter((_, idx) => idx !== dIdx);
                              setWorks(works.map(w => w.id === work.id ? {...w, details: n} : w));
                            }} className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 text-white flex items-center justify-center opacity-0 group-hover/detail:opacity-100 transition-all z-10"><X size={16}/></button>
                            <Input label="항목명" value={detail.label} onChange={v => {
                              const n = [...work.details]; n[dIdx].label = v;
                              setWorks(works.map(w => w.id === work.id ? {...w, details: n} : w));
                            }} />
                            <TextArea label="내용" value={detail.value} onChange={v => {
                              const n = [...work.details]; n[dIdx].value = v;
                              setWorks(works.map(w => w.id === work.id ? {...w, details: n} : w));
                            }} className="min-h-[100px]" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="fixed bottom-12 left-0 right-0 z-[60] flex justify-center px-6">
        <button 
          onClick={handleUnifiedSave}
          disabled={isSaving}
          className={`w-full max-w-lg h-24 flex items-center justify-center gap-6 rounded-none font-black text-2xl tracking-tighter transition-all shadow-2xl ${
            isSaving ? 'bg-neutral-800 text-neutral-500' : 'bg-[#11d493] text-black hover:scale-[1.05] shadow-[0_0_50px_rgba(17,212,147,0.3)]'
          }`}
        >
          {isSaving ? <div className="w-10 h-10 border-4 border-neutral-600 border-t-black rounded-full animate-spin"></div> : <><Save size={32} /> 변경사항 저장하기</>}
        </button>
      </div>
    </div>
  );
};

const Input = ({ label, value, onChange, placeholder }: { label: string, value: string, onChange: (v: string) => void, placeholder?: string }) => (
  <div className="space-y-2 w-full">
    <label className="text-[10px] font-black text-[#11d493] uppercase tracking-[0.4em] ml-1">{label}</label>
    <input 
      value={value} 
      onChange={e => onChange(e.target.value)} 
      placeholder={placeholder}
      className="w-full bg-white/[0.04] border border-white/10 rounded-none px-6 py-4 text-base font-bold text-white outline-none focus:border-[#11d493] transition-all placeholder:text-neutral-700" 
    />
  </div>
);

const TextArea = ({ label, value, onChange, className = "" }: { label: string, value: string, onChange: (v: string) => void, className?: string }) => (
  <div className={`flex flex-col space-y-2 ${className}`}>
    <label className="text-[10px] font-black text-[#11d493] uppercase tracking-[0.4em] ml-1">{label}</label>
    <textarea 
      value={value} 
      onChange={e => onChange(e.target.value)} 
      className={`w-full bg-white/[0.04] border border-white/10 rounded-none px-6 py-5 text-base font-bold text-white outline-none focus:border-[#11d493] transition-all resize-none leading-relaxed flex-1 ${className}`} 
    />
  </div>
);

export default Admin;
