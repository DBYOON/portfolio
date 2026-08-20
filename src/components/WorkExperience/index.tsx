import SectionTitle from '../SectionTitle';
import ScrollRevealSection from '../ScrollRevealSection';
import WorkExperienceItem from './WorkExperienceItem';
import type { DataProps } from '../../types';

function WorkExperience({ workExperience }: Pick<DataProps, 'workExperience'>) {
  return (
    <ScrollRevealSection labelledBy="experience-title">
      <SectionTitle id="experience-title">CAREER</SectionTitle>
      <div className="entry-list">
        {[...workExperience].reverse().map((experience) => (
          <WorkExperienceItem key={experience.id} {...experience} />
        ))}
      </div>
    </ScrollRevealSection>
  );
}

export default WorkExperience;
