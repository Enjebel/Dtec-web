import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, Bot } from "lucide-react";

type Message = { role: "user" | "bot"; text: string };

const KB = [
  { keywords: ["who", "what is dtec", "about", "company", "owner"], answer: "DTEC is an industrial and tech powerhouse in Douala, Cameroon. We specialize in Academy training, Construction, Smart Farming, Printing, and Software Engineering." },
  { keywords: ["academy", "diimats", "learn", "courses", "study", "student", "autocad", "training"], answer: "DIIMATS Academy offers elite training in AutoCAD (16 modules), Software Development (MERN Stack), and UI/UX Design. We focus on turning students into industrial experts." },
  { keywords: ["software", "web", "app", "mern", "site", "coding", "developer"], answer: "Our Software division builds scalable Web and Mobile solutions using the MERN stack and React Native for businesses worldwide." },
  { keywords: ["construction", "architecture", "building", "civil", "plans", "3d", "structural"], answer: "We provide precision structural modeling, 3D architectural plans, and full civil engineering services including masonry, electrical, and finishing works." },
  { keywords: ["real estate", "house", "rent", "property", "land", "apartment", "hostel"], answer: "DTEC Real Estate manages smart student housing and industrial spaces in Douala. We also assist with verified land documentation and property management." },
  { keywords: ["farming", "agriculture", "poultry", "irrigation", "soil", "solar"], answer: "DTEC Farming introduces Agri-Automation to Cameroon, featuring solar-powered irrigation and automated poultry climate control systems." },
  { keywords: ["printing", "brand", "logo", "business card", "flyer", "book"], answer: "Our Printing Press handles high-volume digital/offset printing and corporate branding, from logo design to large-scale billboards." },
  { keywords: ["price", "cost", "fee", "how much", "tuition", "payment"], answer: "Pricing depends on the specific project or course. For a detailed quote or tuition fees, contact us at +237 677 567 624." },
  { keywords: ["contact", "phone", "whatsapp", "location", "address", "office", "email", "find"], answer: "📍 Douala, Cameroon. 📞 WhatsApp: +237 677 567 624. ✉ daronsdenis7@gmail.com. Open Mon–Fri, 08:00–18:00." },
];

type AiChatProps = { isOpen: boolean; onClose: () => void };

export default function AiChat({ isOpen, onClose }: AiChatProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Message[]>([
    { role: "bot", text: "DTEC AI initialized. How can I assist you today?" },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    const lower = text.toLowerCase();
    setHistory((prev) => [...prev, { role: "user", text }]);
    setInput("");
    const match = KB.find((e) => e.keywords.some((k) => lower.includes(k)));
    setTimeout(() => {
      setHistory((prev) => [
        ...prev,
        {
          role: "bot",
          text: match
            ? match.answer
            : "I'm not sure about that. Contact us at +237 677 567 624 for specific inquiries.",
        },
      ]);
    }, 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
          />
          <motion.div
            key="panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 } as const}
            className="fixed top-0 right-0 bottom-0 w-full md:w-[420px] bg-white z-[210] flex flex-col border-l-4 border-primary shadow-2xl"
          >
            <div className="p-6 bg-secondary text-white flex justify-between items-center border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
                  <Bot size={18} />
                </div>
                <span className="font-black uppercase italic tracking-tighter text-lg text-primary">
                  DTEC AI
                </span>
              </div>
              <button onClick={onClose} className="text-white/50 hover:text-white cursor-pointer">
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 p-6 bg-background overflow-y-auto space-y-4">
              {history.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`p-4 rounded-3xl max-w-[85%] font-semibold text-sm shadow-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-primary text-white rounded-br-sm"
                        : "bg-secondary text-white rounded-bl-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            <div className="p-5 bg-white border-t border-border flex gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask anything about DTEC..."
                className="flex-1 p-4 bg-background rounded-2xl outline-none font-semibold text-sm border border-border focus:border-primary transition-colors"
              />
              <button
                onClick={handleSend}
                className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors cursor-pointer"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
