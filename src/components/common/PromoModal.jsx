import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function PromoModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // প্রতি সেশনে একবার দেখাবে (নতুন ট্যাব বা ব্রাউজার ওপেন করলে আবার দেখাবে)
    const hasSeenPromo = sessionStorage.getItem('rudranex_promo_seen');
    if (!hasSeenPromo) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 600); // পেজ লোড হওয়ার ০.৬ সেকেন্ড পর স্মুথলি ওপেন হবে
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('rudranex_promo_seen', 'true');
  };

  // Escape বাটন চাপলে ক্লোজ হবে
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    if (isOpen) window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={handleClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 16 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/15 bg-card shadow-2xl"
          >
            {/* Cross / Close Button */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close promotion"
              className="absolute top-3 right-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/65 text-white backdrop-blur-md transition hover:scale-105 hover:bg-red-600"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Clickable Promo Image */}
            <a
              href="https://rudramojumder.me"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClose}
              className="block cursor-pointer overflow-hidden"
            >
              <img
                src="/RudraNex.png"
                alt="Rudra Nex Promotion"
                className="max-h-[80vh] w-full object-contain transition-transform duration-300 hover:scale-[1.01]"
              />
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}