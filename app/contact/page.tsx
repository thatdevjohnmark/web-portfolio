import type { Metadata } from 'next';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Container from '../components/Container';
import SectionTitle from '../components/ui/SectionTittle';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export const metadata: Metadata = {
  title: 'Contact - John Mark Tactacan',
  description: 'Contact John Mark Tactacan (QA Specialist).',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#000000]">
      <Navbar />

      <section className="relative overflow-hidden border-b border-[#1A1A1A] bg-[#000000] py-24 lg:py-32">
        {/* Animated background gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.05),_transparent_45%),radial-gradient(circle_at_bottom_left,_rgba(128,128,128,0.1),_transparent_40%)]" />
        
        {/* Technical Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <Container className="relative z-10">
          <div className="mb-12 flex justify-center">
            <div className="badge-pulse inline-flex items-center gap-3 rounded-full border border-[#222222] bg-[#0A0A0A]/80 px-4 py-1.5 text-xs font-mono tracking-wider text-[#888888] backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-40"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
              </span>
              COMM_LINK: STANDBY // READY_FOR_INPUT
            </div>
          </div>

          <SectionTitle
            title="Establish Connection"
            subtitle="Available for technical consultation, QA auditing, and full-stack collaboration."
            centered
          />

          <div className="max-w-2xl mx-auto mt-12">
            <div className="relative overflow-hidden rounded-2xl border border-[#1A1A1A] bg-[#0A0A0A] p-8 md:p-12 shadow-2xl shadow-black/50">
              {/* Technical corner accents */}
              <div className="absolute top-0 right-0 h-16 w-16 border-t border-r border-white/10 rounded-tr-2xl" />
              <div className="absolute bottom-0 left-0 h-16 w-16 border-b border-l border-white/10 rounded-bl-2xl" />

              <div className="space-y-10 text-[#B0B0B0]">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#555555] mb-2">COMM_CHANNEL // EMAIL</div>
                  <a
                    className="text-xl md:text-2xl font-bold text-white hover:text-gray-400 transition-colors"
                    href="mailto:johnmark.tactacan@gmail.com"
                  >
                    johnmark.tactacan@gmail.com
                  </a>
                </div>

                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#555555] mb-2">COMM_CHANNEL // VOICE</div>
                  <a className="text-xl md:text-2xl font-bold text-white hover:text-gray-400 transition-colors" href="tel:+639762159529">
                    09762159529
                  </a>
                </div>

                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#555555] mb-2">GEO_LOC // COORDINATES</div>
                  <div className="text-lg text-white">Carranglan, Nueva Ecija, Philippines</div>
                </div>

                <div className="pt-6 border-t border-[#1A1A1A]">
                  <a href="mailto:johnmark.tactacan@gmail.com">
                    <Button size="lg" className="w-full bg-white text-black hover:bg-gray-200 py-6 text-base font-bold uppercase tracking-widest">
                      Initialize Transmission
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
