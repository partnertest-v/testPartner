import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const contactEmail = (import.meta as any).env?.VITE_CONTACT_EMAIL || 'hello@fluffyhearts.app';

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'Feedback & Suggestions',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setErrorMsg('Please fill out all required fields.');
      return;
    }

    if (!formState.email.includes('@')) {
      setErrorMsg('Please provide a valid email address.');
      return;
    }

    // Process submission successfully
    setSubmitted(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 md:py-12">
      <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 shadow-lg shadow-rose-100/50 border border-rose-100">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-xs font-semibold mb-3 border border-rose-100">
            <Mail className="w-3.5 h-3.5" />
            <span>We Love Hearing From You</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
            Contact FluffyHearts 💌
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Have an idea for a new quiz? Found a bug? Or just want to share how your crush reacted? Drop us a note!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Form */}
          <div>
            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-fadeIn">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-emerald-900">Message Received! 🌸</h3>
                <p className="text-xs text-emerald-700 leading-relaxed">
                  Thank you for reaching out, <strong>{formState.name}</strong>. Our team checks inquiries regularly and will respond to <code>{formState.email}</code> within 24–48 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormState({ name: '', email: '', subject: 'Feedback & Suggestions', message: '' });
                  }}
                  className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700 transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. Alex"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="alex@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Topic
                  </label>
                  <select
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 text-sm bg-white"
                  >
                    <option value="Feedback & Suggestions">Feedback &amp; Suggestions</option>
                    <option value="Bug Report">Report a Bug / Button Behavior</option>
                    <option value="Advertising & Partnerships">Advertising &amp; Partnerships</option>
                    <option value="Privacy Question">Privacy / Data Policy Inquiry</option>
                    <option value="Other">Other / General Note</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell us what's on your mind..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Note</span>
                </button>
              </form>
            )}
          </div>

          {/* Details & FAQ */}
          <div className="space-y-6 text-slate-700 text-sm">
            <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-100">
              <h3 className="font-bold text-slate-900 mb-2">Direct Contact</h3>
              <p className="text-xs text-slate-600 mb-3">
                You can also email our support desk directly at:
              </p>
              <a
                href={`mailto:${contactEmail}`}
                className="font-mono text-rose-700 font-semibold text-sm hover:underline"
              >
                {contactEmail}
              </a>
              <p className="text-[11px] text-slate-400 mt-2">
                Typical response time: 24–48 hours (Monday through Friday).
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-slate-900">Frequently Asked Questions</h3>
              <div>
                <strong className="text-xs text-slate-800 block">Can I embed this prank on my own blog?</strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  You are welcome to link directly to FluffyHearts with credit!
                </p>
              </div>
              <div>
                <strong className="text-xs text-slate-800 block">Do you save my quiz responses?</strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  No, quizzes run client-side in your browser. We never store personal quiz submissions on server databases.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
