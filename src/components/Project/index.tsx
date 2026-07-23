import { useId, useRef, useState, type KeyboardEvent } from 'react';
import ProjectItem from './ProjectItem';
import SectionTitle from '../SectionTitle';
import type { DataProps, ProjectCompany } from '../../types';

const PROJECT_COMPANIES: ProjectCompany[] = ['홈플러스', '아프리카TV', '아이포유웍스'];

function Project({ project }: Pick<DataProps, 'project'>) {
  const [activeCompany, setActiveCompany] = useState<ProjectCompany>('홈플러스');
  const tabListId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const visibleProjects = project.filter(({ company }) => company === activeCompany).reverse();

  const selectTab = (index: number) => {
    setActiveCompany(PROJECT_COMPANIES[index]);
    tabRefs.current[index]?.focus();
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | undefined;

    if (event.key === 'ArrowRight') {
      nextIndex = (index + 1) % PROJECT_COMPANIES.length;
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + PROJECT_COMPANIES.length) % PROJECT_COMPANIES.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = PROJECT_COMPANIES.length - 1;
    }

    if (nextIndex === undefined) return;

    event.preventDefault();
    selectTab(nextIndex);
  };

  return (
    <section aria-labelledby="project-title">
      <SectionTitle id="project-title">Project</SectionTitle>

      <div className="project-tabs" role="tablist" aria-label="회사별 프로젝트">
        {PROJECT_COMPANIES.map((company, index) => {
          const isActive = company === activeCompany;

          return (
            <button
              key={company}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              id={`${tabListId}-${company}-tab`}
              type="button"
              className="project-tab"
              role="tab"
              aria-selected={isActive}
              aria-controls={`${tabListId}-${company}-panel`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveCompany(company)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
            >
              {company}
            </button>
          );
        })}
      </div>

      <div
        id={`${tabListId}-${activeCompany}-panel`}
        className="project-tab-panel"
        role="tabpanel"
        aria-labelledby={`${tabListId}-${activeCompany}-tab`}
        tabIndex={0}
      >
        {visibleProjects.length > 0 ? (
          <div className="project-grid">
            {visibleProjects.map((item) => (
              <ProjectItem key={item.id} {...item} />
            ))}
          </div>
        ) : (
          <p className="project-empty">등록된 프로젝트가 없습니다.</p>
        )}
      </div>
    </section>
  );
}

export default Project;
