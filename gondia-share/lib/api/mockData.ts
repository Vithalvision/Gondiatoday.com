import { Article, GalleryImage, VideoStory } from '../types';
import { CATEGORIES } from '../categories';

// NOTE: This file simulates a data layer. In production, replace each
// function body with a Prisma query (see lib/api/articles.ts for the
// intended real signatures) hitting PostgreSQL.

const AUTHORS = {
  rakesh: { name: 'Rakesh T.', avatar: '/images/avatars/rakesh.jpg' },
  priya: { name: 'Priya S.', avatar: '/images/avatars/priya.jpg' },
  amit: { name: 'Amit D.', avatar: '/images/avatars/amit.jpg' },
  neha: { name: 'Neha R.', avatar: '/images/avatars/neha.jpg' },
  drpatil: { name: 'Dr. S. Patil', avatar: '/images/avatars/patil.jpg' },
  editorial: { name: 'Editorial Team', avatar: '/images/avatars/editorial.jpg' },
};

export const HERO_ARTICLE: Article = {
  id: 'hero-1',
  slug: 'gondia-mein-tej-baarish-se-jalbharaav',
  title: 'गोंदिया में तेज बारिश से जलभराव, प्रशासन ने जारी की एडवाइजरी',
  excerpt:
    'शुक्रवार शाम हुई तेज बारिश के कारण शहर के कई क्षेत्रों में जलभराव की स्थिति बन गई है। प्रशासन ने नागरिकों से सतर्क रहने की अपील की है।',
  image:
    'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1600&auto=format&fit=crop',
  category: CATEGORIES.gondia,
  author: AUTHORS.rakesh,
  publishedAt: '2025-06-27T12:00:00.000Z',
  readTime: '10 min read',
  featured: true,
};

export const TOP_STORIES: Article[] = [
  {
    id: 'top-1',
    slug: 'railway-station-kayakalp',
    title: 'गोंदिया रेलवे स्टेशन का होगा कायाकल्प, ₹50 करोड़ की योजना मंजूर',
    excerpt: '',
    image:
      'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=400&auto=format&fit=crop',
    category: CATEGORIES.gondia,
    author: AUTHORS.editorial,
    publishedAt: '2025-06-27T10:00:00.000Z',
    readTime: '2 hours ago',
  },
  {
    id: 'top-2',
    slug: 'neet-pariksha-shandar-pradarshan',
    title: 'गोंदिया के छात्रों ने NEET परीक्षा में किया शानदार प्रदर्शन',
    excerpt: '',
    image:
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=400&auto=format&fit=crop',
    category: CATEGORIES.education,
    author: AUTHORS.editorial,
    publishedAt: '2025-06-27T08:00:00.000Z',
    readTime: '4 hours ago',
  },
  {
    id: 'top-3',
    slug: 'zilla-parishad-baithak-nirnay',
    title: 'जिल्हा परिषद की बैठक में कई महत्वपूर्ण निर्णय पारित',
    excerpt: '',
    image:
      'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=400&auto=format&fit=crop',
    category: CATEGORIES.politics,
    author: AUTHORS.editorial,
    publishedAt: '2025-06-27T06:00:00.000Z',
    readTime: '6 hours ago',
  },
  {
    id: 'top-4',
    slug: 'khiladi-swarna-padak',
    title: 'गोंदिया के खिलाड़ी ने राज्य स्तर पर जीता स्वर्ण पदक',
    excerpt: '',
    image:
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=400&auto=format&fit=crop',
    category: CATEGORIES.sports,
    author: AUTHORS.editorial,
    publishedAt: '2025-06-27T04:00:00.000Z',
    readTime: '8 hours ago',
  },
];

export const LATEST_NEWS: Article[] = [
  {
    id: 'latest-1',
    slug: 'naveen-tehsil-karyalay-udghatan',
    title: 'नवीन तहसील कार्यालय का उद्घाटन',
    excerpt: 'जिलाधिकारी ने नवीन तहसील कार्यालय का फीता काटकर उद्घाटन किया।',
    image:
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=400&auto=format&fit=crop',
    category: CATEGORIES.gondia,
    author: AUTHORS.priya,
    publishedAt: '2025-06-27T07:00:00.000Z',
    readTime: '5 min read',
  },
  {
    id: 'latest-2',
    slug: 'sarkar-yojana-kisanon-ko-labh',
    title: 'महाराष्ट्र सरकार की नई योजना से किसानों को लाभ',
    excerpt: 'मुख्यमंत्री ने किसानों के लिए नई योजना की घोषणा की।',
    image:
      'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?q=80&w=400&auto=format&fit=crop',
    category: CATEGORIES.maharashtra,
    author: AUTHORS.amit,
    publishedAt: '2025-06-27T06:30:00.000Z',
    readTime: '6 min read',
  },
  {
    id: 'latest-3',
    slug: 'naye-udyog-ko-mili-manjuri',
    title: 'गोंदिया में नए उद्योग को मिली मंजूरी',
    excerpt: 'जिले में रोजगार के अवसर बढ़ेंगे।',
    image:
      'https://images.unsplash.com/photo-1565514020179-026b92b2d70b?q=80&w=400&auto=format&fit=crop',
    category: CATEGORIES.business,
    author: AUTHORS.neha,
    publishedAt: '2025-06-27T06:00:00.000Z',
    readTime: '6 min read',
  },
  {
    id: 'latest-4',
    slug: 'dengue-maamlo-mein-vridhi',
    title: 'जिले में डेंगू के मामलों में वृद्धि',
    excerpt: 'स्वास्थ्य विभाग ने सतर्क रहने की अपील की।',
    image:
      'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=400&auto=format&fit=crop',
    category: CATEGORIES.health,
    author: AUTHORS.drpatil,
    publishedAt: '2025-06-27T05:00:00.000Z',
    readTime: '4 min read',
  },
];

