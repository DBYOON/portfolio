import { useEffect } from 'react';
import type { DataProps } from '../../types';
import './information2.css';

interface Information2Props extends Pick<DataProps, 'information' | 'workExperience'> {
  onIntroductionsReveal?: () => void;
}

function Keyboard() {
  return (
    <svg
      className="information2-keyboard"
      width="350"
      height="156"
      viewBox="0 0 350 156"
      aria-hidden="true"
    >
      <rect x="0" y="8" width="350" height="148" rx="14" fill="var(--hero-shade)" />
      <rect width="350" height="148" rx="14" fill="var(--hero-light)" />
      <rect x="9" y="9" width="332" height="129" rx="9" fill="var(--hero-mid)" />
      {[0, 1, 2, 3].map((row) => (
        <g key={row}>
          {Array.from({ length: 12 }, (_, col) => (
            <rect
              key={col}
              x={16 + col * 26.5}
              y={16 + row * 24}
              width="23"
              height="19"
              rx="4"
              fill={row === 0 && col === 0 ? 'var(--hero-accent)' : 'var(--hero-paper)'}
            />
          ))}
        </g>
      ))}
      <g fill="var(--hero-paper)">
        <rect x="16" y="112" width="30" height="19" rx="4" />
        <rect x="50" y="112" width="30" height="19" rx="4" />
        <rect x="84" y="112" width="170" height="19" rx="4" />
        <rect x="258" y="112" width="30" height="19" rx="4" />
        <rect x="292" y="112" width="42" height="19" rx="4" />
      </g>
    </svg>
  );
}

function Mouse() {
  return (
    <svg
      className="information2-mouse"
      width="86"
      height="136"
      viewBox="0 0 86 136"
      aria-hidden="true"
    >
      <rect y="6" width="86" height="130" rx="41" fill="var(--hero-shade)" />
      <rect width="86" height="130" rx="41" fill="var(--hero-pale)" />
      <path d="M43 0V53M1 53H85" fill="none" stroke="var(--hero-light)" strokeWidth="2" />
      <rect x="37" y="20" width="12" height="26" rx="6" fill="var(--hero-shade)" />
      <path
        d="M15 72V88C15 100 21 110 29 115"
        fill="none"
        stroke="var(--hero-paper)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Information2({ information, workExperience, onIntroductionsReveal }: Information2Props) {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = window.setTimeout(() => onIntroductionsReveal?.(), reducedMotion ? 0 : 3000);
    return () => window.clearTimeout(timer);
  }, [onIntroductionsReveal]);

  return (
    <section className="information2" aria-labelledby="information2-title">
      <div className="information2-scene">
        <div className="information2-main-position">
          <div className="information2-main-card">
            <div className="information2-main-content">
              <h1 id="information2-title">
                <span>안녕하세요</span>
                <span>{information.role}</span>
                <span>
                  <strong>{information.name}</strong>입니다.
                </span>
              </h1>
              <img
                className="information2-main-photo"
                src="/images/information/profile.jpeg"
                width="112"
                height="144"
                alt={`${information.name} 프로필`}
              />
            </div>
          </div>
        </div>

        <div className="information2-resume-position" aria-hidden="true">
          <div className="information2-resume">
            <h2>Resume</h2>
            <h3>Personal Detail</h3>
            <div className="information2-details">
              <div className="information2-resume-photo" />
              <dl>
                <dt>Name</dt>
                <dd>{information.name}</dd>
                <dt>Birth</dt>
                <dd>0000.00.00</dd>
                <dt>Email</dt>
                <dd>hello.duckboda@gmail.com</dd>
                <dt>Phone</dt>
                <dd>010-0000-0000</dd>
              </dl>
            </div>
            <h3>Work Experience</h3>
            <table>
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Period</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {[...workExperience].reverse().map((work) => (
                  <tr key={work.id}>
                    <td>{work.name}</td>
                    <td>{work.period.join(' – ')}</td>
                    <td>{work.position}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="information2-desk-position" aria-hidden="true">
          <Keyboard />
        </div>
        <div className="information2-mouse-position" aria-hidden="true">
          <Mouse />
        </div>

        <div className="information2-badge-position" aria-hidden="true">
          <div className="information2-straps">
            <i />
            <i />
          </div>
          <div className="information2-badge">
            <div className="information2-badge-inner">
              <div className="information2-badge-circle" />
              <img
                src="/images/information2/profile-character-christmas.png"
                width="150"
                height="180"
                alt=""
              />
              <div className="information2-badge-copy">
                <div className="information2-badge-slot" />
                <div>
                  <b>{information.name}</b>
                  <p>Frontend Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Information2;
