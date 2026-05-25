import Image from "next/image"
import JoinWaitlistButton from "./join-waitlist-button"

const HomeHero = () => {
  return (
    <div className="flex w-full pt-6 md:pt-8 lg:pt-10">
      <div className="container flex flex-col items-center gap-6">
        <section className="flex w-full flex-col gap-6 py-4 text-center md:gap-8 md:py-6">
          <div className="flex flex-col items-center gap-4 md:gap-6">
            <h1 className="text-text-primary animate-onrender text-3xl leading-tight font-bold md:text-6xl md:leading-18">
              Get Early Access to <br className="md:hidden" /> School{" "}
              <br className="hidden md:block" /> Base
            </h1>
            <p className="text-text-secondary animate-onrender text-base leading-7 delay-300 md:text-xl md:leading-8 lg:max-w-132 lg:text-2xl lg:leading-9.5">
              The one-in-all system for managing students, attendance, fees reports and
              NFC smart ID cards.
            </p>
          </div>
          <div>
            <JoinWaitlistButton
              showArrow={true}
              className="w-full gap-3 px-8 md:w-auto"
            />
          </div>
        </section>
        <div className="animate-onrender flex aspect-1083/602 w-full justify-center delay-600">
          <Image
            src="/assets/images/waitlist/admin-fees-management.png"
            alt="Hero Image"
            width={1083}
            height={602}
            priority
            className="w-full"
          />
        </div>
      </div>
    </div>
  )
}

export default HomeHero
