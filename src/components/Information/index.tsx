import ContactItem from '../ContactItem';
import Markdown from '../Markdown';
import PublicImage from '../PublicImage';
import type { DataProps } from '../../types';

const INTRO_CHARACTER_DELAY = 45;
const INTRO_CHARACTER_DURATION = 420;
const INTRODUCTIONS_GAP = 120;

function renderAnimatedText(text: string, startIndex = 0) {
  return Array.from(text).map((character, index) => (
    <span
      key={`${startIndex + index}-${character}`}
      className="intro-title-character"
      style={{ animationDelay: `${(startIndex + index) * INTRO_CHARACTER_DELAY}ms` }}
    >
      {character === ' ' ? '\u00a0' : character}
    </span>
  ));
}

function Information({ information }: Pick<DataProps, 'information'>) {
  const visibleContacts = information.contact.filter(({ hidden }) => !hidden);
  const greeting = '안녕하세요.';
  const roleStartIndex = Array.from(greeting).length;
  const nameStartIndex = roleStartIndex + Array.from(information.role).length + 1;
  const suffixStartIndex = nameStartIndex + Array.from(information.name).length;
  const totalCharacterCount = suffixStartIndex + Array.from('입니다.').length;
  const introductionsDelay =
    (totalCharacterCount - 1) * INTRO_CHARACTER_DELAY +
    INTRO_CHARACTER_DURATION +
    INTRODUCTIONS_GAP;

  return (
    <section className="information" aria-labelledby="intro-title">
      <div className="profile-row">
        <PublicImage
          src="/images/information/profile.jpeg"
          alt={`${information.name} 프로필`}
          fallback="PROFILE"
          className="profile-image"
        />
        <div>
          <h1
            id="intro-title"
            aria-label={`${greeting} ${information.role} ${information.name}입니다.`}
          >
            <span className="intro-title-line" aria-hidden="true">
              {renderAnimatedText(greeting)}
            </span>
            <span className="intro-title-line" aria-hidden="true">
              {renderAnimatedText(information.role, roleStartIndex)}
              {renderAnimatedText(' ', nameStartIndex - 1)}
              <strong>{renderAnimatedText(information.name, nameStartIndex)}</strong>
              {renderAnimatedText('입니다.', suffixStartIndex)}
            </span>
          </h1>
          {visibleContacts.length > 0 && (
            <nav className="contact-links" aria-label="연락처 링크">
              {visibleContacts.map((contact) => (
                <ContactItem key={contact.id} {...contact}>
                  {contact.name}
                </ContactItem>
              ))}
            </nav>
          )}
        </div>
      </div>

      <div className="introductions-reveal" style={{ animationDelay: `${introductionsDelay}ms` }}>
        <Markdown src="/markdown/information/introduce.md" className="introductions" />
      </div>
    </section>
  );
}

export default Information;
