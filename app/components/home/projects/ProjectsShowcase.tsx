import Container from '../../Container';
import Card from '../../ui/Card';
import Badge from '../../ui/Badge';
import Button from '../../ui/Button';
import SectionTitle from '../../ui/SectionTittle';
import { projects } from '../../../data/project';
import Link from 'next/link';

export default function ProjectsShowcase() {
  return (
    <section className="py-20 bg-[#000000] border-b border-[#333333]">
      <Container>
        <SectionTitle
          title="Featured Projects"
          subtitle="Explore some of my recent work and side projects"
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {projects.slice(0, 3).map((project) => (
            <Card key={project.id} hover>
              <h3 className="text-2xl font-bold text-[#FFFFFF] mb-3" style={{fontFamily: 'Inter'}}>
                {project.title}
              </h3>
              <p className="text-[#B0B0B0] mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
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

        <div className="text-center mt-12">
          <Link href="/projects">
            <Button size="lg">View All Projects</Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
