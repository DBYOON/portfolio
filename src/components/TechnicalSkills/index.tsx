import SectionTitle from '../SectionTitle';
import ScrollRevealSection from '../ScrollRevealSection';
import type { DataProps } from '../../types';

interface TechnicalSkillsProps extends Pick<DataProps, 'technicalSkills'> {
  revealWhen?: boolean;
}

function TechnicalSkills({ technicalSkills, revealWhen }: TechnicalSkillsProps) {
  const skills = [...new Set(technicalSkills.flatMap((group) => group.skills))];

  return (
    <ScrollRevealSection
      className="skills-section"
      labelledBy="skills-title"
      revealWhen={revealWhen}
    >
      <SectionTitle id="skills-title">Skills</SectionTitle>
      <div className="skill-badges" aria-label="보유 기술">
        {skills.map((skill) => (
          <span className="skill-badge" key={skill}>
            {skill}
          </span>
        ))}
      </div>
    </ScrollRevealSection>
  );
}

export default TechnicalSkills;
