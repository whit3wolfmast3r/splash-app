import React from 'react';
import { 
  Instagram, 
  Facebook, 
  Youtube, 
  Video, 
  ExternalLink 
} from 'lucide-react';

interface SplashPageProps {
  data: {
    agent_name: string;
    avatar_url: string; // The cutout PNG
    video_bg_url: string; 
    fallback_image_url?: string;
    license_number: string;
    cta_text: string;
    cta_url: string;
    social_links: Record<string, string>;
    company_logo?: string;
  };
}

const SOCIAL_MAP: Record<string, any> = {
  instagram: { icon: Instagram, color: 'hover:text-pink-500' },
  facebook: { icon: Facebook, color: 'hover:text-blue-500' },
  youtube: { icon: Youtube, color: 'hover:text-red-500' },
  tiktok: { icon: Video, color: 'hover:text-zinc-400' },
};

export default function SplashPage({ data }: SplashPageProps) {
  
  const getCtaHref = (url: string) => {
    if (url.includes('@')) return `mailto:${url}`;
    if (/^\d+$/.test(url.replace(/[-+() ]/g, ''))) return `tel:${url}`;
    return url.startsWith('http') ? url : `https://${url}`;
  };

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-between bg-black overflow-hidden font-sans selection:bg-white/30">
      
      {/* 1. VIDEO ENGINE */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={data.fallback_image_url}
          className="h-full w-full object-cover opacity-50" // Dimmed for readability
        >
          <source src={data.video_bg_url} type="video/mp4" />
        </video>
        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
      </div>

      {/* 2. TOP NAV: Name & Socials */}
      <div className="relative z-10 w-full pt-12 px-6 text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-lg">
          {data.agent_name}
        </h1>
        
        <div className="flex justify-center gap-5">
          {Object.entries(data.social_links || {}).map(([platform, url]) => {
            const platformConfig = SOCIAL_MAP[platform.toLowerCase()];
            if (!platformConfig) return null;
            const Icon = platformConfig.icon;
            return (
              <a 
                key={platform} 
                href={url} 
                className={`text-white/80 transition-colors duration-300 ${platformConfig.color}`}
              >
                <Icon size={28} strokeWidth={1.5} />
              </a>
            );
          })}
        </div>
      </div>

      {/* 3. CENTER: THE AGENT CUTOUT */}
      {/* We use a gradient mask to fade the bottom of the agent into the button area */}
      <div className="relative z-0 flex-1 w-full flex items-end justify-center overflow-hidden">
        <img
          src={data.avatar_url}
          alt={data.agent_name}
          className="max-h-[70vh] w-auto object-contain select-none"
          style={{
            maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
          }}
        />
      </div>

      {/* 4. BOTTOM ACTION AREA */}
      <div className="relative z-10 w-full max-w-md px-6 pb-10 space-y-8 bg-gradient-to-t from-black via-black/80 to-transparent">
        
        {/* CTA Button */}
        <a
          href={getCtaHref(data.cta_url)}
          className="flex items-center justify-center w-full py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white font-semibold text-lg shadow-2xl hover:bg-white/20 transition-all group"
        >
          {data.cta_text}
          <ExternalLink size={18} className="ml-2 opacity-50 group-hover:opacity-100 transition-opacity" />
        </a>

        {/* Footer Polish */}
        <div className="flex items-center justify-between text-[10px] tracking-[0.2em] text-white/40 uppercase font-bold">
          <div className="flex items-center gap-3">
             {data.company_logo && <img src={data.company_logo} className="h-4 opacity-50" alt="Broker" />}
             <span>NV LIC: {data.license_number}</span>
          </div>
          
          <div className="flex items-center gap-1 border border-white/20 px-2 py-1 rounded">
             <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current"><path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/></svg>
             <span>Equal Housing</span>
          </div>
        </div>
      </div>
    </div>
  );
}