
import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPhilosophy } from '../services/dataStore';
import { PhilosophyData } from '../types';

const Philosophy: React.FC = () => {
  const [data, setData] = useState<PhilosophyData | null>(null);

  useEffect(() => {
    setData(getPhilosophy());
  }, []);

  if (!data) return null;

  const renderHighlightedTitle = (text: string) => {
    const parts = text.split(/(\*[^*]+\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('*') && part.endsWith('*')) {
        return <span key={`part-${i}`} className="text-[#11d493]">{part.slice(1, -1)}</span>;
      }
      return part;
    });
  };

  return (
    <div className="pt-32 pb-48 max-w-6xl mx-auto px-6">
      {/* 히어로 섹션 - 폰트 크기를 요청에 맞춰 약간 더 축소 (lg:9xl -> lg:8xl) */}
      <section className="mb-24 md:mb-32">
        <h1 className="text-4xl md:text-7xl lg:text-8xl font-black mb-12 leading-[1.1] md:leading-[1.05] tracking-tighter text-white uppercase whitespace-pre-line">
          {renderHighlightedTitle(data.heroTitle)}
        </h1>
        <p className="text-lg md:text-2xl text-neutral-400 font-bold max-w-3xl leading-relaxed tracking-tight whitespace-pre-line">
          {data.heroSubtitle}
        </p>
      </section>

      {/* 하단 이동 버튼 섹션 */}
      <section className="text-center pt-12 border-t border-white/5">
        <div className="flex justify-center">
          <Link 
            to="/resume" 
            className="inline-flex items-center gap-4 bg-[#11d493] text-black px-10 md:px-16 py-5 md:py-6 rounded-full font-black text-lg md:text-xl tracking-tighter hover:brightness-110 transition-all group shadow-[0_0_30px_rgba(17,212,147,0.2)]"
          >
            RESUME <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Philosophy;
