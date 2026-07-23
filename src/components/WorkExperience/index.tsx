import SectionTitle from '../SectionTitle'
import WorkExperienceItem from './WorkExperienceItem'
import type { DataProps } from '../../types'

function WorkExperience({ workExperience }: Pick<DataProps, 'workExperience'>) {
  return (
    <section aria-labelledby="experience-title">
      <SectionTitle id="experience-title">CAREER</SectionTitle>
      <div className="entry-list">
        {[...workExperience].reverse().map((experience) => (
          <WorkExperienceItem key={experience.id} {...experience} />
        ))}
      </div>
    </section>
  )
}

export default WorkExperience
