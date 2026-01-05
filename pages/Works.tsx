
import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { getWorks, getResume } from '../services/dataStore';
import { PortfolioItem, ResumeData } from '../types';

const Works: React.FC = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const works = getWorks();
    setItems(works);
    setResume(getResume());
  }, []);

  // Center the active button in the horizontal scroll list
  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeBtn = scrollContainerRef.current.children[currentIndex] as HTMLElement;
      if (activeBtn) {
        const container = scrollContainerRef.current;
        const scrollLeft = activeBtn.offsetLeft - container.offsetWidth / 2 + activeBtn.offsetWidth / 2;
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [currentIndex, items]);

  if (items.length === 0) return (
    <div className="pt-40 text-center text-neutral-500 font-black tracking-tighter uppercase italic">No works registered.</div>
  );

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
    if (!videoId) return '';
    const origin = window.location.origin;
    const params = new URLSearchParams({
      rel: '0',
      modestbranding: '1',
      enablejsapi: '1',
      origin: origin,
      autoplay: '0'
    });
    return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
  };

  const nextProject = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const item = items[currentIndex];
  const videoId = extractYoutubeId(item.videoUrl);
  const embedUrl = getEmbedUrl(item.videoUrl);
  const isLast = currentIndex === items.length - 1;

  return (
    <div className="min-h-screen bg-black flex flex-col pt-32 pb-48 px-6 animate-in fade-in duration-700">
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Project Navigation - Small Box Style */}
        <div className="mb-12 flex justify-center w-full relative">
          <div className="w-full max-w-[800px] flex justify-center">
            <div 
              ref={scrollContainerRef}
              className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 px-4 snap-x"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {items.map((proj, idx) => (
                <button
                  key={proj.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex-none transition-all duration-300 snap-center"
                >
                  <div className={`px-4 py-2 transition-all duration-300 text-center ${
                    currentIndex === idx 
                      ? 'bg-[#11d493]/20 border border-[#11d493] text-[#11d493]' 
                      : 'bg-white/[0.03] border border-white/5 text-neutral-600 hover:text-neutral-400 hover:border-white/10'
                  }`}>
                    <span className="text-[10px] md:text-[11px] font-black tracking-widest uppercase italic whitespace-nowrap block">
                      {proj.projectLabel || `PROJECT ${String(idx + 1).padStart(2, '0')}`}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Project Header - Title size increased */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-3 tracking-tighter leading-none uppercase italic">
            {item.title}
          </h1>
          <p className="text-neutral-500 text-xs md:text-sm font-black tracking-widest uppercase italic">
            {item.subtitle}
          </p>
        </div>

        {/* Video Player - Margin bottom increased */}
        <div className="w-full aspect-[16/9] bg-neutral-900 rounded-[12px] overflow-hidden border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.8)] mb-32 relative">
          {embedUrl ? (
            <iframe 
              key={videoId || item.id}
              className="absolute inset-0 w-full h-full"
              src={embedUrl}
              title={item.title}
              frameBorder="0"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-neutral-800 font-black italic">VIDEO_SOURCE_ERROR</div>
          )}
        </div>

        {/* Content Section */}
        <div className="space-y-16">
          {/* Main Highlight Statement (Intent) */}
          <div className="max-w-4xl mx-auto text-center py-4">
            <p className="text-3xl md:text-5xl font-black text-white leading-[1.1] tracking-tighter whitespace-pre-line uppercase italic">
              "{item.intent}"
            </p>
          </div>

          {/* Details Section - Font sizes adjusted for hierarchy (Intent > Label > Value) */}
          <div className="flex flex-col space-y-10 border-t border-white/5 pt-16 max-w-4xl mx-auto w-full">
            {item.details.map((detail, dIdx) => (
              <div key={dIdx} className="space-y-2 group border-l-4 border-white/5 pl-8 hover:border-[#11d493]/40 transition-all duration-500">
                <h3 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase italic group-hover:text-[#11d493] transition-colors duration-300">
                  {detail.label || 'INFO'}
                </h3>
                <p className="text-lg md:text-xl font-bold text-neutral-400 leading-relaxed uppercase tracking-wider group-hover:text-neutral-300 transition-colors">
                  {detail.value || 'N/A'}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Navigation Button */}
          <div className="flex flex-col items-center gap-6 pt-16">
            {!isLast ? (
              <button 
                onClick={nextProject}
                className="group flex items-center gap-6 bg-[#11d493] text-black px-12 py-6 font-black text-xl tracking-tighter hover:scale-105 transition-all italic shadow-[0_0_20px_rgba(17,212,147,0.2)]"
              >
                NEXT PROJECT <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </button>
            ) : resume?.moreWorksUrl && (
              <a 
                href={resume.moreWorksUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-6 border-2 border-[#11d493] text-[#11d493] px-12 py-6 font-black text-xl tracking-tighter hover:bg-[#11d493] hover:text-black transition-all italic"
              >
                포트폴리오 더보기 <ExternalLink size={20} className="group-hover:scale-110 transition-transform" />
              </a>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Works;
