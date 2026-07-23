import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for AI Blueprint — the AI news and pipeline builder platform.",
};

const EFFECTIVE_DATE = "July 3, 2026";
const CONTACT_EMAIL = "hello@aiblueprint.app";

export default function TermsPage() {
  return (
    <div className="pt-[104px] min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-bold text-brand-500 uppercase tracking-widest mb-3">
            Legal
          </p>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-400 text-sm">
            Effective date: {EFFECTIVE_DATE}
          </p>
        </div>

        {/* Intro */}
        <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed space-y-10">

          <Section title="1. Agreement to Terms">
            <p>
              By accessing or using AI Blueprint (the &ldquo;Service&rdquo;), you agree to be
              bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree, please
              do not use the Service. These Terms apply to all visitors, users, and
              others who access the Service.
            </p>
            <p>
              AI Blueprint is operated by AI Blueprint (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
              &ldquo;our&rdquo;). We reserve the right to update these Terms at any time. Continued
              use of the Service after changes constitutes acceptance of the revised Terms.
            </p>
          </Section>

          <Section title="2. Description of Service">
            <p>
              AI Blueprint provides:
            </p>
            <ul>
              <li>
                <strong>AI News Feed</strong> — a curated aggregation of publicly available
                news articles about artificial intelligence, sourced via RSS feeds from
                third-party publishers.
              </li>
              <li>
                <strong>AI Pipeline Builder</strong> — an interactive tool that generates
                recommended AI tool stacks based on descriptions you provide.
              </li>
              <li>
                <strong>AI Tools Directory</strong> — a reference directory of AI products
                and models.
              </li>
            </ul>
            <p>
              The Service is currently provided free of charge to registered users. We
              reserve the right to introduce paid features in the future, which will
              be governed by separate pricing terms displayed at the time of purchase.
            </p>
          </Section>

          <Section title="3. Accounts and Registration">
            <p>
              To access certain features — including generating and saving blueprints —
              you must create an account. You agree to:
            </p>
            <ul>
              <li>Provide accurate and complete registration information.</li>
              <li>Keep your password confidential and not share account credentials.</li>
              <li>
                Notify us immediately at{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-500 hover:underline">
                  {CONTACT_EMAIL}
                </a>{" "}
                if you suspect unauthorised access to your account.
              </li>
              <li>
                Be responsible for all activity that occurs under your account.
              </li>
            </ul>
            <p>
              You must be at least 13 years old to use the Service. If you are under
              18, you represent that a parent or legal guardian has reviewed and agreed
              to these Terms on your behalf.
            </p>
          </Section>

          <Section title="4. Acceptable Use">
            <p>
              You agree not to use the Service to:
            </p>
            <ul>
              <li>
                Violate any applicable law or regulation.
              </li>
              <li>
                Scrape, crawl, or systematically download content from the Service
                without our prior written consent.
              </li>
              <li>
                Attempt to gain unauthorised access to any part of the Service, its
                servers, or connected systems.
              </li>
              <li>
                Interfere with or disrupt the integrity or performance of the Service.
              </li>
              <li>
                Impersonate any person or entity, or falsely claim an affiliation with
                a person or entity.
              </li>
              <li>
                Transmit any unsolicited commercial messages or spam.
              </li>
              <li>
                Use the Service for any purpose that is harmful, fraudulent, or
                misleading.
              </li>
            </ul>
          </Section>

          <Section title="5. Intellectual Property">
            <p>
              The AI Blueprint name, logo, website design, and original content
              (including the pipeline builder interface and tool directory) are owned
              by or licensed to AI Blueprint and are protected by copyright, trademark,
              and other intellectual property laws.
            </p>
            <p>
              <strong>News content:</strong> Articles displayed in the news feed are
              sourced from third-party publishers via public RSS feeds. We do not claim
              ownership of that content. All rights remain with the original publishers.
              Links to original articles are provided for reference.
            </p>
            <p>
              <strong>Your content:</strong> When you submit a description to the
              pipeline builder, you retain ownership of that input. You grant us a
              limited, non-exclusive licence to process it solely to provide the Service.
              We do not sell or share your inputs with third parties.
            </p>
          </Section>

          <Section title="6. Third-Party Services">
            <p>
              The Service integrates with the following third-party services, each
              governed by their own terms and privacy policies:
            </p>
            <ul>
              <li>
                <strong>Unsplash</strong> — article images may be sourced from Unsplash.
                Use is subject to the{" "}
                <a
                  href="https://unsplash.com/license"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-500 hover:underline"
                >
                  Unsplash License
                </a>
                .
              </li>
              <li>
                <strong>RSS Publishers</strong> — news content is aggregated from
                public RSS feeds. Each article remains the property of its original
                publisher.
              </li>
              <li>
                <strong>Stripe</strong> — if paid features are enabled, payment
                processing is handled by Stripe, Inc. We do not store your payment
                card details.
              </li>
            </ul>
            <p>
              We are not responsible for the content, accuracy, or practices of
              third-party services.
            </p>
          </Section>

          <Section title="7. Disclaimers">
            <p>
              The Service is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis,
              without warranties of any kind, either express or implied, including but
              not limited to warranties of merchantability, fitness for a particular
              purpose, or non-infringement.
            </p>
            <p>
              <strong>AI-generated content:</strong> Pipeline recommendations produced
              by the builder are for informational purposes only. They are not
              professional advice. You should independently evaluate any tool or
              approach before adopting it in a production environment.
            </p>
            <p>
              <strong>News content:</strong> We aggregate content from third-party
              sources and do not verify or endorse the accuracy of any article. Always
              refer to the original source for authoritative information.
            </p>
          </Section>

          <Section title="8. Limitation of Liability">
            <p>
              To the fullest extent permitted by applicable law, AI Blueprint and its
              officers, directors, employees, and agents shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages —
              including loss of profits, data, goodwill, or other intangible losses —
              arising out of or in connection with your use of or inability to use the
              Service.
            </p>
            <p>
              Our total aggregate liability for any claim arising from or related to
              the Service shall not exceed the greater of (a) the amount you paid us
              in the 12 months preceding the claim or (b) USD $50.
            </p>
          </Section>

          <Section title="9. Termination">
            <p>
              We may suspend or terminate your access to the Service at any time, with
              or without notice, if we believe you have violated these Terms or if we
              discontinue the Service.
            </p>
            <p>
              You may close your account at any time by contacting us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-500 hover:underline">
                {CONTACT_EMAIL}
              </a>
              . Sections 5, 7, 8, and 10 survive termination.
            </p>
          </Section>

          <Section title="10. Governing Law">
            <p>
              These Terms are governed by and construed in accordance with the laws of
              the State of Delaware, United States, without regard to its conflict-of-law
              provisions. Any dispute arising from these Terms or the Service shall be
              resolved in the state or federal courts located in Delaware, and you
              consent to personal jurisdiction in those courts.
            </p>
          </Section>

          <Section title="11. Changes to These Terms">
            <p>
              We may update these Terms from time to time. When we do, we will revise
              the effective date at the top of this page. For material changes, we will
              make reasonable efforts to notify registered users (for example, by email
              or an in-app notice). Your continued use of the Service after the revised
              Terms take effect constitutes acceptance of those changes.
            </p>
          </Section>

          <Section title="12. Contact Us">
            <p>
              If you have questions about these Terms, please contact us at:
            </p>
            <div className="mt-3 p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm">
              <p className="font-semibold text-gray-900">AI Blueprint</p>
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
            <Link href="/privacy" className="text-brand-500 hover:underline">
              Privacy Policy
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
      <div className="space-y-3 text-gray-600 leading-relaxed">{children}</div>
    </section>
  );
}
