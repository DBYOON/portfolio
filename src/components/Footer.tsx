import ContactItem from './ContactItem';
import type { ContactProps } from '../types';

function Footer({ contact, name }: { contact: ContactProps[]; name: string }) {
  const visibleContacts = contact.filter(({ hidden }) => !hidden);

  return (
    <footer className="footer">
      {visibleContacts.length > 0 && (
        <nav className="contact-links" aria-label="푸터 연락처 링크">
          {visibleContacts.map((item) => (
            <ContactItem key={item.id} {...item}>
              {item.name}
            </ContactItem>
          ))}
        </nav>
      )}
      <p>Copyright 2026. {name} All rights reserved.</p>
    </footer>
  );
}

export default Footer;
