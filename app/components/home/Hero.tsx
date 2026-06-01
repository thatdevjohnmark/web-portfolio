import Image from 'next/image';
import Button from '../ui/Button';
import Container from '../Container';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[#333333] bg-[#000000] py-20">
      {/* Animated background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.08),_transparent_40%),radial-gradient(circle_at_bottom_left,_rgba(128,128,128,0.14),_transparent_35%)]" />
      
      {/* Accent decorative elements */}
      <div className="absolute top-10 right-20 h-64 w-64 rounded-full bg-[#FFFFFF]/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[#808080]/5 blur-3xl" />

      <Container className="relative z-10 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="space-y-8">
          {/* Top badge with pulse animation */}
          <div className="badge-pulse inline-flex items-center gap-2 rounded-full border border-[#333333] bg-[#1A1A1A]/90 px-4 py-2 text-sm text-[#B0B0B0] backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-[#FFFFFF]" />
            QA Specialist · Manual Testing · Data Validation
          </div>

          {/* Accent line */}
          <div className="accent-line" />

          {/* Main heading with animation */}
          <div className="animate-fade-in-up">
            <h1
              className="max-w-3xl text-5xl font-bold leading-tight text-[#FFFFFF] md:text-7xl"
              style={{ fontFamily: 'Inter' }}
            >
              Building quality
              <span className="block bg-gradient-to-r from-[#FFFFFF] via-[#B0B0B0] to-[#FFFFFF] bg-clip-text text-transparent">
                into every release.
              </span>
              <span className="mt-4 block text-[#B0B0B0]">I&apos;m thatdevjohnmark.</span>
            </h1>
          </div>

          {/* Description */}
          <p className="max-w-2xl text-lg leading-8 text-[#B0B0B0] md:text-xl">
            Detail-oriented IT graduate focused on manual testing, requirement analysis, bug
            validation, and process documentation across real projects. Currently based in Nueva Ecija, Philippines.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/projects">
              <Button size="lg">View Projects</Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline">
                Contact Me
              </Button>
            </Link>
          </div>

          {/* Interactive stat cards */}
          <div className="mt-12 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { label: 'Manual Testing', value: 'Focus', icon: '✓' },
              { label: 'Bug Resolution', value: 'Across projects', icon: '🐛' },
              { label: 'Documentation', value: 'Traceability', icon: '📋' },
            ].map(({ label, value, icon }) => (
              <div
                key={label}
                className="stat-card group relative overflow-hidden rounded-2xl border border-[#333333] bg-[#1A1A1A] p-4"
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="text-sm uppercase tracking-[0.24em] text-[#808080]">{label}</div>
                    <span className="text-lg opacity-70 transition-all group-hover:scale-110 group-hover:opacity-100">
                      {icon}
                    </span>
                  </div>
                  <div className="mt-3 text-base font-semibold text-[#FFFFFF]">{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image section with enhanced effects */}
        <div className="relative mx-auto w-full max-w-xl">
          {/* Outer glow */}
          <div className="animate-glow absolute -inset-4 rounded-[2rem] bg-[#FFFFFF]/10 blur-2xl" />
          
          {/* Animated gradient border container */}
          <div className="animate-float relative overflow-hidden rounded-[2rem] border border-[#333333] bg-[#1A1A1A] shadow-2xl shadow-black/40 transition-all duration-300 hover:border-[#505050] hover:shadow-2xl hover:shadow-[#FFFFFF]/10">
            {/* Image wrapper */}
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src="/images/profile/man-holding-coffee.jpg"
                alt="John Mark Tactacan holding coffee"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFFFFF]/20 to-transparent" />
            </div>

            {/* Bottom info overlay */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-6">
              <div className="text-xs uppercase tracking-[0.3em] text-[#B0B0B0]">📍 Portfolio</div>
              <div className="mt-2 text-2xl font-bold text-[#FFFFFF]">thatdevjohnmark</div>
              <div className="mt-1 flex items-center gap-2 text-sm text-[#B0B0B0]">
                <span>QA Specialist</span>
                <span className="h-1 w-1 rounded-full bg-[#B0B0B0]" />
                <span>Nueva Ecija, PH</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
