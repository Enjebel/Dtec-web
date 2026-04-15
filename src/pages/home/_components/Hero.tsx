import { motion } from "motion/react";

// Local logo path
const LOGO = "/icon/icon-192.png";

export default function Hero() {
  return (
    <section
      id="home"
      /* REDUCED TOP PADDING FROM pt-32/pt-44 TO pt-8/pt-12 */
      className="pt-8 md:pt-12 pb-24 md:pb-40 px-6 bg-secondary text-secondary-foreground rounded-b-[3rem] md:rounded-b-[5rem] relative overflow-hidden"
    >
      {/* Background watermark */}
      <div className="absolute -right-10 -bottom-10 text-[250px] md:text-[320px] opacity-[0.04] font-black italic select-none text-white leading-none pointer-events-none">
        DTEC
      </div>

      <div className="max-w-6xl mx-auto relative z-10 text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" } as const}
        >
          {/* LOGO ADDED HERE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 } as const}
            /* REDUCED MARGIN BOTTOM FROM mb-8 TO mb-4 */
            className="mb-4 flex justify-center md:justify-start"
          >
            <img 
              src={LOGO} 
              alt="DTEC Logo" 
              className="w-20 h-20 md:w-24 md:h-24 object-contain rounded-3xl shadow-2xl bg-white/5 p-2 border border-white/10"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 } as const}
            /* REDUCED MARGIN BOTTOM FROM mb-8 TO mb-6 */
            className="inline-block bg-primary/20 border border-primary/30 rounded-full px-4 py-1.5 mb-6"
          >
            <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em]">
              Douala, Cameroon
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] mb-8 uppercase italic tracking-tighter text-balance">
            Denis Technology
            <br />
            <span className="text-white/30">Entrepreneur</span>
            <br />
            <span className="text-primary">Center.</span>
          </h1>

          <p className="max-w-xl text-white/50 font-semibold text-base md:text-lg mb-10 mx-auto md:mx-0 leading-relaxed">
            Scaling the industrial and technological potential of Cameroon
            through elite training and smart infrastructure.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <motion.a
              href="#sectors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-10 py-5 bg-primary text-white font-black rounded-2xl uppercase tracking-widest text-[11px] shadow-xl text-center cursor-pointer"
            >
              Explore Sectors
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-10 py-5 bg-white/10 text-white font-black rounded-2xl uppercase tracking-widest text-[11px] shadow-xl text-center border border-white/10 cursor-pointer"
            >
              Enroll Now
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}