import { motion, useScroll, useTransform } from "motion/react";
import { Sparkles, CalendarDays, MapPin, Crown } from "lucide-react";
import { ParticlesBackground } from "./ParticlesBackground";
import { AudioController } from "./AudioController";
import { WhatsAppButton } from "./WhatsAppButton";
import confetti from "canvas-confetti";
import { useEffect } from "react";

export function MainSite({ audioPlaying, toggleAudio, onAudioError }: { audioPlaying: boolean; toggleAudio: () => void; onAudioError?: () => void }) {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 2000], [0, 250]);
  const namesY = useTransform(scrollY, [0, 2000], [0, -200]);

  useEffect(() => {
    // Subtle gold confetti burst on entry
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#B28938', '#D4AF37'] // Adapted to darker golds
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#B28938', '#D4AF37']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const triggerFireworks = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 20 * (timeLeft / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#B28938', '#2A2520', '#D4AF37']
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#B28938', '#2A2520', '#D4AF37']
      });
    }, 250);
  };

  const triggerPetals = () => {
    const duration = 12 * 1000; // Let it fall gently for 12 seconds
    const animationEnd = Date.now() + duration;
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      confetti({
        particleCount: 3,
        startVelocity: randomInRange(1, 3),
        ticks: 400, // Makes them last much longer on screen
        gravity: randomInRange(0.2, 0.4), // Very slow gravity for petals
        origin: { x: Math.random(), y: -0.1 }, // Spawn slightly above the top of viewport
        colors: ['#9B2226', '#AE2012', '#BB3E03', '#B28938'], // Rose petal colors + hints of gold
        shapes: ['square', 'circle'], // Square / circle spin looks like petals
        scalar: randomInRange(0.8, 1.4),
        drift: randomInRange(-0.6, 0.6), // Blow left/right gently
        zIndex: 0
      });
    }, 250);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 3, ease: "easeInOut" }}
      className="min-h-screen bg-[#FDFBF7] text-[#2A2520] relative font-body overflow-x-hidden selection:bg-[#C5A059]/30 selection:text-[#2A2520]"
    >
      <ParticlesBackground />
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.06] mix-blend-multiply overflow-hidden hidden md:block">
        <motion.img 
            style={{ y: yParallax, scale: 1.15 }}
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=2564" 
            alt="Royal Abstract Pattern" 
            className="w-full h-[120%] -top-[10%] relative object-cover filter contrast-125 saturate-50"
            referrerPolicy="no-referrer"
        />
      </div>
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.06] mix-blend-multiply overflow-hidden md:hidden">
        <motion.img 
            style={{ y: yParallax, scale: 1.15 }}
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1080" 
            alt="Royal Abstract Pattern" 
            className="w-full h-[120%] -top-[10%] relative object-cover filter contrast-125 saturate-50"
            referrerPolicy="no-referrer"
        />
      </div>

      {/* Romantic Background Names */}
      <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden select-none opacity-[0.04] md:opacity-[0.03] text-[#B28938] mix-blend-multiply">
        <motion.div 
          style={{ y: namesY }}
          className="flex flex-col md:flex-row items-center gap-0 md:gap-12 font-display text-[30vw] md:text-[15vw] leading-none whitespace-nowrap -rotate-12"
          dir="rtl"
        >
          <span>عبدالله</span>
          <span className="text-[20vw] md:text-[10vw]">♥</span>
          <span>إسراء</span>
        </motion.div>
      </div>

      <AudioController isPlaying={audioPlaying} onToggle={toggleAudio} onError={onAudioError} />
      <WhatsAppButton />

      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex flex-col items-center justify-center px-4 overflow-hidden">        
        <motion.div
          initial={{ y: 20, opacity: 0, filter: "blur(10px)", scale: 0.95 }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)", scale: 1 }}
          transition={{ duration: 3, delay: 0.5, ease: "easeOut" }}
          className="text-center relative z-10"
        >
          <div className="flex items-center justify-center gap-4 mb-10 opacity-60">
            <div className="h-[1px] w-16 md:w-32 bg-gradient-to-r from-transparent to-[#C5A059]" />
            <Sparkles className="w-5 h-5 text-[#B28938]" strokeWidth={1} />
            <div className="h-[1px] w-16 md:w-32 bg-gradient-to-l from-transparent to-[#C5A059]" />
          </div>
          
          <h1 className="font-display text-5xl md:text-8xl lg:text-[9rem] tracking-wide mb-8 leading-[1.6]">
             <span className="text-gold">عبدالله</span> 
             <motion.span 
                  animate={{ scale: [1, 1.2, 1] }} 
                  transition={{ repeat: Infinity, repeatDelay: 2, duration: 1 }} 
                  className="inline-block text-[#B28938]/80 text-3xl md:text-6xl mx-6 font-sans align-middle"
             >
               ♥
             </motion.span>
             <span className="text-gold">إسراء</span>
          </h1>
          
          <p className="text-[#B28938]/90 tracking-[0.6em] font-light mt-12 text-sm md:text-xl font-body">
            دعــــوة زفــــاف
          </p>
        </motion.div>
      </section>

      {/* Message Section */}
      <section className="py-40 px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center"
          dir="rtl"
        >
          <div className="flex flex-col items-center justify-center space-y-12 relative">
            {/* Soft sparkles behind text */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#C5A059]/15 via-transparent to-transparent blur-3xl rounded-full" />
            <p className="text-3xl md:text-5xl text-[#2A2520]/90 leading-[2.2] font-light font-display relative z-10">
              "وجودكم بيننا<br/>
              هو النور الذي يُكمل فرحتنا...<br/>
              وحضوركم هو أجمل هدية ننتظرها"
            </p>
          </div>
        </motion.div>
      </section>

      {/* Details Section */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 justify-center">
          
          {/* Katb Ketab Card */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)", scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="flex-1 bg-white/70 backdrop-blur-md border border-[#C5A059]/20 shadow-xl rounded-xl p-12 text-center flex flex-col items-center justify-center transition-all duration-700 hover:border-[#C5A059]/60 hover:shadow-2xl hover:bg-white hover:scale-[1.02]"
          >
            <h3 className="text-4xl text-[#B28938] font-display mb-8">كتب الكتاب</h3>
            <p className="text-[#2A2520]/80 font-body text-2xl mb-4 leading-relaxed font-light">يشرفنا حضوركم عقد قراننا</p>
            
            <div className="w-16 h-px bg-[#C5A059]/40 my-8" />

            <div className="flex items-center gap-4 text-[#2A2520]/90 font-light mb-6">
              <CalendarDays className="w-6 h-6 text-[#B28938]/80" strokeWidth={1.5} />
              <span className="text-2xl font-body">يوم ١١ مايو ٢٠٢٦</span>
            </div>
            
            <div className="flex items-center gap-4 text-[#2A2520]/90 font-body text-lg mb-12">
              <MapPin className="w-6 h-6 text-[#B28938]/80" strokeWidth={1.5} />
              <span className="text-2xl font-body">بقاعة الريان</span>
            </div>

            <a 
              href="https://maps.google.com" 
              target="_blank"
              rel="noreferrer"
              className="px-10 py-4 border border-[#C5A059]/40 rounded-full text-[#B28938] font-body text-lg hover:bg-[#FDFBF7] hover:border-[#B28938] transition-colors duration-500"
            >
              عرض الموقع
            </a>
          </motion.div>

          {/* Wedding Card - Highlighted Special Event */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)", scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1.05, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 2, delay: 0.2, ease: "easeOut" }}
            className="flex-1 bg-white/90 backdrop-blur-md border-2 border-[#B28938]/30 shadow-[0_8px_30px_rgb(178,137,56,0.15)] rounded-xl p-12 text-center flex flex-col items-center justify-center relative overflow-hidden transition-all duration-700 hover:border-[#B28938]/60 hover:shadow-[0_8px_40px_rgb(178,137,56,0.25)] md:z-10"
          >
            {/* Elegant inner animated glow/shimmer */}
            <motion.div 
              animate={{ opacity: [0.2, 0.5, 0.2] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-br from-transparent via-[#C5A059]/15 to-transparent pointer-events-none" 
            />
            
            {/* Crown Icon for prestige */}
            <motion.div
               animate={{ y: [0, -5, 0] }}
               transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
               className="mb-4"
            >
               <Crown className="w-10 h-10 text-[#B28938] opacity-80" strokeWidth={1} />
            </motion.div>

            <h3 className="text-5xl text-[#B28938] font-display mb-6">حفل الزفاف</h3>
            <p className="text-[#2A2520]/90 font-body text-2xl mb-4 leading-relaxed font-light">نتشرف بحضوركم حفل زفافنا الميمون</p>
            
            <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#B28938]/50 to-transparent my-8" />

            <div className="flex items-center gap-4 text-[#2A2520]/90 font-light mb-6">
              <CalendarDays className="w-6 h-6 text-[#B28938]" strokeWidth={1.5} />
              <span className="text-2xl font-body">يوم ١٦ مايو ٢٠٢٦</span>
            </div>
            
            <div className="flex items-center gap-4 text-[#2A2520]/90 font-body text-lg mb-12">
              <MapPin className="w-6 h-6 text-[#B28938]" strokeWidth={1.5} />
              <span className="text-2xl font-body">بقاعة LA VIE الفخمة</span>
            </div>

            <a 
              href="https://maps.google.com" 
              target="_blank"
              rel="noreferrer"
              className="relative overflow-hidden px-12 py-4 border border-[#B28938]/60 bg-[#B28938]/5 rounded-full text-[#B28938] font-body text-xl transition-all duration-500 group"
            >
              <span className="relative z-10 transition-colors duration-500 group-hover:text-white">عرض موقع القاعة</span>
              <div className="absolute inset-0 bg-[#B28938] scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-500 ease-out z-0" />
            </a>
          </motion.div>

        </div>
      </section>

      {/* Footer / Final Cinematic Ending */}
      <footer className="relative min-h-[70svh] flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7] to-transparent">        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={() => {
            triggerFireworks();
            triggerPetals();
            return { opacity: 1, scale: 1 };
          }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 3.5, ease: "easeOut" }}
          className="relative z-10"
          dir="rtl"
        >
          <p className="text-3xl md:text-5xl text-[#2A2520]/90 font-light font-display mb-16 leading-relaxed">
            "ننتظركم بكل حب<br/>
            لتشاركونا بداية حكايتنا"
          </p>
          <p className="text-gold tracking-[0.5em] font-body text-2xl md:text-3xl mt-8">
            عـبـداللـه و إسـراء
          </p>
        </motion.div>
      </footer>
    </motion.div>
  );
}
