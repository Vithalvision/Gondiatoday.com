export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

      <p className="text-sm text-gray-500 mb-6">
        <strong>Last Updated:</strong> June 29, 2026
      </p>

      <p className="mb-6">
        Gondia Today values your privacy. This Privacy Policy explains how we
        collect, use, and protect your information when you visit our website.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Information We Collect
      </h2>

      <p className="mb-4">We may collect:</p>

      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Name and email address (if you contact us or subscribe)</li>
        <li>IP address</li>
        <li>Browser and device information</li>
        <li>Cookies and analytics data</li>
        <li>Comments submitted by users</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        How We Use Your Information
      </h2>

      <p className="mb-4">We use collected information to:</p>

      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Improve our website and services.</li>
        <li>Respond to inquiries.</li>
        <li>Send newsletters (if subscribed).</li>
        <li>Analyze website traffic.</li>
        <li>Detect fraud and enhance security.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Cookies</h2>

      <p className="mb-4">
        Our website may use cookies to improve user experience, remember
        preferences, and analyze website performance.
      </p>

      <p className="mb-6">
        You may disable cookies through your browser settings.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Third-Party Services
      </h2>

      <p className="mb-4">
        We may use trusted third-party services such as:
      </p>

      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Google Analytics</li>
        <li>Google AdSense</li>
        <li>Social media platforms</li>
        <li>Cloud hosting providers</li>
      </ul>

      <p className="mb-6">
        These services may collect information according to their own privacy
        policies.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Data Security</h2>

      <p className="mb-6">
        We implement reasonable security measures to protect your personal
        information. However, no method of online transmission is completely
        secure.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Children&apos;s Privacy
      </h2>

      <p className="mb-6">
        Our website is not directed toward children under 13 years of age, and
        we do not knowingly collect personal information from children.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Your Rights</h2>

      <p className="mb-4">You may request to:</p>

      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Access your personal data.</li>
        <li>Correct inaccurate information.</li>
        <li>Delete your personal information where applicable.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Changes to This Policy
      </h2>

      <p className="mb-6">
        We may update this Privacy Policy from time to time. Changes will be
        posted on this page.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Contact</h2>

      <p>
        For privacy-related questions, contact us at:
      </p>

      <p className="mt-2">
        <strong>Email:</strong>{" "}
        <a
          href="mailto:privacy@gondiatoday.com"
          className="text-blue-600 hover:underline"
        >
          privacy@gondiatoday.com
        </a>
      </p>
    </main>
  );
}