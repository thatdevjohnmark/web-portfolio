import type { Metadata } from 'next';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Container from '../components/Container';
import SectionTitle from '../components/ui/SectionTittle';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

import { experience } from '../data/experience';

export const metadata: Metadata = {
  title: 'Experience - John Mark Tactacan',
  description: 'Experience and project work in manual testing, data validation, and full-stack development.',
};

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-[#000000]">
      <Navbar />

      <section className="py-20 bg-[#000000] border-b border-[#333333]">
        <Container>
          <SectionTitle
            title="Experience & Projects"
            subtitle="Hands-on work across development, documentation, and QA practices"
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {experience.map((item) => (
              <Card key={item.id} hover className="flex flex-col">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h3
                      className="text-2xl font-bold text-[#FFFFFF]"
                      style={{ fontFamily: 'Inter' }}
                    >
                      {item.role}
                    </h3>
                    <div className="text-[#B0B0B0] mt-1">{item.company}</div>
                  </div>

                  <div className="text-sm text-[#B0B0B0] whitespace-nowrap">{item.period}</div>
                </div>

                <p className="text-[#B0B0B0] mt-4 leading-relaxed flex-1">{item.description}</p>

                <div className="flex flex-wrap gap-2 mt-6">
                  {item.technologies.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
