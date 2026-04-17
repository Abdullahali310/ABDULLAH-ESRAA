import { MessageCircleHeart } from "lucide-react";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/201004059614?text=ألف مبروك وبارك الله لكما 🤍"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-white border border-[#C5A059]/30 hover:border-[#C5A059]/80 shadow-[0_4_20px_rgba(0,0,0,0.05)] transition-all duration-500 hover:scale-105 flex items-center justify-center group"
    >
      <MessageCircleHeart className="w-6 h-6 text-[#C5A059]" />
      <span className="absolute right-full mr-4 bg-white text-[#C5A059] px-4 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-[#C5A059]/20 shadow-sm font-body" dir="rtl">
        مراسلة العرسان
      </span>
    </a>
  );
}
