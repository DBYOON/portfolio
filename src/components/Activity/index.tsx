import ActivityItem from './ActivityItem'
import SectionTitle from '../SectionTitle'
import type { DataProps } from '../../types'

function Activity({ activity }: Pick<DataProps, 'activity'>) {
  return (
    <section aria-labelledby="activities-title">
      <SectionTitle id="activities-title">Activities</SectionTitle>
      <div className="simple-list">
        {[...activity].reverse().map((item) => (
          <ActivityItem key={item.id} {...item} />
        ))}
      </div>
    </section>
  )
}

export default Activity
