import type { Metadata } from 'next';
import Link from 'next/link'; // 1. Import Next.js Link

import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Container from '@/app/components/Container';
import SectionTitle from '@/app/components/ui/SectionTittle';
import Card from '@/app/components/ui/Card';
import Badge from '@/app/components/ui/Badge';
import Button from '@/app/components/ui/Button'; // 2. Import your Button component

export const metadata: Metadata = {
  title: 'About - John Mark Tactacan',
  description: 'About John Mark Tactacan, QA Specialist based in Nueva Ecija, Philippines.',
};

const coreCompetencies = [
  'Manual Testing',
  'Bug Identification & Resolution',
  'Data Accuracy Validation',
  'Requirement Analysis',
  'Process Documentation',
  'Progress Reporting',
  'Attention to Detail',
  'Analytical Thinking',
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#000000]">
      <Navbar />

      <section className="py-20 bg-[#000000] border-b border-[#333333]">
        <Container>
          <SectionTitle
            title="About"
            subtitle="Detail-oriented IT graduate transitioning into a QA role"
            centered
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
            <Card hover={false}>
              <h3
                className="text-2xl font-bold text-[#FFFFFF] mb-4"
                style={{ fontFamily: 'Inter' }}
              >
                John Mark Tactacan
              </h3>
              <p className="text-[#B0B0B0] leading-relaxed">
                Detail-oriented IT graduate with hands-on experience in full-stack development,
                manual testing, data validation, and bug resolution across multiple projects.
                Experienced in requirement analysis, process documentation, and progress reporting
                to supervisors and stakeholders. Seeking to transition into a QA role by applying
                strong analytical skills, attention to detail, and practical testing experience in a
                collaborative environment.
              </p>

              <div className="mt-6 text-[#B0B0B0]">
                <div className="font-semibold text-[#FFFFFF]">Location</div>
                <div>Carranglan, Nueva Ecija, Philippines</div>
              </div>

              {/* 3. Added the Link and Button here under your location */}
                <div className="mt-8">
                 <Link href="/playground" passHref>
                    <Button>Go to Playground</Button>
                </Link>
                </div>
            </Card>

            <Card hover={false}>
              <h3
                className="text-2xl font-bold text-[#FFFFFF] mb-4"
                style={{ fontFamily: 'Inter' }}
              >
                Core Competencies
              </h3>
              <div className="flex flex-wrap gap-2">
                {coreCompetencies.map((item) => (
                  <Badge key={item} variant="secondary">
                    {item}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card hover={false}>
              <h3
                className="text-2xl font-bold text-[#FFFFFF] mb-2"
                style={{ fontFamily: 'Inter' }}
              >
                Education
              </h3>
              <div className="text-[#B0B0B0]">
                <div className="text-[#FFFFFF] font-semibold">
                  Bachelor of Science in Information Technology (Major in Systems Development)
                </div>
                <div>Central Luzon State University</div>
                <div className="mt-2">08/2021 – 01/2026</div>
                <div className="mb-4">Science City of Muñoz, Nueva Ecija, Philippines</div>
                
                <Link href="/journal" passHref>
                  <Button variant="outline" size="sm" className="w-full border-[#333333] hover:border-white text-white mt-2 cursor-pointer">
                    View Chronological Journal Timeline →
                  </Button>
                </Link>
              </div>
            </Card>

            <Card hover={false}>
              <h3
                className="text-2xl font-bold text-[#FFFFFF] mb-2"
                style={{ fontFamily: 'Inter' }}
              >
                Licenses & Certifications
              </h3>
              <div className="text-[#B0B0B0]">
                <div className="text-[#FFFFFF] font-semibold">AWS Academy Cloud Foundations</div>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}