
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getWorks } from '../services/dataStore';
import { PortfolioItem } from '../types';

const Works: React.FC = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    setItems(getWorks());
  }, []);

  if (items.length === 0) return (
    <div className="pt-40 text-center text-neutral-500 font-black tracking-tighter">NO WORKS REGISTERED.</div>
  );

  // 강력한 유튜브 ID 추출 함수 (Admin과 동일한 로직 적용)
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

  const getEmbedUrl = (input: string) => {
    const videoId = extractYoutubeId(input);
    if (!videoId) return input;

    // 오류 153 해결을 위한 보안 파라미터 구성
    const origin = window.location.origin;
    const params = new URLSearchParams({
      rel: '0',
      modestbranding: '1',
      enablejsapi: '1', // API 핸드쉐이크 허용
      origin: origin,   // 보안을 위한 필수 파라미터
      autoplay: '0'
    });

    return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
  };

  return (
    <div className="pt-20 min-h-screen bg-black overflow-x-hidden">
      {items.map((item, idx) => {
        const videoId = extractYoutubeId(item.videoUrl);
        return (
          <section key={item.id} className="min-h-screen flex flex-col items-center justify-start py-32 px-6 border-b border-white/5 last:border-0 animate-in fade-in duration-1000">
            <div className="max-w-6xl w-full">
              {/* Header */}
              <div className="mb-16 text-center">
                <span className="text-accent-green font-black text-xs tracking-[0.4em] mb-4 block uppercase">Project {String(idx + 1).padStart(2, '0')}</span>
                <h1 className="text-6xl md:text-9xl font-black text-white mb-8 tracking-tighter leading-none uppercase">{item.title}</h1>
                <p className="text-neutral-500 text-2xl md:text-3xl font-black tracking-tight uppercase">{item.subtitle}</p>
              </div>

              {/* Video Player - 16:9 Responsive */}
              <div className="w-full aspect-[16/9] bg-neutral-900 rounded-[32px] overflow-hidden border border-white/10 shadow-[0_60px_120px_rgba(0,0,0,0.9)] mb-32 relative group">
                <iframe 
                  key={videoId || item.id} // ID 변경 시 iframe 완전 재렌더링 강제
                  className="absolute inset-0 w-full h-full"
                  src={getEmbedUrl(item.videoUrl)} 
                  title={item.title}
                  frameBorder="0"
                  // 중요: 보안 정책 완화하여 유튜브 서버와의 통신 허용
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Detailed Content */}
              <div className="space-y-40">
                {/* Main Intent Highlight */}
                <div className="max-w-5xl mx-auto text-center">
                  <h2 className="text-[10px] font-black uppercase tracking-[0.8em] text-accent-green/40 mb-12">CORE INTENT</h2>
                  <p className="text-4xl md:text-7xl font-black text-white leading-[1.05] tracking-tighter whitespace-pre-line uppercase">
                    "{item.intent}"
                  </p>
                </div>

                {/* Dynamic Details - Large Text, No Icons */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
                  {item.details.map((detail, dIdx) => (
                    <div key={dIdx} className="space-y-6 text-center md:text-left">
                      <h3 className="text-[10px] font-black uppercase tracking-[0.6em] text-neutral-700">{detail.label}</h3>
                      <p className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none uppercase">{detail.value}</p>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                {(item.ctaButtonName && item.ctaLink) && (
                  <div className="flex justify-center pt-20">
                    <Link 
                      to={item.ctaLink} 
                      className="group relative flex items-center gap-4 bg-white text-black px-16 py-8 rounded-full font-black text-xl tracking-tighter hover:bg-accent-green transition-all"
                    >
                      {item.ctaButtonName}
                      <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default Works;
