import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, MessageCircle, MapPin, Phone, Mail } from 'lucide-react';

const QUICK_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms-and-conditions' },
];

const CATEGORY_LINKS = [
  { label: 'Gondia', href: '/gondia' },
  { label: 'Maharashtra', href: '/maharashtra' },
  { label: 'India', href: '/india' },
  { label: 'Politics', href: '/politics' },
  { label: 'More Categories', href: '/categories' },
];

const SERVICE_LINKS = [
  { label: 'Advertise With Us', href: '/advertise' },
  { label: 'News Tips', href: '/tips' },
  { label: 'Careers', href: '/careers' },
  { label: 'Sitemap', href: '/sitemap' },
  { label: 'RSS Feed', href: '/rss' },
];

export function Footer() {
  return (
    <footer
        className="bg-ink text-white/80 notranslate"
        translate="no"
    >
      <div className="max-w-wrap mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-5 gap-10">
        <div className="md:col-span-1">
          <span className="font-display text-2xl font-extrabold">
            <span className="text-white">GONDIA</span>
            <span className="text-brand-light">TODAY</span>
          </span>
          <p className="text-xs text-white/60 mt-1">आपका शहर, आपकी खबर</p>
          <p className="text-xs text-white/50 mt-4 leading-relaxed">
            गोंदिया और आसपास के क्षेत्रों की ताज़ा खबरें, विचार और विश्लेषण।
            हम आपके लिए तथ्यात्मक और जिम्मेदार पत्रकारिता प्रस्तुत करते हैं।
          </p>
          <div className="flex items-center gap-4 mt-5">
            <a href="#" aria-label="Facebook" className="hover:text-brand-light"><Facebook size={16} /></a>
            <a href="#" aria-label="Twitter" className="hover:text-brand-light"><Twitter size={16} /></a>
            <a href="#" aria-label="Instagram" className="hover:text-brand-light"><Instagram size={16} /></a>
            <a href="#" aria-label="YouTube" className="hover:text-brand-light"><Youtube size={16} /></a>
            <a href="#" aria-label="WhatsApp" className="hover:text-brand-light"><MessageCircle size={16} /></a>
          </div>
        </div>

        <FooterColumn title="Quick Links" links={QUICK_LINKS} />
        <FooterColumn title="Categories" links={CATEGORY_LINKS} />
        <FooterColumn title="Services" links={SERVICE_LINKS} />

        <div>
          <h4 className="font-display font-semibold text-white mb-4">Contact Us</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={14} className="mt-0.5 flex-shrink-0" />
              <span>GondiaToday, Gondia, Maharashtra, India</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={14} className="flex-shrink-0" />
              <span>+91 12345 67890</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={14} className="flex-shrink-0" />
              <span>info@gondiatoday.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-wrap mx-auto px-4 h-12 flex items-center justify-between text-xs text-white/50">
          <p>© 2025 GondiaToday. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            Made with <span className="text-brand-light">♥</span> in Gondia
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="font-display font-semibold text-white mb-4">{title}</h4>
      <ul className="space-y-2.5 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="hover:text-brand-light transition-colors">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
