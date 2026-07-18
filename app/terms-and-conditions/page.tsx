export default function TermsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-6">Terms and Conditions</h1>

      <p className="text-sm text-gray-500 mb-6">
        <strong>Last Updated:</strong> June 28, 2026
      </p>

      <p className="mb-6">
        Welcome to Gondia Today. By accessing and using this website, you agree
        to comply with these Terms and Conditions.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Acceptance of Terms
      </h2>

      <p className="mb-6">
        By using Gondia Today, you agree to these Terms. If you do not agree,
        please discontinue use of the website.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Content</h2>

      <p className="mb-4">
        All articles, images, graphics, logos, and other materials published on
        Gondia Today are protected by applicable intellectual property laws.
      </p>

      <p className="font-medium mb-2">You may:</p>

      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Read and share articles using proper links.</li>
        <li>Quote limited portions with appropriate attribution.</li>
      </ul>

      <p className="font-medium mb-2">You may not:</p>

      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Copy entire articles without permission.</li>
        <li>Republish our content for commercial purposes.</li>
        <li>Modify or distribute our content without authorization.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">User Conduct</h2>

      <p className="mb-4">Users agree not to:</p>

      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Post unlawful or abusive content.</li>
        <li>Spread false information.</li>
        <li>Attempt unauthorized access to the website.</li>
        <li>Upload malicious software or harmful code.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Accuracy of Information
      </h2>

      <p className="mb-6">
        We strive for accuracy, but we do not guarantee that all information is
        complete, error-free, or current at all times.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">External Links</h2>

      <p className="mb-6">
        Our website may contain links to third-party websites. We are not
        responsible for the content, policies, or practices of those websites.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Advertisements</h2>

      <p className="mb-6">
        Advertisements displayed on Gondia Today are provided by third-party
        advertising partners. We are not responsible for the products or
        services advertised.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Limitation of Liability
      </h2>

      <p className="mb-6">
        Gondia Today shall not be liable for any direct or indirect damages
        arising from the use of this website.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Changes</h2>

      <p className="mb-6">
        We reserve the right to modify these Terms and Conditions at any time.
        Continued use of the website constitutes acceptance of the updated
        Terms.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Governing Law</h2>

      <p className="mb-6">
        These Terms shall be governed by the laws of India.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Contact</h2>

      <p className="mb-2">
        For any questions regarding these Terms, please contact us at:
      </p>

      <p>
        <strong>Email:</strong>{" "}
        <a
          href="mailto:legal@gondiatoday.com"
          className="text-blue-600 hover:underline"
        >
          legal@gondiatoday.com
        </a>
      </p>
    </main>
  );
}