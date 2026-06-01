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

      <section className="py-20 bg-[#000000] border-b border-[#333333]">
        <Container>
          <SectionTitle
            title="Contact"
            subtitle="Email or call for opportunities and collaboration"
            centered
          />

          <div className="max-w-2xl mx-auto mt-12">
            <Card hover={false}>
              <div className="space-y-6 text-[#B0B0B0]">
                <div>
                  <div className="text-[#FFFFFF] font-semibold" style={{ fontFamily: 'Inter' }}>
                    Email
                  </div>
                  <a
                    className="hover:text-[#FFFFFF] transition-colors"
                    href="mailto:johnmark.tactacan@gmail.com"
                  >
                    johnmark.tactacan@gmail.com
                  </a>
                </div>

                <div>
                  <div className="text-[#FFFFFF] font-semibold" style={{ fontFamily: 'Inter' }}>
                    Phone
                  </div>
                  <a className="hover:text-[#FFFFFF] transition-colors" href="tel:+639762159529">
                    09762159529
                  </a>
                </div>

                <div>
                  <div className="text-[#FFFFFF] font-semibold" style={{ fontFamily: 'Inter' }}>
                    Location
                  </div>
                  <div>Carranglan, Nueva Ecija, Philippines</div>
                </div>

                <div className="pt-2">
                  <a href="mailto:johnmark.tactacan@gmail.com">
                    <Button size="lg">Send Email</Button>
                  </a>
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
