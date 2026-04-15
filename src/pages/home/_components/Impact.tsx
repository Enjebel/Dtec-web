import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

export default function Impact() {
  return (
    <section
      id="impact"
      className="max-w-6xl mx-auto px-4 md:px-6 py-24"
    >
      <div className="bg-white rounded-[3rem] p-8 md:p-16 border border-border shadow-sm">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-primary font-black uppercase text-[10px] tracking-[0.3em] mb-4">
              Our Track Record
            </p>
            <h2 className="text-5xl font-black uppercase italic mb-8 text-foreground leading-none">
              Industrial <span className="text-primary">Impact.</span>
            </h2>
            <div className="grid grid-cols-2 gap-5 mt-8">
              <div className="p-7 bg-background rounded-[2rem] border border-border">
                <p className="text-4xl font-black text-primary">98%</p>
                <p className="text-[9px] font-black uppercase text-muted-foreground mt-2 tracking-widest">
                  Training Efficiency
                </p>
              </div>
              <div className="p-7 bg-background rounded-[2rem] border border-border">
                <p className="text-4xl font-black text-foreground">500+</p>
                <p className="text-[9px] font-black uppercase text-muted-foreground mt-2 tracking-widest">
                  Graduates
                </p>
              </div>
              <div className="p-7 bg-background rounded-[2rem] border border-border">
                <p className="text-4xl font-black text-foreground">6</p>
                <p className="text-[9px] font-black uppercase text-muted-foreground mt-2 tracking-widest">
                  Industry Sectors
                </p>
              </div>
              <div className="p-7 bg-background rounded-[2rem] border border-border">
                <p className="text-4xl font-black text-primary">2022</p>
                <p className="text-[9px] font-black uppercase text-muted-foreground mt-2 tracking-widest">
                  Founded
                </p>
              </div>
            </div>
          </div>
          <div className="h-64">
            <Line
              data={{
                labels: ["'22", "'23", "'24", "'25", "'26"],
                datasets: [
                  {
                    data: [10, 40, 65, 88, 98],
                    borderColor: "oklch(0.62 0.19 38)",
                    tension: 0.4,
                    borderWidth: 4,
                    pointRadius: 0,
                    fill: true,
                    backgroundColor: "rgba(249, 115, 22, 0.1)",
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false }, tooltip: { enabled: false } },
                scales: { x: { display: false }, y: { display: false } },
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
