export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-6">About Gondia Today</h1>

      <p className="mb-6">
        Welcome to <strong>Gondia Today</strong>, your trusted source for the
        latest news, updates, and stories from Gondia District and beyond.
      </p>

      <p className="mb-6">
        Our mission is to provide accurate, timely, and unbiased news that
        matters to our local community. We cover a wide range of topics
        including local news, politics, business, education, sports, health,
        technology, entertainment, weather, and community events.
      </p>

      <p className="mb-6">
        At Gondia Today, we believe that quality journalism strengthens
        communities. Our editorial team is committed to fact-based reporting,
        transparency, and responsible journalism.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>

      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Deliver fast and reliable local news.</li>
        <li>Promote community awareness and engagement.</li>
        <li>Provide informative and unbiased reporting.</li>
        <li>
          Support digital journalism with modern technology and AI-powered
          features.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">What We Cover</h2>

      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Local News</li>
        <li>Breaking News</li>
        <li>Politics</li>
        <li>Business</li>
        <li>Education</li>
        <li>Sports</li>
        <li>Health</li>
        <li>Technology</li>
        <li>Entertainment</li>
        <li>Weather</li>
        <li>Government Announcements</li>
        <li>Jobs and Career Updates</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Editorial Standards
      </h2>

      <p className="mb-6">
        We strive to verify information before publication. If errors are
        identified, we correct them as quickly as possible and clearly update
        the article when necessary.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>

      <p className="mb-2">
        For news tips, corrections, advertising inquiries, or general
        questions, please contact us through our Contact page or email us at:
      </p>

      <p className="mb-6">
        <strong>Email:</strong>{" "}
        <a
          href="mailto:contact@gondiatoday.com"
          className="text-blue-600 hover:underline"
        >
          contact@gondiatoday.com
        </a>
      </p>

      <p>
        Thank you for trusting <strong>Gondia Today</strong> as your local news
        source.
      </p>
    </main>
  );
}