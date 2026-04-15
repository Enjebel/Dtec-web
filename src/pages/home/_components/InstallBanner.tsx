import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [showIosBanner, setShowIosBanner] = useState(false);

  useEffect(() => {
    // Check if already installed (standalone mode)
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      ("standalone" in window.navigator && (window.navigator as { standalone?: boolean }).standalone === true);
    if (isStandalone) return;

    // Check if dismissed before
    if (localStorage.getItem("dtec-pwa-dismissed") === "true") return;

    // iOS detection
    const ua = window.navigator.userAgent;
    const ios = /iphone|ipad|ipod/i.test(ua);
    if (ios) {
      setIsIos(true);
      setShowIosBanner(true);
      return;
    }

    // Android / Chrome install prompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setDeferredPrompt(null);
    setShowIosBanner(false);
    setDismissed(true);
    localStorage.setItem("dtec-pwa-dismissed", "true");
  };

  const show = !dismissed && (!!deferredPrompt || showIosBanner);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 } as const}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[500] w-[calc(100%-2rem)] max-w-sm"
        >
          <div className="bg-secondary border border-white/10 rounded-3xl px-5 py-4 shadow-2xl flex items-center gap-4">
            <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center shrink-0">
              <Download size={18} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-black text-[12px] uppercase italic tracking-tight leading-none mb-0.5">
                Install DTEC App
              </p>
              {isIos ? (
                <p className="text-white/50 font-semibold text-[10px] leading-tight">
                  Tap Share → Add to Home Screen
                </p>
              ) : (
                <p className="text-white/50 font-semibold text-[10px] leading-tight">
                  Add to your home screen for quick access
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {!isIos && (
                <button
                  onClick={handleInstall}
                  className="bg-primary text-white font-black text-[10px] uppercase tracking-widest px-4 py-2 rounded-xl cursor-pointer hover:bg-primary/90 transition-all"
                >
                  Install
                </button>
              )}
              <button
                onClick={handleDismiss}
                className="p-1.5 text-white/40 hover:text-white transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
