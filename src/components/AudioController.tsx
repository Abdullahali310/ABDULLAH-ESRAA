import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CINEMATIC_AUDIO_URL } from "../constants";
import { cn } from "../lib/utils";

export function AudioController({ isPlaying, onToggle, onError }: { isPlaying: boolean; onToggle: () => void; onError?: () => void }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(CINEMATIC_AUDIO_URL);
      audioRef.current.loop = true;
      audioRef.current.volume = 0; // start at 0 to fade in
    }

    const audio = audioRef.current;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          // Fade in
          let vol = 0;
          const fade = setInterval(() => {
            vol += 0.05;
            if (vol >= 0.6) {
              clearInterval(fade);
              audio.volume = 0.6;
            } else {
              audio.volume = vol;
            }
          }, 200);
        }).catch((error) => {
          console.warn("Autoplay was prevented by browser:", error);
          if (onError) onError();
        });
      }
    } else {
      // Fade out
      let vol = audio.volume;
      const fade = setInterval(() => {
        vol -= 0.05;
        if (vol <= 0) {
          clearInterval(fade);
          audio.pause();
          audio.volume = 0;
        } else {
          audio.volume = vol;
        }
      }, 100);
    }

    return () => {
      // Cleanup happens on unmount if we needed to, but we want it persistent.
    };
  }, [isPlaying]);

  return (
    <button
      onClick={onToggle}
      className={cn(
        "fixed bottom-6 left-6 z-50 p-3 rounded-full overflow-hidden backdrop-blur-md border transition-all duration-500",
        isPlaying ? "bg-white/80 border-[#C5A059]/30 hover:bg-white" : "bg-[#FDFBF7]/80 border-gray-200 hover:bg-gray-100"
      )}
    >
      {isPlaying ? (
        <Volume2 className="w-5 h-5 text-[#C5A059]" />
      ) : (
        <VolumeX className="w-5 h-5 text-gray-400" />
      )}
    </button>
  );
}
