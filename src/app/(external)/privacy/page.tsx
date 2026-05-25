import Link from "next/link"
import React from "react"

const PrivacyPolicy = () => {
  return (
    <div className="relative mx-auto flex max-w-7xl px-3 pt-6 md:pt-16 lg:px-5">
      {/* --- MAIN PRIVACY POLICY CONTENT --- */}
      <article className="prose mx-auto mb-20 max-w-5xl flex-1">
        <header className="mb-4" id="top">
          <h1 className="text-primary mb-1 text-center text-2xl font-bold lg:text-4xl">
            Privacy Policy
          </h1>
          <p className="text-text-secondary text-sm">Last Updated: 11/22/2025</p>
        </header>

        <section className="space-y-3" id="section-1">
          <p>
            This Privacy Policy explains how School Base ( “we”, “our”, “us”) collects,
            uses, and protects information when you visit our public global landing page.
          </p>
          <p>
            This policy applies only to the School Base global website, where visitors
            learn about the product, download installers, or access documentation.
          </p>
          <p className="font-semibold">
            It does not apply to self-hosted school instances using School Base, as each
            school is responsible for its own data policies.
          </p>
        </section>

        <section className="mt-6 space-y-5" id="section-2">
          <h2 className="text-primary mb-2 text-xl font-bold">
            1. Information We Collect
          </h2>

          {/* 1.1 */}
          <div id="section-2-1">
            <h3 className="text-primary mb-2 ml-5 text-lg font-semibold">
              1.1 Information You Provide Voluntarily
            </h3>
            <p className="text-text-secondary ml-5 font-medium">
              When interacting with our landing page, you may provide:
            </p>
            <ul className="ml-14 list-disc">
              <li>Contact information (e.g., your name, email) when submitting forms.</li>
              <li>Feedback or inquiries sent through our support or contact sections.</li>
              <li>This information is only collected when you choose to provide it.</li>
            </ul>
          </div>

          {/* 1.2 */}
          <div id="section-2-2">
            <h3 className="text-primary mb-2 ml-5 text-lg font-semibold">
              1.2 Automatically Collected Information
            </h3>
            <p className="text-text-secondary ml-5 font-medium">
              When you visit the SchoolBase landing page, we may automatically collect:
            </p>
            <ul className="ml-14 list-disc">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Device type</li>
              <li>Pages visited and time spent</li>
              <li>Referring websites</li>
              <li>Basic analytics for performance and security</li>
            </ul>
            <p className="text-text-secondary mt-3 font-medium">
              This data is strictly aggregated and used only to understand website
              performance and improve user experience.
            </p>
          </div>

          {/* 1.3 */}
          <div id="section-2-3">
            <h3 className="text-primary mb-2 ml-5 text-lg font-semibold">
              1.3 Cookies &amp; Tracking Technologies
            </h3>
            <p className="text-text-secondary ml-5 font-medium">
              We may use minimal cookies for:
            </p>
            <ul className="ml-14 list-disc">
              <li>Session management</li>
              <li>Basic website analytics</li>
              <li>Improving site loading performance</li>
            </ul>
            <p className="text-text-secondary mt-3 font-medium">
              No advertising or behavioral tracking cookies are used.
            </p>
          </div>
        </section>

        {/* number 2 */}
        <section className="mt-6 space-y-5" id="section-3">
          <h2 className="text-primary mb-2 text-xl font-bold">
            2. How We Use Your Information
          </h2>
          <p className="text-text-secondary ml-5 font-medium">
            We use the information collected on the SchoolBase landing page to:
          </p>
          <ul className="ml-14 list-disc">
            <li>Provide product downloads</li>
            <li>Display documentation and support content</li>
            <li>Improve website experience and performance</li>
            <li>Respond to inquiries or support requests</li>
            <li>Prevent abuse, spam, and security threats</li>
          </ul>
          <p className="text-text-secondary mt-3 font-medium">
            We do not sell or share visitor data with third parties for marketing or
            advertising.
          </p>
        </section>

        {/* number 3 */}
        <section className="mt-6 space-y-5" id="section-4">
          <h2 className="text-primary mb-2 text-xl font-bold">
            3. How We Protect Your Data
          </h2>
          <p>We take data protection seriously and implement:</p>
          <ul className="ml-14 list-disc">
            <li>HTTPS encryption</li>
            <li>Secure form submissions</li>
            <li>Firewall and anti-bot protection</li>
            <li>Regular site monitoring and logging</li>
          </ul>
          <p className="text-text-secondary mt-3 font-medium">
            The OSP landing page does not store sensitive personal data, login
            credentials, or school data.
          </p>
        </section>

        {/* number 4 */}
        <section className="mt-6 space-y-2" id="section-5">
          <h2 className="text-primary mb-2 text-xl font-bold">
            4. Self-Hosted Schools &amp; Third-Party Responsibility
          </h2>
          <p className="text-text-secondary ml-5 font-medium">
            SchoolBase is an open-source, self-hosted platform.
          </p>
          <p className="text-text-secondary ml-5 font-medium">
            Schools that install SchoolBase run their own independent instances.
          </p>
          <p className="ml-5 font-medium">This means:</p>
          <ul className="ml-14 list-disc">
            <li>Each school hosts and controls its own database</li>
            <li>Each school is responsible for its own user data</li>
            <li>
              OSP global landing page never has access to student, teacher, or parent
              information
            </li>
            <li>
              Schools must implement their own privacy policies, terms, and data
              governance.
            </li>
          </ul>
        </section>

        {/* number 5 */}
        <section className="mt-6 space-y-2" id="section-6">
          <h2 className="text-primary mb-2 text-xl font-bold">5. Policy Update</h2>
          <p className="text-text-secondary ml-5 font-medium">
            We may update this Privacy Policy periodically.
          </p>
          <ul className="ml-14 list-disc">
            <li>The “Last Updated” date at the top will reflect changes.</li>
            <li>
              Continued use of the landing page constitutes acceptance of updated terms.
            </li>
          </ul>
        </section>

        {/* number 6 */}
        <section className="mt-6 space-y-2" id="section-7">
          <h2 className="text-primary mb-2 text-xl font-bold">6. Contact Us</h2>
          <p className="text-text-secondary ml-5 font-medium">
            For questions regarding this policy, please contact:
          </p>
          <p className="text-text-secondary ml-5 font-medium">
            SchoolBase – Privacy Team
            <span className="block">
              Email:
              <Link
                href="mailto:openschoolportalhq@gmail.com"
                className="pl-1.5 hover:underline"
              >
                openschoolportalhq@gmail.com
              </Link>
            </span>
          </p>
        </section>
      </article>

      {/* --- TABLE OF CONTENTS (RIGHT SIDE, DESKTOP ONLY) --- */}
      <aside className="sticky top-28 mb-4 hidden h-fit w-64 shrink-0 rounded-xl border py-4 pl-8 md:block">
        <nav className="space-y-3 text-sm">
          <h3 className="text-primary font-bold">On this page</h3>

          <ul className="text-text-secondary space-y-2">
            <li>
              <a href="#section-1" className="hover:text-primary">
                Introduction
              </a>
            </li>
            <li>
              <a href="#section-2" className="hover:text-primary">
                1. Information We Collect
              </a>
            </li>
            <li className="ml-4">
              <a href="#section-2-1" className="hover:text-primary">
                1.1 Voluntary Info
              </a>
            </li>
            <li className="ml-4">
              <a href="#section-2-2" className="hover:text-primary">
                1.2 Automatic Data
              </a>
            </li>
            <li className="ml-4">
              <a href="#section-2-3" className="hover:text-primary">
                1.3 Cookies
              </a>
            </li>

            <li>
              <a href="#section-3" className="hover:text-primary">
                2. How We Use Info
              </a>
            </li>
            <li>
              <a href="#section-4" className="hover:text-primary">
                3. Data Protection
              </a>
            </li>
            <li>
              <a href="#section-5" className="hover:text-primary">
                4. Self-Hosted Responsibility
              </a>
            </li>
            <li>
              <a href="#section-6" className="hover:text-primary">
                5. Policy Updates
              </a>
            </li>
            <li>
              <a href="#section-7" className="hover:text-primary">
                6. Contact Us
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  )
}

export default PrivacyPolicy
