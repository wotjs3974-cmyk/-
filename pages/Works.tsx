
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

  // 강력한 유튜브 ID 추출 함수 (해외 전문가 권장 정규식 포함)
  const extractYoutubeId = (input: string) => {
    if (!input) return '';
    let target = input.trim();
    
    // <iframe> 태그인 경우 src 내용만 먼저 추출
    if (target.includes('<iframe')) {
      const srcMatch = target.match(/src=["']([^"']+)["']/);
      if (srcMatch) target = srcMatch[1];
    }

    // 유튜브 ID 추출 정규식 (watch, shorts, embed, youtu.be 모두 대응)
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(shorts\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = target.match(regExp);
    
    // 8번째 캡처 그룹이 11자리 ID임
    const id = (match && match[8] && match[8].length === 11) ? match[8] : target.trim();
    return id.length === 11 ? id : '';
  };

  // 오류 153 해결 및 보안을 위한 임베드 URL 생성기
  const getEmbedUrl = (input: string) => {
    const videoId = extractYoutubeId(input);
    if (!videoId) return '';

    const origin = window.location.origin;
    const params = new URLSearchParams({
      rel: '0',
      modestbranding: '1',
      enablejsapi: '1', // API 핸드쉐이크 허용 (오류 153 방지)
      origin: origin,   // 필수 보안 파라미터
      autoplay: '0'
    });

    return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
  };

  return (
    <div className="pt-20 min-h-screen bg-black overflow-x-hidden">
      {items.map((item, idx) => {
        const videoId = extractYoutubeId(item.videoUrl);
        const embedUrl = getEmbedUrl(item.videoUrl);

        return (
          <section key={item.id} className="min-h-screen flex flex-col items-center justify-start py-32 px-6 border-b border-white/5 last:border-0 animate-in fade-in duration-1000">
            <div className="max-w-6xl w-full">
              {/* Header */}
              <div className="mb-16 text-center">
                <span className="text-accent-green font-black text-xs tracking-[0.4em] mb-4 block uppercase">Project {String(idx + 1).padStart(2, '0')}</span>
                <h1 className="text-6xl md:text-9xl font-black text-white mb-8 tracking-tighter leading-none uppercase">{item.title}</h1>
                <p className="text-neutral-500 text-2xl md:text-3xl font-black tracking-tight uppercase">{item.subtitle}</p>
              </div>

              {/* Video Player */}
              <div className="w-full aspect-[16/9] bg-neutral-900 rounded-[32px] overflow-hidden border border-white/10 shadow-[0_60px_120px_rgba(0,0,0,0.9)] mb-32 relative">
                {embedUrl ? (
                  <iframe 
                    key={videoId || item.id} // 비디오 변경 시 강제 재렌더링
                    className="absolute inset-0 w-full h-full"
                    src={embedUrl}
                    title={item.title}
                    frameBorder="0"
                    referrerPolicy="strict-origin-when-cross-origin" // 보안 정책
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-neutral-700 font-black">VIDEO NOT FOUND</div>
                )}
              </div>

              {/* Detailed Content */}
              <div className="space-y-40">
                <div className="max-w-5xl mx-auto text-center">
                  <h2 className="text-[10px] font-black uppercase tracking-[0.8em] text-accent-green/40 mb-12">CORE INTENT</h2>
                  <p className="text-4xl md:text-7xl font-black text-white leading-[1.05] tracking-tighter whitespace-pre-line uppercase">
                    "{item.intent}"
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
                  {item.details.map((detail, dIdx) => (
                    <div key={dIdx} className="space-y-6 text-center md:text-left">
                      <h3 className="text-[10px] font-black uppercase tracking-[0.6em] text-neutral-700">{detail.label}</h3>
                      <p className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none uppercase">{detail.value}</p>
                    </div>
                  ))}
                </div>

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
