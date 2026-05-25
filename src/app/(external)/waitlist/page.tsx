import HomeWhyUs from "@/app/(external)/_components/home-why-us"
import Image from "next/image"
import FAQAccordion from "./_components/waitlist-faq"
import WaitlistHero from "./_components/waitlist-hero"
import JoinWaitlistButton from "./_components/join-waitlist-button"

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      <WaitlistHero />
      <HomeWhyUs />
      <div className="w-full bg-[#F9FAFC]">
        <div className="container flex flex-col items-center gap-5 py-12 sm:flex-row">
          <div className="flex w-full flex-col items-center gap-4 rounded-2xl py-4 text-left md:p-12">
            <h3 className="text-text-primary text-left text-2xl font-semibold md:text-3xl">
              NFC-Powered Smart ID Cards for Students
            </h3>
            <p className="text-text-secondary text-lg md:text-xl">
              Enhance campus security and streamline access to facilities with our modern
              NFC smart ID cards. Quick, contactless and secure for every student
            </p>
            <JoinWaitlistButton
              showArrow={true}
              className="mt-4 w-full max-w-md px-6 py-3"
            />
          </div>

          <div className="relative flex aspect-637/618 w-full items-center justify-center rounded-xl">
            <Image
              height={618}
              width={637}
              src="/assets/images/waitlist/nfc-powered-smart-id-cards.png"
              alt="nfc powered smart id cards"
              className="absolute h-full w-full object-contain"
            />
          </div>
        </div>
      </div>
      <FAQAccordion />
    </div>
  )
}
