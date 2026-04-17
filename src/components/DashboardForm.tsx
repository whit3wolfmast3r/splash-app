// Inside src/components/DashboardForm.tsx

// ... (keep existing imports and top of component)

const SOCIAL_KEYS = ['instagram', 'facebook', 'tiktok', 'youtube', 'linkedin', 'whatsapp', 'zillow'];

export default function DashboardForm({ profile }: any) {
  // ... (keep existing state)
  
  // Track social links in local state for real-time badge updates
  const [socialLinks, setSocialLinks] = useState(profile?.social_links || {});

  const getStatus = (key: string) => {
    if (!socialLinks[key]) return null; // Empty field
    
    // Find all keys that are NOT empty
    const activeKeys = SOCIAL_KEYS.filter(k => !!socialLinks[k]);
    // Find the index of the current key in that active list
    const index = activeKeys.indexOf(key);
    
    return index >= 0 && index < 4 ? 'LIVE' : 'HIDDEN';
  };

  return (
    <form /* ... existing action ... */ className="space-y-12 pb-32">
      {/* ... keep Identity and Branding sections ... */}

      <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 space-y-8">
        <div className="flex justify-between items-end">
            <div>
                <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#00AEEF]">Social Distribution</h3>
                <p className="text-zinc-500 text-xs mt-1 italic">"Premium layout limit: First 4 active links will be displayed."</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
          {SOCIAL_KEYS.map(key => {
            const status = getStatus(key);
            const label = key.charAt(0).toUpperCase() + key.slice(1);
            
            return (
              <div key={key} className="space-y-2 group">
                <div className="flex justify-between items-center px-2">
                    <label className="text-[9px] font-black uppercase text-zinc-600 tracking-widest group-focus-within:text-[#00AEEF] transition-colors">{label}</label>
                    {status === 'LIVE' && <span className="text-[8px] font-black bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full border border-green-500/20 animate-pulse">LIVE ON PROFILE</span>}
                    {status === 'HIDDEN' && <span className="text-[8px] font-black bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded-full border border-white/5">HIDDEN (LIMIT 4)</span>}
                </div>
                <input 
                    name={`social_${key}`} 
                    defaultValue={profile?.social_links?.[key]} 
                    onChange={(e) => setSocialLinks({...socialLinks, [key]: e.target.value})}
                    placeholder={`${label} Profile URL`} 
                    className="w-full bg-black border border-white/5 rounded-2xl p-4 text-white outline-none focus:border-[#00AEEF] transition-all" 
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* ... keep Submit button ... */}
    </form>
  )
}