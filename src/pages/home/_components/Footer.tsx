const LOGO = "/icon/icon-192.png";

const footerLinks = {
  "Industrial Hub": [
    { label: "Academy", href: "#sectors" },
    { label: "Farming", href: "#sectors" },
    { label: "Printing", href: "#sectors" },
  ],
  Corporate: [
    { label: "Home", href: "#home" },
    { label: "Impact", href: "#impact" },
    { label: "Enroll", href: "#contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-white pt-20 pb-10 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12 mb-16 text-center md:text-left">
        <div>
          <div className="flex items-center gap-2 mb-5 justify-center md:justify-start">
            <img src={LOGO} className="h-8 w-8 rounded-lg object-cover" alt="DTEC" />
            <span className="font-black tracking-tighter uppercase italic text-lg text-foreground">
              DTEC
            </span>
          </div>
          <p className="text-muted-foreground font-semibold text-[10px] uppercase tracking-widest leading-loose">
            Driving industrial innovation <br /> across the Littoral region.
          </p>
        </div>

        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h5 className="text-primary font-black text-[10px] uppercase tracking-widest mb-5 underline decoration-2 underline-offset-8">
              {title}
            </h5>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h5 className="text-primary font-black text-[10px] uppercase tracking-widest mb-5 underline decoration-2 underline-offset-8">
            Location
          </h5>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground leading-loose">
            Douala, Cameroon
            <br />
            Mon – Fri
            <br />
            08:00 – 18:00
          </p>
        </div>
      </div>

      <div className="text-center pt-10 border-t border-border text-muted-foreground text-[9px] font-black tracking-[1em] uppercase">
        DTEC COMPANY &copy; {new Date().getFullYear()}
      </div>
    </footer>
  );
}
