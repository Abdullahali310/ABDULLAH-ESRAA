import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef } from "react";
// يمكنك حذف هذا الاستيراد إذا لم تعد بحاجة إليه
// import { CINEMATIC_AUDIO_URL } from "../constants"; 
import { cn } from "../lib/utils";

// رابط لموسيقى بيانو رومانسية هادئة (بدون حقوق)
const ROMANTIC_AUDIO_URL = "https://cdn.pixabay.com/download/audio/2022/05/16/audio_0346399086.mp3?filename=beautiful-romantic-piano-111109.mp3";

export function AudioController({ isPlaying, onToggle, onError }: { isPlaying: boolean; onToggle: () => void; onError?: () => void }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(ROMANTIC_AUDIO_URL); // استخدمنا الموسيقى الرومانسية هنا
      audioRef.current.loop = true;
      audioRef.current.volume = 0; // يبدأ من 0 للدخول التدريجي
    }

    const audio = audioRef.current;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          // دخول تدريجي حالم وناعم جداً (Romantic Fade In)
          let vol = audio.volume;
          const fade = setInterval(() => {
            vol += 0.02; // زيادة بسيطة جداً
            // الحد الأقصى للصوت 0.4 ليكون خلفية هادئة ورومانسية
            if (vol >= 0.4) { 
              clearInterval(fade);
              audio.volume = 0.4;
            } else {
              audio.volume = Math.min(vol, 1);
            }
          }, 150); // وقت أطول بين كل زيادة
        }).catch((error) => {
          console.warn("Autoplay was prevented by browser:", error);
          if (onError) onError();
        });
      }
    } else {
      // خروج تدريجي هادئ (Soft Fade Out)
      let vol = audio.volume;
      const fade = setInterval(() => {
        vol -= 0.02; // نقصان بسيط
        if (vol <= 0) {
          clearInterval(fade);
          audio.pause();
          audio.volume = 0;
        } else {
          audio.volume = Math.max(vol, 0);
        }
      }, 100);
    }

    return () => {
      // Cleanup happens on unmount if we needed to, but we want it persistent.
    };
  }, [isPlaying, onError]);

  return (
    <button
      onClick={onToggle}
      className={cn(
        "fixed bottom-6 left-6 z-50 p-3 rounded-full overflow-hidden backdrop-blur-md border transition-all duration-700", // زيادة مدة تأثير الزر ليكون أنعم
        isPlaying ? "bg-white/80 border-[#C5A059]/30 hover:bg-white shadow-[0_0_15px_rgba(197,160,89,0.3)]" : "bg-[#FDFBF7]/80 border-gray-200 hover:bg-gray-100"
      )}
    >
      {isPlaying ? (
        <Volume2 className="w-5 h-5 text-[#C5A059] animate-pulse" /> // إضافة نبض خفيف لأيقونة الصوت
      ) : (
        <VolumeX className="w-5 h-5 text-gray-400" />
      )}
    </button>
  );
}
) : (
        <VolumeX className="w-5 h-5 text-gray-400" />
      )}
    </button>
  );
}
