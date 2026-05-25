import Link from "next/link"

import SocialLinks from "@/components/social-links"

const sitemapLinks = [
  { name: "Home", href: "/waitlist" },
  { name: "About", href: "/about?from=waitlist" },
  { name: "Contact", href: "/contact-us?from=waitlist" },
  { name: "Privacy Policy", href: "/privacy?from=waitlist" },
  { name: "Terms & Conditions", href: "/coming-soon?from=waitlist" },
]

const WaitlistFooter = () => {
  return (
    <div className="bg-black text-white">
      <div className="container flex flex-col gap-5 py-8">
        <section className="flex flex-col items-center gap-5">
          <ul className="flex flex-col items-center gap-8 sm:flex-row">
            {sitemapLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex justify-center">
          <SocialLinks />
        </section>

        <hr className="border-t-gray-700" />

        <footer>
          <p className="text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} School Base. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  )
}

export default WaitlistFooter
