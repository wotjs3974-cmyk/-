
import React, { useEffect, useState } from 'react';
import { ArrowRight, Zap, Eye, Boxes, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPhilosophy } from '../services/dataStore';
import { PhilosophyData } from '../types';

const Philosophy: React.FC = () => {
  const [data, setData] = useState<PhilosophyData | null>(null);

  useEffect(() => {
    setData(getPhilosophy());
  }, []);

  if (!data) return null;

  const getIcon = (index: number) => {
    const icons = [
      <Zap className="text-[#11d493] mb-2" size={32} />,
      <Eye className="text-[#11d493] mb-2" size={32} />,
      <Boxes className="text-[#11d493] mb-2" size={32} />,
      <Activity className="text-[#11d493] mb-2" size={32} />
    ];
    return icons[index % icons.length];
  };

  // *텍스트* 형식의 문자열을 파싱하여 특정 단어에 색상을 입힘
  const renderHighlightedTitle = (text: string) => {
    const parts = text.split(/(\*[^*]+\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('*') && part.endsWith('*')) {
        return <span key={i} className="text-[#11d493]">{part.slice(1, -1)}</span>;
      }
      return part;
    });
  };

  return (
    <div className="pt-32 pb-20 max-w-5xl mx-auto px-6">
      <section className="mb-32">
        <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[0.95] tracking-tighter text-white uppercase whitespace-pre-line">
          {renderHighlightedTitle(data.heroTitle)}
        </h1>
        <p className="text-xl md:text-2xl text-neutral-400 font-bold max-w-3xl leading-relaxed uppercase tracking-tight">
          {data.heroSubtitle}
        </p>
      </section>

      {data.principles && data.principles.length > 0 && (
        <section className="mb-32">
          <h2 className="text-base md:text-lg font-black uppercase tracking-[0.15em] text-[#11d493] mb-12 italic">핵심 철학 (Core Philosophy)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {data.principles.map((p, i) => (
              <div key={i} className="space-y-4">
                {getIcon(i)}
                <h3 className="text-xl font-black uppercase tracking-tight">{p.title}</h3>
                <p className="text-neutral-500 leading-relaxed text-sm">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.process && data.process.length > 0 && (
        <section className="mb-32">
          <h2 className="text-base md:text-lg font-black uppercase tracking-[0.15em] text-[#11d493] mb-12 italic">작업 프로세스 (Working Process)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.process.map((item, idx) => (
              <div key={idx} className="glass p-6 rounded-2xl border border-white/5 flex flex-col justify-between aspect-square group hover:border-[#11d493]/30 transition-all cursor-default">
                <span className="text-4xl font-black text-neutral-800 group-hover:text-[#11d493]/20 transition-colors">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div>
                  <h4 className="font-black text-lg mb-1 uppercase">{item.title}</h4>
                  <p className="text-xs text-neutral-500 leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="text-center pt-10 border-t border-white/5">
        <div className="flex justify-center">
          <Link 
            to="/resume" 
            className="inline-flex items-center gap-4 bg-[#11d493] text-black px-16 py-6 rounded-full font-black text-xl tracking-tighter hover:brightness-110 transition-all group shadow-[0_0_30px_rgba(17,212,147,0.2)]"
          >
            RESUME <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Philosophy;
