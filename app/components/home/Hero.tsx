import Image from 'next/image';
import Button from '../ui/Button';
import Container from '../Container';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-[#1A1A1A] py-20 border-b border-[#333333]">
      <Container className="flex items-center justify-between gap-10">
        <div className="flex-1">
          <h1 className="text-5xl md:text-6xl font-bold text-[#FFFFFF] mb-4" style={{fontFamily: 'Inter'}}>
            Hi, I&apos;m <span className="text-[#B0B0B0]">John Mark Tactacan</span>
          </h1>
          <p className="text-lg text-[#B0B0B0] mb-6 max-w-lg">
            QA Specialist with hands-on experience in manual testing, data validation, requirement analysis, and defect resolution across multiple projects.
          </p>
          <div className="flex gap-4">
            <Link href="/projects">
              <Button size="lg">View Projects</Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline">Get In Touch</Button>
            </Link>
          </div>
        </div>
        
        {/* Hero Image Placeholder */}
        <div className="hidden lg:flex flex-1 justify-center">
          <div className="w-64 h-64 rounded-full overflow-hidden border border-[#333333] bg-[#000000]">
            <Image
              src="/images/profile/profile.jpg"
              alt="Profile photo"
              width={256}
              height={256}
              sizes="256px"
              priority
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
