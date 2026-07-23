import ContactItem from '../ContactItem';
import Markdown from '../Markdown';
import PublicImage from '../PublicImage';
import type { DataProps } from '../../types';

function Information({ information }: Pick<DataProps, 'information'>) {
  const visibleContacts = information.contact.filter(({ hidden }) => !hidden);

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
          <h1 id="intro-title">
            안녕하세요,
            <br />
            {information.role} <strong>{information.name}</strong>입니다.
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

      <Markdown src="/markdown/information/introduce.md" className="introductions" />
    </section>
  );
}

export default Information;
