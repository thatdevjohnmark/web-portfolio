import type { Metadata } from 'next';
import Link from 'next/link';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Container from '../components/Container';
import SectionTitle from '../components/ui/SectionTittle';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

export const metadata: Metadata = {
  title: 'Playground - John Mark Tactacan',
  description: 'A sandbox space for testing components, logic, and mini-projects.',
};

export default function PlaygroundPage() {
  return (
    <main className="min-h-screen bg-[#000000]">
      <Navbar />

      <section className="py-20 bg-[#000000] border-b border-[#333333]">
        <Container>
          {/* Section Title */}
          <SectionTitle
            title="Playground"
            subtitle="A digital sandbox exploring personal interests, media, and development experiments."
            centered
          />

          {/* Quick Back Navigation */}
          <div className="mt-6 flex justify-center">
            <Link href="/about" passHref>
              <Button>← Back to About</Button>
            </Link>
          </div>

          {/* Playground Grid / Canvas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            
            {/* Anime Slot */}
   <Card hover={true}>
  <div className="text-xs font-mono text-[#B0B0B0] mb-2">HOBBY_01</div>
  <h3 className="font-pixel text-[13px] text-[#FFFFFF] mb-2 tracking-wider">
    Anime Culture
  </h3>
  <p className="text-[#888888] text-sm leading-relaxed mb-4">
    Exploring compelling storytelling, high-fidelity world-building, and cinematic animation aesthetics. 
  </p>
  <div className="flex flex-wrap gap-1.5 mt-4 mb-6">
    <Badge variant="secondary">Studio Ghibli</Badge>
    <Badge variant="secondary">Type-Moon</Badge>
    <Badge variant="secondary">Fantasy</Badge>
  </div>
  
  {/* Wrap your button with Next.js Link */}
  <Link href="/playground/Anime" passHref>
    <Button>View Details</Button>
  </Link>
</Card>

{/* Gaming Slot */}
<Card hover={true}>
  <div className="flex flex-col h-full min-h-[240px] justify-between">
    
    {/* Top Content: Header & Description */}
    <div>
      <div className="text-xs font-mono text-[#B0B0B0] mb-1.5 tracking-wider">HOBBY_02</div>
      <h3 className="text-xl font-bold text-[#FFFFFF] mb-2">
        Gaming & Hardware
      </h3>
      <p className="text-[#888888] text-sm leading-relaxed">
        Immersed in atmospheric survival horror franchises and optimization tracking for high-performance PC hardware.
      </p>
    </div>

    {/* Bottom Content: Badges & Action Link */}
    <div className="mt-6 flex flex-col gap-4">
      <div className="flex flex-wrap gap-1.5">
        <Badge variant="secondary">Resident Evil</Badge>
        <Badge variant="secondary">PC Benchmarking</Badge>
        <Badge variant="secondary">Survival Horror</Badge>
      </div>

      <Link href="/playground/Games" passHref>
        <Button className="w-full sm:w-auto text-center justify-center">
          View Details
        </Button>
      </Link>
    </div>

  </div>
</Card>

            {/* Formula 1 Slot */}
            <Card hover={true}>
              <div className="flex flex-col h-full min-h-[240px] justify-between">
                
                {/* Top Content: Header & Description */}
                <div>
                  <div className="text-xs font-mono text-[#B0B0B0] mb-1.5 tracking-wider">HOBBY_03</div>
                  <h3 className="text-xl font-bold text-[#FFFFFF] mb-2">
                    Formula 1 // Telemetry
                  </h3>
                  <p className="text-[#888888] text-sm leading-relaxed">
                    Analyzing high-speed aerodynamics, race strategy logic, and the technical engineering behind the pinnacle of motorsport.
                  </p>
                </div>

                {/* Bottom Content: Badges & Action Link */}
                <div className="mt-6 flex flex-col gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="secondary">Aerodynamics</Badge>
                    <Badge variant="secondary">Telemetry</Badge>
                    <Badge variant="secondary">Motorsport</Badge>
                  </div>

                  <Link href="/playground/F1" passHref>
                    <Button className="w-full sm:w-auto text-center justify-center">
                      View Details
                    </Button>
                  </Link>
                </div>

              </div>
            </Card>

          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}