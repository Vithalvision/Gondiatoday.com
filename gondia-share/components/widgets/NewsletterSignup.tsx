'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      // In production: POST to /api/newsletter
      setSubmitted(true);
    }
  }

  return (
    <div
      className="bg-surface rounded-card border border-border p-5 notranslate"
      translate="no"
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-display font-bold text-lg text-ink">Stay Updated</h2>
        <Mail size={18} className="text-brand" />
      </div>
      <p className="text-sm text-body mb-4">
        लेटेस्ट खबरों के लिए हमारा न्यूज़लेटर सब्सक्राइब करें।
      </p>
      {submitted ? (
        <p className="text-sm font-semibold text-emerald-600">सब्सक्राइब हो गया, धन्यवाद!</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 h-10 rounded-card border border-border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand"
          />
          <button
            type="submit"
            className="bg-brand text-white text-sm font-display font-semibold px-4 rounded-card hover:bg-brand-dark transition-colors"
          >
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
}
