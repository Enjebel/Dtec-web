import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion, AnimatePresence } from "framer-motion";

// IMPORT DIIMATS LOGO
const DIIMATS_LOGO = "/icon/diimats.png"; 

// FULL DATA OBJECT (unchanged)
const sectorInfo: Record<string, any> = {
  architecture: { 
    title: "Architecture & Construction", 
    tag: "Structural Excellence",
    desc: "Precision structural modeling and building services in Douala.",
    sections: [
      { label: "Structural Design", items: ["3D Architectural Plans", "BIM Modeling", "Structural Analysis", "Site Supervision"] },
      { label: "Civil Engineering", items: ["Foundation & Masonry", "Reinforced Concrete", "Plastering & Tiling", "Roofing Systems"] },
      { label: "Finishing Works", items: ["Interior Plumbing", "Electrical Wiring", "Professional Painting", "Aluminum & Glass Fitting"] }
    ]
  },
  academy: { 
    title: "DIIMATS Academy", 
    tag: "Diverse Career Pathways",
    desc: "Our elite training wing covering AutoCAD, Software Engineering, and UI/UX Design.",
    sections: [
      { label: "AutoCAD (16 Modules)", items: ["Intro to Interface", "Tool Mastery", "1-4 Bedroom Bungalows", "Roof & Elevations", "Section Drawings", "Duplex Execution", "Plotting & Certification"] },
      { label: "Software Development", items: ["Frontend (React/Vite)", "Backend (Node/Express)", "Database (MongoDB)", "API Integration", "Mobile Apps (PWA/Native)", "Deployment & DevOps"] },
      { label: "UI/UX Design", items: ["Graphics Designing & Web Development", "Graphics Designing|Photography & Videography", "Digital Marketing & Entrepreneurship", "Graphics Designing & Printing Mastery", "Digital Marketing & web development", "Computer Maintenance & Graphics Designing"] }
    ]
  },
  printing: { 
    title: "Printing Press", 
    tag: "Corporate Branding",
    desc: "High-volume printing and branding solutions.",
    sections: [
      { label: "Offset & Digital Press", items: ["High-Volume Books", "Brochures & Flyers", "Magazines", "Business Stationery"] },
      { label: "Corporate Branding", items: ["Logo Design", "Uniform Branding", "Signage & Billboards", "Vehicle Wrapping"] }
    ]
  },
  realestate: { 
    title: "Real Estate", 
    tag: "Smart Infrastructure",
    desc: "Developing and managing high-quality residential and industrial properties across Douala.",
    sections: [
      { label: "Property Development", items: ["Smart Student Housing", "Modern Residential Apartments", "Industrial Flex Spaces", "Eco-friendly Gated Communities"] },
      { label: "Digital Management", items: ["PropTech Solutions", "3D Virtual Tours", "Verified Title Portal", "Automated Rent Tracking"] }
    ]
  },
  software: { 
    title: "Software Dev", 
    tag: "Full-Stack Engineering",
    desc: "Engineering high-performance web and mobile solutions using the MERN stack and React Native.",
    sections: [
      { label: "Development Tiers", items: ["MERN Stack Web Apps", "React Native Mobile Apps", "Progressive Web Apps (PWA)", "Custom API Development"] },
      { label: "Technical Operations", items: ["Cloud Hosting (Vercel/AWS)", "Database Optimization", "Cybersecurity & JWT", "CI/CD Deployment"] }
    ]
  },
  farming: { 
    title: "DTEC Farming", 
    tag: "Agri-Automation",
    desc: "Smart solutions for the modern Cameroonian farmer.",
    sections: [
      { label: "Smart Irrigation", items: ["Soil Moisture Sensors", "Drip System Automation", "Solar-Powered Pumps", "Remote Monitoring"] },
      { label: "Poultry Automation", items: ["Climate Control Systems", "Automated Feeding", "Water Quality Tracking", "Egg Yield Data"] }
    ]
  },
};

