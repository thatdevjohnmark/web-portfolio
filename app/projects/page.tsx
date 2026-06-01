import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Container from '../components/Container';
import SectionTitle from '../components/ui/SectionTittle';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { projects } from '../data/project';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'A collection of my recent work and side projects.',
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#000000]">
      <Navbar />

      <section className="py-20 bg-[#000000] border-b border-[#333333]">
        <Container>
          <SectionTitle
            title="Projects"
            subtitle="A selection of things I've built"
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {projects.map((project) => (
              <Card key={project.id} hover className="flex flex-col">
                <div className="mb-4 overflow-hidden rounded-md border border-[#333333] bg-[#000000]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={1200}
                    height={600}
                    className="w-full h-40 object-cover grayscale"
                  />
                </div>

                <h3
                  className="text-2xl font-bold text-[#FFFFFF] mb-3"
                  style={{ fontFamily: 'Inter' }}
                >
                  {project.title}
                </h3>

                <p className="text-[#B0B0B0] mb-4 flex-1">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="primary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Link href={project.link} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="w-full">
                    View Project
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
