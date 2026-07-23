import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for AI Blueprint — how we collect, use, and protect your data.",
};

const EFFECTIVE_DATE = "July 3, 2026";
const CONTACT_EMAIL = "hello@aiblueprint.app";

export default function PrivacyPage() {
  return (
    <div className="pt-[104px] min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-bold text-brand-500 uppercase tracking-widest mb-3">
            Legal
          </p>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-400 text-sm">
            Effective date: {EFFECTIVE_DATE}
          </p>
        </div>

        <div className="space-y-10 text-gray-600 leading-relaxed">

          <Section title="1. Introduction">
            <p>
              AI Blueprint (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to
              protecting your privacy. This Privacy Policy explains what information we
              collect when you use aiblueprint.app (the &ldquo;Service&rdquo;), how we use it,
              and the choices you have.
            </p>
            <p>
              By using the Service, you agree to the collection and use of information
              in accordance with this policy.
            </p>
          </Section>

          <Section title="2. Information We Collect">
            <h3 className="font-semibold text-gray-800 mt-4 mb-2">
              2a. Information you provide directly
            </h3>
            <ul>
              <li>
                <strong>Account registration</strong> — when you sign up, we collect
                your email address and a hashed password (we never store your password
                in plain text). If you use Google OAuth to sign in, we receive your
                name and email address from Google.
              </li>
              <li>
                <strong>Builder inputs</strong> — the text descriptions you submit to
                the AI Pipeline Builder to generate recommendations.
              </li>
            </ul>

            <h3 className="font-semibold text-gray-800 mt-4 mb-2">
              2b. Information collected automatically
            </h3>
            <ul>
              <li>
                <strong>Usage data</strong> — pages visited, features used, and
                interactions with the Service (for example, which blueprint was
                generated or which news articles were viewed). This is collected in
                aggregate and not linked to your identity unless you are logged in.
              </li>
              <li>
                <strong>Log data</strong> — our servers automatically record
                information such as your IP address, browser type, operating system,
                referring URL, and timestamps when you access the Service.
              </li>
              <li>
                <strong>Cookies and local storage</strong> — we use session cookies
                to keep you logged in and browser local storage to remember your
                builder session state (message history, blueprint preferences). We do
                not currently use third-party advertising cookies.
              </li>
            </ul>

            <h3 className="font-semibold text-gray-800 mt-4 mb-2">
              2c. Payment information
            </h3>
            <p>
              If paid features are enabled, payments are processed by{" "}
              <a
                href="https://stripe.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-500 hover:underline"
              >
                Stripe, Inc.
              </a>{" "}
              We receive only limited confirmation data (e.g., subscription status,
              last four digits of card). We never store full card numbers or CVV codes.
            </p>
          </Section>

          <Section title="3. How We Use Your Information">
            <p>We use the information we collect to:</p>
            <ul>
              <li>Create and manage your account and authenticate your identity.</li>
              <li>
                Provide and improve the Service, including generating pipeline
                recommendations and curating the news feed.
              </li>
              <li>
                Save your blueprints and make them available in your dashboard.
              </li>
              <li>
                Send transactional emails (e.g., account verification, password
                reset). We do not send marketing emails without your explicit
                consent.
              </li>
              <li>
                Detect and prevent fraudulent or abusive activity.
              </li>
              <li>
                Analyse aggregate usage trends to improve the Service.
              </li>
              <li>
                Comply with legal obligations.
              </li>
            </ul>
            <p>
              We do not sell your personal data to third parties, and we do not use
              your builder inputs to train AI models or share them with AI providers.
            </p>
          </Section>

          <Section title="4. Third-Party Services We Use">
            <p>
              The Service relies on the following third parties, each with their own
              privacy practices:
            </p>
            <ul>
              <li>
                <strong>Neon / PostgreSQL</strong> — our database provider stores your
                account information and saved blueprints securely.
              </li>
              <li>
                <strong>Vercel</strong> — our hosting provider. Vercel may log request
                metadata as part of normal infrastructure operations.
              </li>
              <li>
                <strong>NextAuth.js</strong> — manages authentication sessions using
                secure, HTTP-only cookies.
              </li>
              <li>
                <strong>Google OAuth</strong> — if you choose &ldquo;Sign in with Google,&rdquo;
                Google shares your name and email with us. Google&apos;s use of data is
                governed by the{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-500 hover:underline"
                >
                  Google Privacy Policy
                </a>
                .
              </li>
              <li>
                <strong>Unsplash</strong> — article thumbnail images may be fetched
                from Unsplash&apos;s API using your server&apos;s IP address. Your personal
                data is not sent to Unsplash.
              </li>
              <li>
                <strong>RSS Feed Publishers</strong> — news content is fetched
                server-side from public RSS endpoints. No personal data is shared with
                publishers.
              </li>
              <li>
                <strong>Stripe</strong> — payment processing when paid features are
                active. Governed by the{" "}
                <a
                  href="https://stripe.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-500 hover:underline"
                >
                  Stripe Privacy Policy
                </a>
                .
              </li>
            </ul>
          </Section>

          <Section title="5. Cookies and Tracking">
            <p>We use the following types of cookies and storage:</p>
            <ul>
              <li>
                <strong>Session cookies</strong> — required to keep you signed in.
                These expire when you close your browser or after a fixed period of
                inactivity.
              </li>
              <li>
                <strong>Browser local storage</strong> — used to cache your builder
                message history on your own device. This data never leaves your
                browser unless you explicitly save a blueprint to your account.
              </li>
            </ul>
            <p>
              We do not currently use analytics platforms (such as Google Analytics)
              or advertising networks that track you across other websites.
            </p>
          </Section>

          <Section title="6. Data Retention">
            <p>
              We retain your account information and saved blueprints for as long as
              your account is active. If you delete your account, we will delete or
              anonymise your personal data within 30 days, except where retention is
              required by law (for example, payment records may be kept for up to
              7 years for tax compliance).
            </p>
            <p>
              Server log files are typically retained for 90 days before being deleted
              or anonymised.
            </p>
          </Section>

          <Section title="7. Your Rights">
            <p>
              Depending on your location, you may have the following rights regarding
              your personal data:
            </p>
            <ul>
              <li>
                <strong>Access</strong> — request a copy of the personal data we hold
                about you.
              </li>
              <li>
                <strong>Correction</strong> — ask us to correct inaccurate or
                incomplete data.
              </li>
              <li>
                <strong>Deletion</strong> — request that we delete your account and
                associated data.
              </li>
              <li>
                <strong>Portability</strong> — request your data in a structured,
                machine-readable format.
              </li>
              <li>
                <strong>Objection / restriction</strong> — object to or request
                restriction of certain processing activities.
              </li>
            </ul>
            <p>
              To exercise any of these rights, email us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-500 hover:underline">
                {CONTACT_EMAIL}
              </a>
              . We will respond within 30 days.
            </p>
          </Section>

          <Section title="8. Data Security">
            <p>
              We implement industry-standard security measures including:
            </p>
            <ul>
              <li>TLS/HTTPS encryption for all data in transit.</li>
              <li>Bcrypt hashing for passwords stored in our database.</li>
              <li>HTTP-only, Secure, SameSite session cookies.</li>
              <li>Access controls limiting who within AI Blueprint can access user data.</li>
            </ul>
            <p>
              No method of transmission over the Internet is 100% secure. We cannot
              guarantee absolute security, but we take reasonable precautions and will
              notify affected users of any material data breach as required by law.
            </p>
          </Section>

          <Section title="9. Children's Privacy">
            <p>
              The Service is not directed at children under 13. We do not knowingly
              collect personal information from children under 13. If you believe we
              have inadvertently collected such information, please contact us and we
              will delete it promptly.
            </p>
          </Section>

          <Section title="10. International Users">
            <p>
              AI Blueprint is operated in the United States. If you access the Service
              from outside the US, your information may be transferred to and processed
              in the US or other countries where our service providers operate. By
              using the Service, you consent to this transfer.
            </p>
            <p>
              If you are located in the European Economic Area (EEA), United Kingdom,
              or Switzerland, our legal basis for processing your personal data is
              typically performance of a contract (to provide the Service you signed up
              for) or our legitimate interests in operating and improving the Service.
              Where required, we will seek your explicit consent.
            </p>
          </Section>

          <Section title="11. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. When we do, we will
              revise the effective date at the top of this page. For material changes,
              we will notify registered users by email or by an in-app notice. Your
              continued use of the Service after the updated policy takes effect
              constitutes your acceptance of the changes.
            </p>
          </Section>

          <Section title="12. Contact Us">
            <p>
              If you have questions, concerns, or requests relating to this Privacy
              Policy, please contact us at:
            </p>
            <div className="mt-3 p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm">
              <p className="font-semibold text-gray-900">AI Blueprint — Privacy Team</p>
              <p className="text-gray-500 mt-1">
                Email:{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-500 hover:underline">
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>
          </Section>

          {/* Cross-link */}
          <div className="pt-6 border-t border-gray-100 text-sm text-gray-400">
            See also our{" "}
            <Link href="/terms" className="text-brand-500 hover:underline">
              Terms of Service
            </Link>
            .
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-lg font-bold text-gray-900 mb-3">{title}</h2>
      <div className="space-y-3 text-gray-600 leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5">
        {children}
      </div>
    </section>
  );
}