export default function Sectors() {
  const sectors = useQuery(api.sectors.list);
  const [activeSectorKey, setActiveSectorKey] = useState("academy");

  if (!sectors) {
    return (
      <div className="h-[600px] flex flex-col items-center justify-center bg-[#E5E7EB]">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="font-black uppercase tracking-[0.3em] text-[10px] text-gray-500 italic">Initializing DTEC Systems...</p>
      </div>
    );
  }

  // Handle ordering and matching dynamically
  const sortedSectors = [...sectors].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const activeSectorData = sectorInfo[activeSectorKey] || sectorInfo["academy"];

  return (
    <section id="sectors" className="py-24 bg-[#E5E7EB] rounded-t-[3rem] md:rounded-t-[5rem] -mt-12 relative z-20">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Navigation Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-12">
          {sortedSectors.map((sector) => (
            <button
              key={sector._id}
              onClick={() => setActiveSectorKey(sector.key)}
              className={`p-6 rounded-[2.5rem] transition-all border-2 text-left flex flex-col justify-between min-h-[170px] cursor-pointer group ${
                activeSectorKey === sector.key 
                ? 'bg-[#D1D5DB] border-primary shadow-xl scale-[1.02]' 
                : 'bg-[#F3F4F6] border-transparent opacity-70 hover:opacity-100 hover:bg-[#F9FAFB]'
              }`}
            >
              {/* FIXED AREA: Conditional Logo for Academy */}
              <div className="mb-4">
                {sector.key === "academy" ? (
                  <img 
                    src={DIIMATS_LOGO} 
                    alt="DIIMATS Logo" 
                    className="h-10 w-auto object-contain group-hover:scale-110 transition-transform"
                  />
                ) : (
                  <span className="text-3xl group-hover:scale-110 transition-transform block">
                    {sector.emoji || "⚡"}
                  </span>
                )}
              </div>

              <div className="mt-auto">
                <span className="block text-sm font-black uppercase italic leading-tight text-[#1F2937]">
                  {sectorInfo[sector.key]?.title.split(' ')[0] || sector.key} {/* Dynamic label */}
                </span>
                <span className={`text-[9px] font-black uppercase tracking-widest mt-1 ${activeSectorKey === sector.key ? 'text-primary' : 'text-gray-500'}`}>
                  {sector.key}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Dynamic Content Display (Nested sections preserved) */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeSectorKey}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="bg-[#F9FAFB] rounded-[3rem] md:rounded-[4rem] p-8 md:p-16 shadow-2xl border border-gray-300 flex flex-col lg:flex-row gap-12"
          >
            <div className="lg:w-2/3">
              <div className="flex items-center gap-6 mb-8">
                {activeSectorKey === "academy" && (
                  <img src={DIIMATS_LOGO} alt="DIIMATS" className="h-16 w-auto object-contain bg-white p-2 rounded-xl border border-gray-100" />
                )}
                <span className="px-4 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full border border-primary/20">
                  {activeSectorData.tag}
                </span>
              </div>

              <h2 className="text-4xl md:text-7xl font-black uppercase italic mb-8 text-[#1F2937] leading-[0.9]">
                {activeSectorData.title}
              </h2>
              
              <p className="text-lg text-gray-500 font-bold mb-12 leading-relaxed max-w-2xl">
                {activeSectorData.desc}
              </p>
              
              {/* Preserve detailed nested sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {activeSectorData.sections.map((section: any, idx: number) => (
                  <div key={idx} className="space-y-6">
                    <h4 className="text-primary font-black uppercase text-[11px] tracking-[0.3em] flex items-center gap-3">
                      <span className="w-8 h-[2px] bg-primary"></span>
                      {section.label}
                    </h4>
                    <div className="space-y-3">
                      {section.items.map((item: string, i: number) => (
                        <div key={i} className="flex items-center gap-4 font-black text-[10px] uppercase text-gray-700 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                          <span className="w-2 h-2 bg-primary rounded-full"></span> 
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar preserved */}
            <div className="lg:w-1/3">
              <div className="sticky top-32 bg-[#1F2937] rounded-[3rem] p-10 text-white border-b-[12px] border-primary shadow-2xl">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
                   {activeSectorKey === "academy" ? (
                      <img src={DIIMATS_LOGO} alt="DIIMATS" className="h-8 w-auto object-contain" />
                   ) : (
                      <span className="text-2xl">{sortedSectors.find(s=>s.key === activeSectorKey)?.emoji || "⚡"}</span>
                   )}
                </div>
                <h3 className="text-2xl font-black uppercase italic mb-4">Expert Access</h3>
                <a href="https://wa.me/237677567624" target="_blank" rel="noopener noreferrer" className="block w-full py-5 bg-primary text-white text-center font-black rounded-2xl uppercase tracking-[0.2em] text-[11px]">
                  WhatsApp Specialist
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}