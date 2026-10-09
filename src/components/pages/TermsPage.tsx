import React from 'react';
import { FileText, ShieldAlert } from 'lucide-react';

export const TermsPage: React.FC = () => {
  const contactEmail = (import.meta as any).env?.VITE_CONTACT_EMAIL || 'hello@fluffyhearts.app';

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 md:py-12">
      <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 shadow-lg shadow-rose-100/50 border border-rose-100 text-slate-700 leading-relaxed space-y-6">
        <div className="border-b border-rose-100 pb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-xs font-semibold mb-3 border border-rose-100">
            <FileText className="w-3.5 h-3.5" />
            <span>Usage Rules &amp; Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
            Terms and Conditions
          </h1>
          <p className="text-xs text-slate-400 mt-2">
            Last Updated: October 2026
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 font-display">1. Acceptance of Terms</h2>
          <p className="text-sm">
            By accessing or using <strong>FluffyHearts</strong>, you confirm that you have read, understood, and agreed to be bound by these Terms and Conditions. If you do not agree with any portion of these terms, please discontinue use of the site.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 font-display">2. Nature of Interactive Services</h2>
          <p className="text-sm">
            FluffyHearts provides digital interactive entertainment, including love compatibility quizzes, cute personality evaluations, compliment generators, and humorous prank interactions (such as the escaping "No" button and joke confession envelope). All materials are strictly created for lighthearted amusement, laughter, and personal enjoyment.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 font-display">3. Acceptable Use Policy</h2>
          <div className="text-sm space-y-2">
            <p>You agree not to:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Use the site for any unlawful, harassing, defamatory, or abusive purpose.</li>
              <li>Attempt to reverse-engineer, disrupt, or overwhelm our web infrastructure or server routes.</li>
              <li>Deploy automated bots, spiders, or click-generating scripts to produce invalid impressions or clicks on advertisements.</li>
              <li>Impersonate any person or entity in contact messages.</li>
            </ul>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 font-display">4. Intellectual Property</h2>
          <p className="text-sm">
            All original illustrations, vector artwork, written quiz content, and interactive code implementations on FluffyHearts are the intellectual property of FluffyHearts and protected under copyright laws. You may share links to our interactive games on social media for personal enjoyment, but you may not duplicate, redistribute, or resell site content without prior written permission.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 font-display">5. Third-Party Links &amp; Advertisements</h2>
          <p className="text-sm">
            FluffyHearts may present links to third-party websites or display advertisements served by Google AdSense. We do not endorse or assume liability for third-party products, services, or privacy policies. Accessing external destinations is at your own discretion.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 font-display">6. Disclaimer of Warranties &amp; Limitation of Liability</h2>
          <p className="text-sm">
            FluffyHearts is provided on an "as-is" and "as-available" basis without warranties of any kind. Under no circumstances shall FluffyHearts, its creators, or affiliates be liable for any direct, indirect, incidental, or consequential damages resulting from your use or inability to use the service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 font-display">7. Inquiries</h2>
          <p className="text-sm">
            For questions regarding these Terms, contact us at:{' '}
            <a href={`mailto:${contactEmail}`} className="text-rose-600 font-semibold hover:underline">
              {contactEmail}
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
};
