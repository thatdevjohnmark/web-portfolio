import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/home/Hero';
import ProjectsShowcase from './components/home/projects/ProjectsShowcase';
import SkillsSection from './components/home/skills/SkillsSection';
import ContactCTA from './components/home/contact/ContactCTA';

export const metadata = {
  title: 'thatdevjohnmark',
  description: 'Portfolio of John Mark Tactacan, a QA Specialist with hands-on experience in manual testing, data validation, and full-stack projects.',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#000000]">
      <Navbar />
      <Hero />
      <ProjectsShowcase />
      <SkillsSection />
      <ContactCTA />
      <Footer />
    </main>
  );
}
