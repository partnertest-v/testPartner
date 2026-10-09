import React from 'react';
import { ShieldCheck, Lock, ExternalLink } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  const contactEmail = (import.meta as any).env?.VITE_CONTACT_EMAIL || 'hello@fluffyhearts.app';
  const siteUrl = (import.meta as any).env?.VITE_SITE_URL || 'https://fluffyhearts.app';

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 md:py-12">
      <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 shadow-lg shadow-rose-100/50 border border-rose-100 text-slate-700 leading-relaxed space-y-6">
        <div className="border-b border-rose-100 pb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-xs font-semibold mb-3 border border-rose-100">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Transparency &amp; Data Rights</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-400 mt-2">
            Last Updated: October 2026 · Effective Immediately
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 font-display">1. Introduction</h2>
          <p className="text-sm">
            Welcome to <strong>FluffyHearts</strong> ({siteUrl}). Your privacy and confidence are paramount to us. This Privacy Policy clarifies how information is gathered, utilized, and safeguarded when you visit our website, take our interactive quizzes, play romantic mini-games, and view advertisements.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 font-display">2. Information We Collect</h2>
          <div className="text-sm space-y-2">
            <p>
              <strong>Directly Provided Information:</strong> When you utilize our contact form, we collect your name, email address, topic, and message content solely to reply to your inquiry.
            </p>
            <p>
              <strong>Interactive Session Data:</strong> Your quiz selections, high scores, attempt counters, and virtual hugs are processed locally in your web browser (client-side) and via standard browser <code>localStorage</code>. We do not store your personal quiz answers on remote private databases.
            </p>
            <p>
              <strong>Log Files &amp; Technical Diagnostics:</strong> Like most web servers, standard non-personally identifiable diagnostic entries (such as browser type, operating system, timestamp, and referring URL) may be generated for reliability and DDoS defense.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 font-display">
            3. Google AdSense &amp; Advertising Cookies
          </h2>
          <div className="text-sm space-y-2">
            <p>
              We partner with third-party advertising vendors, including <strong>Google AdSense</strong>, to serve advertisements when you visit our website.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li>
                <strong>Third-Party Vendors:</strong> Third party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.
              </li>
              <li>
                <strong>Personalized Advertising:</strong> Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to this site and/or other sites on the Internet.
              </li>
              <li>
                <strong>Opt-Out of Personalized Ads:</strong> Users may opt out of personalized advertising by visiting{' '}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rose-600 font-medium inline-flex items-center gap-1 hover:underline"
                >
                  <span>Google Ads Settings</span>
                  <ExternalLink className="w-3 h-3" />
                </a>{' '}
                or by visiting{' '}
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rose-600 font-medium inline-flex items-center gap-1 hover:underline"
                >
                  <span>aboutads.info</span>
                  <ExternalLink className="w-3 h-3" />
                </a>.
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 font-display">
            4. Cookies &amp; Tracking Technologies
          </h2>
          <p className="text-sm">
            Cookies are small text strings stored on your device. We utilize essential cookies and <code>localStorage</code> to remember your sound preference, high scores, and cookie banner consent choice. Third-party advertising partners utilize cookies to deliver tailored advertisements and prevent showing the same ad repeatedly.
          </p>
          <p className="text-sm">
            You can configure your browser to reject cookies or notify you whenever a cookie is placed. Note that rejecting cookies may affect your browsing experience.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 font-display">
            5. User Rights Under GDPR &amp; CCPA
          </h2>
          <div className="text-sm space-y-2">
            <p>
              <strong>European Union (GDPR):</strong> If you reside within the European Economic Area (EEA), you possess the right to access, rectify, or request deletion of any personal data we hold about you. You may also object to or restrict certain data processing activities.
            </p>
            <p>
              <strong>California Residents (CCPA/CPRA):</strong> California consumers have the right to request information regarding categories of personal information collected, request deletion, and opt out of the sale or sharing of personal information. FluffyHearts does not sell personal identifying information.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 font-display">6. Children's Privacy</h2>
          <p className="text-sm">
            FluffyHearts provides general-audience wholesome entertainment. We do not knowingly solicit or collect personal identifiable information from children under the age of 13. If you believe a child has provided us with personal information, please contact us immediately to have it deleted.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 font-display">7. Policy Changes &amp; Contact</h2>
          <p className="text-sm">
            We reserve the right to revise this policy to reflect regulatory changes or service enhancements. Material modifications will be posted here with an updated revision date.
          </p>
          <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-100 text-xs text-slate-700">
            <strong>Contact Officer for Privacy Inquiries:</strong>
            <br />
            Email:{' '}
            <a href={`mailto:${contactEmail}`} className="text-rose-600 font-semibold hover:underline">
              {contactEmail}
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};
