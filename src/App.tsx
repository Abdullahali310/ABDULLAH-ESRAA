/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { IntroScreen } from "./components/IntroScreen";
import { MainSite } from "./components/MainSite";
import { AnimatePresence } from "motion/react";

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);

  return (
    <div className="min-h-screen bg-black">
      <AnimatePresence mode="wait">
        {!introComplete && (
          <IntroScreen 
            key="intro" 
            onComplete={() => setIntroComplete(true)} 
            onPlayAudio={() => setAudioPlaying(true)} 
          />
        )}
      </AnimatePresence>
      
      {introComplete && (
        <MainSite 
          audioPlaying={audioPlaying} 
          toggleAudio={() => setAudioPlaying(prev => !prev)} 
          onAudioError={() => setAudioPlaying(false)}
        />
      )}
    </div>
  );
}
