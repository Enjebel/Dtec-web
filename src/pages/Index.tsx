import { useState, Suspense, lazy } from "react";
import Navbar from "./home/_components/Navbar";
import Hero from "./home/_components/Hero";
import Sectors from "./home/_components/Sectors";
import Impact from "./home/_components/Impact";
import Contact from "./home/_components/Contact";
import Footer from "./home/_components/Footer";
import { Bot } from "lucide-react";

// Lazy load these because they are the most likely to crash
const AiChat = lazy(() => import("./home/_components/AiChat"));
const InstallBanner = lazy(() => import("./home/_components/InstallBanner"));

export default function Index() {
  const [aiOpen, setAiOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground scroll-smooth overflow-x-hidden">
      <Navbar onOpenAi={() => setAiOpen(true)} />

      <main className="pt-20">
        <Hero />
        <Sectors />
        <Impact />
        <Contact />
      </main>

      <Footer />

      {/* Wrapping these in Suspense prevents them from crashing the landing page */}
      <Suspense fallback={null}>
        <AiChat isOpen={aiOpen} onClose={() => setAiOpen(false)} />
        <InstallBanner />
      </Suspense>

      {/* Floating AI button (mobile) */}
      <button
        onClick={() => setAiOpen(true)}
        className="fixed bottom-6 right-6 md:hidden w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center z-[90] cursor-pointer"
      >
        <Bot size={22} />
      </button>
    </div>
  );
}