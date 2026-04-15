import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Menu, X, Bot, LogOut, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
import { SignInButton, SignOutButton, SignedIn, SignedOut } from "@clerk/clerk-react";

const LOGO = "/icon/icon-192.png";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Sectors", href: "#sectors" },
  { name: "Impact", href: "#impact" },
  { name: "Contact", href: "#contact" },
];

type NavbarProps = {
  onOpenAi: () => void;
};

export default function Navbar({ onOpenAi }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-[100] bg-secondary text-secondary-foreground border-b-4 border-primary h-20 shadow-xl px-4 md:px-8">
        <div className="max-w-7xl mx-auto h-full flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={LOGO} className="h-10 w-10 rounded-lg shadow border border-white/10 object-cover" alt="DTEC" />
            <span className="text-xl font-black tracking-tighter uppercase italic text-white">DTEC</span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[11px] font-black uppercase tracking-[0.2em] text-white/80 hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
            
            <button
              onClick={onOpenAi}
              className="bg-primary px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest text-white shadow-lg hover:bg-primary/90 transition-colors cursor-pointer"
            >
              DTEC AI
            </button>

            {/* AUTH LOGIC: Desktop */}
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-[11px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors cursor-pointer">
                  Admin
                </button>
              </SignInButton>
            </SignedOut>
            
            <SignedIn>
              <div className="flex items-center gap-6 border-l border-white/10 pl-6">
                <Link
                  to="/admin"
                  className="text-[11px] font-black uppercase tracking-widest text-primary animate-pulse"
                >
                  Portal
                </Link>
                <SignOutButton>
                  <button className="text-[11px] font-black uppercase tracking-widest text-white/40 hover:text-red-500 transition-colors cursor-pointer">
                    Exit
                  </button>
                </SignOutButton>
              </div>
            </SignedIn>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 bg-white/5 rounded-lg text-white cursor-pointer"
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-[150]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="absolute top-0 right-0 bottom-0 w-[85%] bg-secondary flex flex-col border-l-4 border-primary shadow-2xl"
            >
              <div className="p-6 bg-secondary/80 border-b border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img src={LOGO} className="h-8 w-8 rounded-md object-cover" alt="DTEC" />
                  <span className="text-white font-black uppercase italic tracking-tighter text-xl">DTEC</span>
                </div>
                <button onClick={() => setMobileOpen(false)} className="text-white/60 cursor-pointer">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 p-8 flex flex-col gap-8">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-2xl font-black uppercase italic text-white/90 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                ))}

                {/* AUTH LOGIC: Mobile */}
                <div className="pt-4 border-t border-white/5">
                  <SignedOut>
                    <SignInButton mode="modal">
                      <button className="text-2xl font-black uppercase italic text-white/40 hover:text-white transition-colors">
                        Admin Login
                      </button>
                    </SignInButton>
                  </SignedOut>
                  
                  <SignedIn>
                    <div className="flex flex-col gap-6">
                      <Link
                        to="/admin"
                        onClick={() => setMobileOpen(false)}
                        className="text-2xl font-black uppercase italic text-primary flex items-center gap-3"
                      >
                        <LayoutDashboard size={24} /> Admin Portal
                      </Link>
                      <SignOutButton>
                        <button className="text-2xl font-black uppercase italic text-red-500/60 flex items-center gap-3">
                          <LogOut size={24} /> Sign Out
                        </button>
                      </SignOutButton>
                    </div>
                  </SignedIn>
                </div>
              </div>

              <div className="p-8 border-t border-white/5">
                <button
                  onClick={() => { onOpenAi(); setMobileOpen(false); }}
                  className="w-full py-5 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl flex items-center justify-center gap-3 cursor-pointer"
                >
                  <Bot size={18} /> Activate DTEC AI
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}