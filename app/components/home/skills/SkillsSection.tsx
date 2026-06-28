import Container from '../../Container';
import Card from '../../ui/Card';
import Badge from '../../ui/Badge';
import SectionTitle from '../../ui/SectionTittle';
import { skills } from '../../../data/skills';

export default function SkillsSection() {
  return (
    <section className="py-20 bg-[#1A1A1A] border-b-[3px] border-[#333333]">
      <Container>
        <SectionTitle
          title="[ SKILLS & EXPERTISE ]"
          subtitle="Technologies and tools I work with"
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {skills.map((skillGroup) => (
            <Card key={skillGroup.category}>
              <h3 className="font-pixel text-[13px] text-[#FFFFFF] mb-4 tracking-wider">
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
