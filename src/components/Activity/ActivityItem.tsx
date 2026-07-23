import type { ActivityProps } from '../../types'

function ActivityItem({ name, period, description }: ActivityProps) {
  return (
    <article className="simple-entry">
      <div>
        <h3>{name}</h3>
        <p className="period">{period[0]} - {period[1]}</p>
      </div>
      <p>{description}</p>
    </article>
  )
}

export default ActivityItem
