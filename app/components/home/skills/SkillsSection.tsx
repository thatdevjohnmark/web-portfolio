import Container from '../../Container';
import Card from '../../ui/Card';
import Badge from '../../ui/Badge';
import SectionTitle from '../../ui/SectionTittle';
import { skills } from '../../../data/skills';

export default function SkillsSection() {
  return (
    <section className="py-20 bg-[#1A1A1A] border-b border-[#333333]">
      <Container>
        <SectionTitle
          title="Skills & Expertise"
          subtitle="Technologies and tools I work with"
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {skills.map((skillGroup) => (
            <Card key={skillGroup.category}>
              <h3 className="text-2xl font-bold text-[#FFFFFF] mb-4" style={{fontFamily: 'Inter'}}>
                {skillGroup.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((item) => (
                  <Badge key={item} variant="secondary">
                    {item}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
