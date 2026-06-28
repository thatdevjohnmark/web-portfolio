import Container from '../../Container';
import Button from '../../ui/Button';
import SectionTitle from '../../ui/SectionTittle';
import Link from 'next/link';

export default function ContactCTA() {
  return (
    <section className="py-20 bg-[#111] relative overflow-hidden border-b-[3px] border-[#333]">
      {/* Pixel grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1A1A1A_1px,transparent_1px),linear-gradient(to_bottom,#1A1A1A_1px,transparent_1px)] bg-[size:8px_8px] opacity-30 pointer-events-none" />
      
      <Container className="text-center relative z-10">
        <SectionTitle
          title="[ LET'S WORK TOGETHER ]"
          subtitle="Have an exciting project in mind? I'd love to hear from you!"
          centered
        />
        
        <div className="mt-10">
          <Link href="/contact">
            <Button variant="pixel" size="lg">
              [ START A PROJECT ]
            </Button>
          </Link>
        </div>

        <p className="font-terminal text-[20px] text-[#B0B0B0] mt-8">
          Or reach out directly at{' '}
          <a
            href="mailto:johnmark.tactacan@gmail.com"
            className="text-[#FFFFFF] font-terminal hover:underline transition-all"
          >
            johnmark.tactacan@gmail.com
          </a>
        </p>
      </Container>
    </section>
  );
}
