import Container from '../../Container';
import Button from '../../ui/Button';
import SectionTitle from '../../ui/SectionTittle';
import Link from 'next/link';

export default function ContactCTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-[#FFFFFF] to-[#808080] relative overflow-hidden">
      {/* Dark overlay for consistent text contrast */}
      <div className="absolute inset-0 bg-black/50" />
      
      <Container className="text-center relative z-10">
        <SectionTitle
          title="Let's Work Together"
          subtitle="Have an exciting project in mind? I'd love to hear from you!"
          centered
          className="text-[#FFFFFF]"
        />
        
        <div className="mt-10">
          <Link href="/contact">
            <Button size="lg" variant="secondary">
              Start a Project
            </Button>
          </Link>
        </div>

        <p className="text-[#FFFFFF]/90 mt-8">
          Or reach out directly at{' '}
          <a
            href="mailto:johnmark.tactacan@gmail.com"
            className="text-[#FFFFFF] font-semibold hover:text-[#E0E0E0] transition-colors"
          >
            johnmark.tactacan@gmail.com
          </a>
        </p>
      </Container>
    </section>
  );
}
