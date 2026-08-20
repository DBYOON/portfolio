import ActivityItem from './ActivityItem';
import SectionTitle from '../SectionTitle';
import ScrollRevealSection from '../ScrollRevealSection';
import type { DataProps } from '../../types';

function Activity({ activity }: Pick<DataProps, 'activity'>) {
  return (
    <ScrollRevealSection labelledBy="activities-title">
      <SectionTitle id="activities-title">Activities</SectionTitle>
      <div className="simple-list">
        {[...activity].reverse().map((item) => (
          <ActivityItem key={item.id} {...item} />
        ))}
      </div>
    </ScrollRevealSection>
  );
}

export default Activity;
