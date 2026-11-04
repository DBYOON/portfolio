import type { ActivityProps } from '../../types';

function ActivityItem({ name, period, description, links }: ActivityProps) {
  return (
    <article className="simple-entry">
      <div>
        <h3>{name}</h3>
        <p className="period">
          {period[0]} - {period[1]}
        </p>
        {links && links.length > 0 && (
          <div className="entry-links">
            {links.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                {link.name}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 3h6v6" />
                  <path d="M10 14 21 3" />
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                </svg>
              </a>
            ))}
          </div>
        )}
      </div>
      <p>{description}</p>
    </article>
  );
}

export default ActivityItem;
