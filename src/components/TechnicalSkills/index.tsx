import SectionTitle from '../SectionTitle'
import type { DataProps } from '../../types'

function TechnicalSkills({ technicalSkills }: Pick<DataProps, 'technicalSkills'>) {
  const skills = [...new Set(technicalSkills.flatMap((group) => group.skills))]

  return (
    <section className="skills-section" aria-labelledby="skills-title">
      <SectionTitle id="skills-title">Skills</SectionTitle>
      <div className="skill-badges" aria-label="보유 기술">
        {skills.map((skill) => (
          <span className="skill-badge" key={skill}>
            {skill}
          </span>
        ))}
      </div>
    </section>
  )
}

export default TechnicalSkills
