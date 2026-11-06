import { useState } from 'react';
import data from '../../data.json';
import Activity from '../components/Activity';
import Footer from '../components/Footer';
import Information2 from '../components/Information2';
import Layout from '../components/Layout';
import Project from '../components/Project';
import TechnicalSkills from '../components/TechnicalSkills';
import WorkExperience from '../components/WorkExperience';
import type { DataProps } from '../types';

const portfolioData = data as DataProps;

function Home() {
  const [isIntroductionRevealed, setIsIntroductionRevealed] = useState(false);
  const { information, technicalSkills, workExperience, project, activity } = portfolioData;

  return (
    <>
      <Information2
        information={information}
        workExperience={workExperience}
        onIntroductionsReveal={() => setIsIntroductionRevealed(true)}
      />
      <Layout>
        <TechnicalSkills technicalSkills={technicalSkills} revealWhen={isIntroductionRevealed} />
        <WorkExperience workExperience={workExperience} />
        <Project project={project} />
        <Activity activity={activity} />
      </Layout>
      <Footer contact={information.contact} name={information.name} />
    </>
  );
}

export default Home;
