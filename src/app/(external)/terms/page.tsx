import React from "react"

interface TermSection {
  id: string
  title: string
  content: React.ReactNode
}

const termsData: TermSection[] = [
  {
    id: "1",
    title: "1. Acceptance of Terms",
    content: (
      <p>
        By accessing or using SchoolBase, you confirm that you have read, understood, and
        agreed to these Terms & Conditions. If you do not agree, you must discontinue use
        immediately.
      </p>
    ),
  },
  {
    id: "2",
    title: "2. Definitions",
    content: (
      <ul className="flex flex-col gap-3">
        <li>
          <strong className="text-[#2d2d2d]">“SchoolBase”</strong> - The SchoolBase
          digital school management platform.
        </li>
        <li>
          <strong className="text-[#2d2d2d]">“School”</strong> - The institution using
          SchoolBase.
        </li>
        <li>
          <strong className="text-[#2d2d2d]">“Users”</strong> - Admins, Teachers,
          Students, and Parents authorized by the school.
        </li>
      </ul>
    ),
  },
  {
    id: "3",
    title: "3. User Accounts",
    content: (
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="font-semibold text-[#2d2d2d]">3.1 Account Creation</h3>
          <p>
            User accounts are created and managed by the school&apos;s designated
            administrators.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-[#2d2d2d]">3.2 Accurate Information</h3>
          <p>
            Users must provide accurate details. The school is responsible for maintaining
            correct user data.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-[#2d2d2d]">3.3 Security</h3>
          <p>
            Users are responsible for keeping their login credentials secure. SchoolBase
            is not liable for unauthorized access resulting from weak or shared passwords.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "4",
    title: "4. Platform Usage",
    content: (
      <div className="flex flex-col gap-3">
        <p>
          Users agree to use SchoolBase only for legitimate school-related activities.
          Users must <strong className="text-[#2d2d2d]">NOT</strong>:
        </p>
        <ul className="list-inside list-disc space-y-1 pl-2">
          <li>Disrupt or harm system operations</li>
          <li>Upload malicious files</li>
          <li>Attempt to access features or data outside their role</li>
          <li>Tamper with attendance, grades, or academic records</li>
        </ul>
        <p className="italic">Misuse may lead to restricted access.</p>
      </div>
    ),
  },
  {
    id: "5",
    title: "5. Academic & Administrative Data",
    content: (
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="font-semibold text-[#2d2d2d]">5.1 Data Ownership</h3>
          <p>
            All academic, administrative, and student data belongs solely to the{" "}
            <strong className="text-[#2d2d2d]">school</strong>.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-[#2d2d2d]">5.2 Data Usage</h3>
          <p>
            SchoolBase only processes data for the purpose of enabling the platform&apos;s
            features (attendance, grades, timetables, communication, etc.).
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-[#2d2d2d]">5.3 Data Protection</h3>
          <p>
            The platform uses encrypted connections, secure login, and activity logs to
            help protect school data.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "6",
    title: "6. Attendance & Records (Including NFC)",
    content: (
      <div className="flex flex-col gap-2">
        <p>If the school uses NFC or digital attendance:</p>
        <ul className="list-inside list-disc space-y-1 pl-2">
          <li>Teacher tap-ins are recorded automatically</li>
          <li>Offline attendance syncs when the device reconnects</li>
          <li>Admins may correct entries with a required reason</li>
          <li>All edits are logged for transparency</li>
        </ul>
      </div>
    ),
  },
  {
    id: "7",
    title: "7. Grades & Report Cards",
    content: (
      <div className="flex flex-col gap-2">
        <p>
          Teachers enter grades digitally. Admins may review and approve results before
          they are published. Report cards are generated within the system and made
          available to authorized users.
        </p>
        <p className="mt-2 font-medium text-[#2d2d2d]">
          Users must not manipulate academic records outside approved workflows.
        </p>
      </div>
    ),
  },
  {
    id: "8",
    title: "8. Communication & Notices",
    content: (
      <p>
        SchoolBase allows the school to send announcements to users. It is the
        school&apos;s responsibility to ensure user contact details (email/phone, where
        used) are correct. SchoolBase is not responsible for undelivered messages caused
        by incorrect school-provided information or external service issues.
      </p>
    ),
  },
  {
    id: "9",
    title: "9. System Availability",
    content: (
      <div className="flex flex-col gap-2">
        <p>
          SchoolBase aims to provide reliable access; however, availability may be
          affected by:
        </p>
        <ul className="list-inside list-disc space-y-1 pl-2">
          <li>Maintenance</li>
          <li>Technical faults</li>
          <li>
            Network or connectivity issues controlled by the school or the user&apos;s
            device
          </li>
        </ul>
        <p>The platform will make reasonable efforts to restore access promptly.</p>
      </div>
    ),
  },
  {
    id: "10",
    title: "10. Intellectual Property",
    content: (
      <p>
        All software, designs, content, and features of SchoolBase are the property of the
        platform provider. Users may not copy, resell, distribute, or reverse-engineer any
        part of the system.
      </p>
    ),
  },
  {
    id: "11",
    title: "11. Suspension or Termination of Use",
    content: (
      <div className="flex flex-col gap-2">
        <p>SchoolBase may suspend access if:</p>
        <ul className="list-inside list-disc space-y-1 pl-2">
          <li>The school breaches these terms</li>
          <li>Unauthorized system tampering occurs</li>
          <li>Use threatens platform security or performance</li>
        </ul>
        <p>
          The school may discontinue use of SchoolBase at any time with appropriate
          notice.
        </p>
      </div>
    ),
  },
  {
    id: "12",
    title: "12. Limitation of Liability",
    content: (
      <div className="flex flex-col gap-2">
        <p>SchoolBase is provided “as-is.” The platform is not responsible for:</p>
        <ul className="list-inside list-disc space-y-1 pl-2">
          <li>Errors caused by incorrect data entered by the school</li>
          <li>Unauthorized access due to weak passwords</li>
          <li>External network failures</li>
          <li>School decisions made based on data within the system</li>
        </ul>
        <p>Use of the system is at the school&apos;s discretion.</p>
      </div>
    ),
  },
  {
    id: "13",
    title: "13. Changes to Terms",
    content: (
      <p>
        We may update these Terms & Conditions. The revised version will be effective once
        posted or communicated to the school. Continued use of SchoolBase indicates
        acceptance of the updated terms.
      </p>
    ),
  },
  {
    id: "14",
    title: "14. Contact",
    content: (
      <p>
        For support or concerns regarding SchoolBase, please contact your designated
        platform representative or support channel.
      </p>
    ),
  },
]

const TermsAndConditions = () => {
  return (
    <div className="container flex flex-col gap-6 bg-white py-8 md:gap-8 md:py-12">
      <div className="mx-auto flex max-w-220 flex-col gap-4 text-center">
        <h1 className="text-2xl font-semibold text-[#2d2d2d] md:text-3xl">
          SchoolBase - Terms & Conditions
        </h1>
        <p className="text-sm font-medium text-[#535353] sm:text-xl md:text-2xl">
          Last Updated: November 2025
        </p>
        <p className="mx-auto max-w-3xl text-sm text-[#535353]/80 md:text-lg">
          Welcome to SchoolBase, a digital school management system. By using SchoolBase,
          you agree to the following Terms & Conditions.
        </p>
      </div>
      <section className="mx-auto flex w-full max-w-4xl flex-col gap-4 md:pt-10">
        {termsData.map((term) => (
          <div
            key={term.id}
            className="flex flex-col gap-3 rounded-md border border-[#2D2D2D]/15 bg-white p-5 md:p-8"
          >
            <h2
              className="font-medium text-[#2d2d2d]"
              style={{ fontSize: "clamp(18px, 4vw, 24px)" }}
            >
              {term.title}
            </h2>
            <div
              className="leading-relaxed text-[#535353]"
              style={{ fontSize: "clamp(14px, 2vw, 18px)" }}
            >
              {term.content}
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

export default TermsAndConditions