export const EDITORS_PICK: Article[] = [
  {
    id: 'pick-1',
    slug: 'nagzira-paryatan-ratna',
    title: 'नागझिरा: गोंदिया का पर्यटन रत्न',
    excerpt: 'नागझिरा वन्यजीव अभयारण्य की प्राकृतिक सुंदरता और पर्यटन संभावनाएं।',
    image:
      'https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1200&auto=format&fit=crop',
    category: CATEGORIES.gondia,
    author: AUTHORS.editorial,
    publishedAt: '2025-06-27T09:00:00.000Z',
    readTime: '7 min read',
    featured: true,
  },
  {
    id: 'pick-2',
    slug: 'gondia-ka-vikas-ek-nazar',
    title: 'गोंदिया का विकास: एक नज़र में',
    excerpt: 'पिछले कुछ वर्षों में गोंदिया जिले में हुए विकास कार्यों की जानकारी।',
    image:
      'https://images.unsplash.com/photo-1556767576-5ec41e3239ea?q=80&w=1200&auto=format&fit=crop',
    category: CATEGORIES.gondia,
    author: AUTHORS.editorial,
    publishedAt: '2025-06-26T09:00:00.000Z',
    readTime: '6 min read',
  },
];

export const TRENDING: { id: string; title: string }[] = [
  { id: 't1', title: 'गोंदिया में तेज बारिश से जलभराव' },
  { id: 't2', title: 'रेलवे स्टेशन का होगा कायाकल्प' },
  { id: 't3', title: 'NEET में गोंदिया के छात्रों का प्रदर्शन' },
  { id: 't4', title: 'जिल्हा परिषद की बैठक में निर्णय' },
  { id: 't5', title: 'गोंदिया के खिलाड़ी ने जीता पदक' },
];

export const IN_SHORT_ITEMS: string[] = [
  'बारिश रात 5 बजे से शुरू हुई',
  'कई सड़कें जलमग्न',
  'प्रशासन ने जारी की एडवाइजरी',
  'आपातकालीन नंबर जारी',
];

export const VIDEO_STORIES: VideoStory[] = [
  {
    id: 'v1',
    title: 'गोंदिया में सम्मान समारोह',
    thumbnail:
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=600&auto=format&fit=crop',
    duration: '2:45',
  },
  {
    id: 'v2',
    title: 'शहर का प्रवेश द्वार',
    thumbnail:
      'https://images.unsplash.com/photo-1601758228041-3caa30b69ad6?q=80&w=600&auto=format&fit=crop',
    duration: '3:12',
  },
  {
    id: 'v3',
    title: 'बारिश के बाद शहर का हाल',
    thumbnail:
      'https://images.unsplash.com/photo-1428592953211-077101b2021b?q=80&w=600&auto=format&fit=crop',
    duration: '4:05',
  },
];

export const PHOTO_GALLERY: GalleryImage[] = [
  {
    id: 'g1',
    src: 'https://images.unsplash.com/photo-1428592953211-077101b2021b?q=80&w=400&auto=format&fit=crop',
    alt: 'जलभराव की स्थिति',
  },
  {
    id: 'g2',
    src: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?q=80&w=400&auto=format&fit=crop',
    alt: 'शहर का प्रवेश द्वार',
  },
  {
    id: 'g3',
    src: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=400&auto=format&fit=crop',
    alt: 'झरना',
  },
  {
    id: 'g4',
    src: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=400&auto=format&fit=crop',
    alt: 'ऐतिहासिक इमारत',
  },
];

export const LOCAL_SPOTLIGHT = {
  title: 'तिरोड़ा',
  image:
    'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=600&auto=format&fit=crop',
  href: '/gondia/tiroda',
};
