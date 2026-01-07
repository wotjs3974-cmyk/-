
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

  // Responsive break logic:
  // Mobile: Break after "몰입을" and "통해" (3 lines)
  // Tablet/Desktop: Break after "소리를" (2 lines)
  const renderResponsiveTitle = (text: string) => {
    const parts = text.split(/(\*[^*]+\*)/g);
    
    return parts.map((part, i) => {
      let isHighlighted = false;
      let cleanPart = part;
      
      if (part.startsWith('*') && part.endsWith('*')) {
        isHighlighted = true;
        cleanPart = part.slice(1, -1);
      }

      const words = cleanPart.split(' ');
      
      return (
        <React.Fragment key={`part-${i}`}>
          {words.map((word, wordIdx) => (
            <React.Fragment key={`${i}-${wordIdx}`}>
              <span className={isHighlighted ? "text-[#11d493]" : "text-white"}>
                {word}
              </span>
              {wordIdx < words.length - 1 && ' '}
              
              {/* MOBILE BREAKS (3 lines) */}
              {word === '몰입을' && <br className="block md:hidden" />}
              {word === '통해' && <br className="block md:hidden" />}

              {/* TABLET/DESKTOP BREAKS (2 lines) */}
              {word === '소리를' && <br className="hidden md:block" />}
            </React.Fragment>
          ))}
        </React.Fragment>
      );
    });
  };

  return (
    <div className="pt-32 pb-48 max-w-6xl mx-auto px-6">
      {/* Hero Section - Reduced font size to fit the design better: 10vw on mobile, 5.5vw on desktop */}
      <section className="mb-24 md:mb-32">
        <h1 className="text-[10vw] md:text-[5.5vw] font-black mb-12 leading-[1.1] tracking-tighter uppercase break-keep">
          {renderResponsiveTitle(data.heroTitle)}
        </h1>
        <p className="text-lg md:text-2xl text-neutral-400 font-bold max-w-3xl leading-relaxed tracking-tight whitespace-pre-line">
          {data.heroSubtitle}
        </p>
      </section>

      {/* Navigation */}
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
