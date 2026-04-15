import { useState } from "react";
import { useMutation } from "convex/react";
// Path updated to reach outside 'src' to the 'convex' folder in root
import { api } from "../../../../convex/_generated/api"; 
import { toast } from "sonner";
import { Loader2, MapPin, Phone, Mail } from "lucide-react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  // This will now link correctly to your convex/messages.ts submit function
  const submitMessage = useMutation(api.messages.submit);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await submitMessage({ name, email: email || undefined, message });
      toast.success("Message sent! We'll get back to you soon.");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Submission failed:", error);
      // Fallback to WhatsApp if the database call fails
      window.open(
        `https://wa.me/237677567624?text=Name: ${name}%0AMessage: ${message}`
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="max-w-6xl mx-auto px-4 md:px-6 py-16 pb-24">
      <div className="bg-secondary rounded-[3rem] md:rounded-[4rem] p-10 md:p-16 shadow-2xl border-b-8 border-primary">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <p className="text-primary font-black uppercase text-[10px] tracking-[0.3em] mb-4">
              Get In Touch
            </p>
            <h2 className="text-5xl font-black text-white uppercase italic leading-none mb-10">
              Direct <br />
              <span className="text-primary">Liaison.</span>
            </h2>
            <div className="space-y-5">
              <div className="flex items-center gap-4 text-white/60 font-bold text-[11px] uppercase tracking-widest">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin size={16} className="text-primary" />
                </div>
                Douala, Cameroon
              </div>
              <div className="flex items-center gap-4 text-white/60 font-bold text-[11px] uppercase tracking-widest">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center shrink-0">
                  <Phone size={16} className="text-primary" />
                </div>
                +237 677 567 624
              </div>
              <div className="flex items-center gap-4 text-white/60 font-bold text-[11px] uppercase tracking-widest">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-primary" />
                </div>
                daronsdenis7@gmail.com
              </div>
            </div>
            <div className="mt-10">
              <a
                href="https://wa.me/237677567624"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-[#25D366] text-white font-black rounded-2xl uppercase tracking-widest text-[10px] shadow-lg hover:bg-[#1ebe5c] transition-all cursor-pointer"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full p-5 bg-white/5 rounded-2xl text-white outline-none border border-white/10 focus:border-primary font-semibold placeholder:text-white/30 transition-colors"
              required
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email (optional)"
              type="email"
              className="w-full p-5 bg-white/5 rounded-2xl text-white outline-none border border-white/10 focus:border-primary font-semibold placeholder:text-white/30 transition-colors"
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="Your Message"
              className="w-full p-5 bg-white/5 rounded-2xl text-white outline-none border border-white/10 focus:border-primary font-semibold resize-none placeholder:text-white/30 transition-colors"
              required
            />
            <button
              type="submit"
              disabled={sending}
              className="w-full py-5 bg-primary text-white font-black rounded-2xl uppercase tracking-widest text-[11px] shadow-xl hover:bg-primary/90 transition-all disabled:opacity-60 cursor-pointer flex items-center justify-center gap-3"
            >
              {sending ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Sending...
                </>
              ) : (
                "Send to DTEC"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}