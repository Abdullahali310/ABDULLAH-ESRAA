import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

interface IntroProps {
  onComplete: () => void;
  onPlayAudio: () => void;
  key?: string;
}

export function IntroScreen({ onComplete, onPlayAudio }: IntroProps) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // المرحلة 0: شاشة فارغة -> انتظار 0.3 ثانية فقط
    const t1 = setTimeout(() => setStage(1), 300);
    
    // المرحلة 1: الأسماء -> تظهر بسرعة وتختفي عند 2 ثانية (مدة العرض 1.7 ثانية)
    const t2 = setTimeout(() => setStage(2), 2000); 
    
    // المرحلة 2: النص العربي الأول -> يختفي عند 4.5 ثانية (مدة العرض 2.5 ثانية)
    const t3 = setTimeout(() => setStage(3), 4500); 
    
    // المرحلة 3: النص العربي الثاني -> يختفي عند 7 ثوانٍ (مدة العرض 2.5 ثانية)
    const t4 = setTimeout(() => {
      setStage(4); 
      setTimeout(() => {
        onPlayAudio();
        onComplete();
      }, 500); // سرعة الانتقال للصفحة الرئيسية بعد انتهاء آخر نص
    }, 7000); 
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete, onPlayAudio]);


  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FDFBF7] overflow-hidden cursor-pointer"
      onClick={() => {
        onPlayAudio();
        onComplete();
      }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }} // تسريع خروج الشاشة بالكامل
    >
      <AnimatePresence>
        {stage >= 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }} // تسريع ظهور التوهج الخلفي
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="w-[100vw] h-[100vw] md:w-[60vw] md:h-[60vw] rounded-full bg-[#C5A059]/10 blur-[160px] mix-blend-multiply" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="relative z-10 text-center flex flex-col items-center w-full px-6 gap-6 h-full justify-center"
        animate={{ scale: [1, 1.05] }}
        transition={{ duration: 10, ease: "linear" }}
      >
        <AnimatePresence mode="wait">
          {stage === 1 && (
            <motion.div
              key="names"
              initial={{ clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)", opacity: 0 }}
              animate={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", opacity: 1 }}
              exit={{ opacity: 0, filter: "blur(10px)", transition: { duration: 0.4 } }} // خروج سريع
              transition={{ duration: 0.6, ease: "easeOut" }} // دخول سريع
              className="flex flex-col items-center relative overflow-hidden px-8"
              dir="rtl"
            >
              <h1 className="font-display text-5xl md:text-7xl lg:text-9xl tracking-normal text-gold leading-relaxed relative !leading-[1.5em] py-4">
                عبدالله 
                <motion.span 
                  animate={{ scale: [1, 1.2, 1] }} 
                  transition={{ repeat: Infinity, repeatDelay: 1, duration: 0.6 }} // نبض أسرع للقلب
                  className="inline-block text-[#C5A059]/80 text-4xl md:text-6xl mx-6 font-sans align-middle"
                >
                  ♥
                </motion.span>
                إسراء
              </h1>
              {/* لمعة سريعة */}
              <motion.div 
                initial={{ left: "-100%" }}
                animate={{ left: "200%" }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
                className="absolute top-0 bottom-0 w-[50px] bg-gradient-to-r from-transparent via-[#FDFBF7]/60 to-transparent skew-x-[30deg]" 
              />
            </motion.div>
          )}

          {stage === 2 && (
            <motion.div
              key="text1"
              initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, filter: "blur(10px)", transition: { duration: 0.4 } }} // خروج سريع
              transition={{ duration: 0.6 }} // دخول سريع
              className="max-w-2xl text-center"
              dir="rtl"
            >
              <h2 className="text-3xl md:text-5xl leading-[2.2] text-[#2A2520]/90 font-light font-display">
                في ليلةٍ كُتِبَت فيها الأقدار… <br />
                <span className="text-[#B28938]/90 mt-8 block font-display text-4xl md:text-6xl">اجتمع القلبان على وعدٍ بالحياة</span>
              </h2>
            </motion.div>
          )}

          {stage === 3 && (
            <motion.div
              key="text2"
              initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, filter: "blur(10px)", transition: { duration: 0.4 } }} // خروج سريع
              transition={{ duration: 0.6 }} // دخول سريع
              className="max-w-xl text-center"
              dir="rtl"
            >
              <h2 className="text-3xl md:text-5xl text-[#2A2520]/90 font-light font-display leading-relaxed">
                يسعدنا دعوتكم لمشاركتنا أجمل لحظاتنا
              </h2>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
        animate={{ scale: [1, 1.05] }}
        transition={{ duration: 30, ease: "linear" }}
      >
        <AnimatePresence mode="wait">
          {stage === 1 && (
            <motion.div
              key="names"
              initial={{ clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)", opacity: 0.8 }}
              animate={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", opacity: 1 }}
              exit={{ opacity: 0, filter: "blur(15px)", transition: { duration: 2 } }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex flex-col items-center relative overflow-hidden px-8"
              dir="rtl"
            >
              <h1 className="font-display text-5xl md:text-7xl lg:text-9xl tracking-normal text-gold leading-relaxed relative !leading-[1.5em] py-4">
                عبدالله 
                <motion.span 
                  animate={{ scale: [1, 1.2, 1] }} 
                  transition={{ repeat: Infinity, repeatDelay: 2, duration: 1 }} 
                  className="inline-block text-[#C5A059]/80 text-4xl md:text-6xl mx-6 font-sans align-middle"
                >
                  ♥
                </motion.span>
                إسراء
              </h1>
              {/* Shine effect across the text */}
              <motion.div 
                initial={{ left: "-100%" }}
                animate={{ left: "200%" }}
                transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                className="absolute top-0 bottom-0 w-[50px] bg-gradient-to-r from-transparent via-[#FDFBF7]/60 to-transparent skew-x-[30deg]" 
              />
            </motion.div>
          )}

          {stage === 2 && (
            <motion.div
              key="text1"
              initial={{ opacity: 0, filter: "blur(15px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, filter: "blur(15px)", transition: { duration: 3.5 } }}
              transition={{ duration: 4.5 }}
              className="max-w-2xl text-center"
              dir="rtl"
            >
              <h2 className="text-3xl md:text-5xl leading-[2.2] text-[#2A2520]/90 font-light font-display">
                في ليلةٍ كُتِبَت فيها الأقدار… <br />
                <span className="text-[#B28938]/90 mt-8 block font-display text-4xl md:text-6xl">اجتمع القلبان على وعدٍ بالحياة</span>
              </h2>
            </motion.div>
          )}

          {stage === 3 && (
            <motion.div
              key="text2"
              initial={{ opacity: 0, filter: "blur(15px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, filter: "blur(15px)", transition: { duration: 3.5 } }}
              transition={{ duration: 4.5 }}
              className="max-w-xl text-center"
              dir="rtl"
            >
              <h2 className="text-3xl md:text-5xl text-[#2A2520]/90 font-light font-display leading-relaxed">
                يسعدنا دعوتكم لمشاركتنا أجمل لحظاتنا
              </h2>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
