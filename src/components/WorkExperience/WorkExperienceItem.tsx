import Markdown from '../Markdown';
import PublicImage from '../PublicImage';
import type { WorkExperienceProps } from '../../types';

function WorkExperienceItem({ name, position, period, id, image }: WorkExperienceProps) {
  return (
    <article className="entry">
      <div className="entry-meta-column">
        <aside className="entry-meta">
          <PublicImage
            src={image ?? `/images/workExperience/${id}.png`}
            alt={`${name} 로고`}
            fallback={name.slice(0, 2)}
            className="entry-logo"
          />
        </aside>
      </div>

      <div className="entry-content">
        <header className="experience-header">
          <h3>{name}</h3>
          <p className="experience-period">
            {period[0]} - {period[1]}
          </p>
          <div className="experience-roles" aria-label="담당 역할">
            <span>{position}</span>
          </div>
        </header>

        <div className="experience-works">
          <Markdown src={`/markdown/workExperience/${id}.md`} />
        </div>
      </div>
    </article>
  );
}

export default WorkExperienceItem;
