import React from "react"
import { PiCodeSimpleBold } from "react-icons/pi"
import { FaMobile } from "react-icons/fa6"
import { FaLocationDot } from "react-icons/fa6"
import { BiShieldQuarter } from "react-icons/bi"

const AboutPerks = () => {
  return (
    <div className="bg-[#FBFBFB] py-8 md:gap-8">
      <div className="container flex flex-col gap-20 xl:flex-row">
        <section className="flex max-w-120 flex-col gap-4 md:gap-6">
          <h2 className="text-lg font-medium sm:text-2xl lg:text-3xl">
            We&apos;re building the future of school management in Nigeria
          </h2>
          <p className="text-sm leading-7 text-[#535353] md:text-lg">
            School Base is an all-in-one, free platform designed for Nigerian schools. It
            simplifies school administration with features for attendance tracking, result
            processing, fee management, student information systems, and seamless
            parent-teacher communication.
          </p>
        </section>
        <section className="grid gap-4 md:grid-cols-2 md:gap-6">
          <div className="flex flex-col gap-8 rounded-lg border border-[#2d2d2d]/15 bg-white px-5 py-10">
            <PiCodeSimpleBold className="text-accent" size={32} strokeWidth={2} />
            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-semibold text-[#2d2d2d] sm:text-xl md:text-2xl">
                Open Source
              </h1>
              <p className="text-sm text-[#535353] md:text-lg">
                Community-driven, cost-effective, and customizable to fit your
                school&apos;s unique needs.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-8 rounded-lg border border-[#2d2d2d]/15 bg-white px-5 py-10">
            <FaMobile className="text-accent" size={32} />
            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-semibold text-[#2d2d2d] sm:text-xl md:text-2xl">
                Mobile-First
              </h1>
              <p className="text-sm text-[#535353] md:text-lg">
                Accessible on any device, ensuring parents, teachers, and students are
                always connected.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-8 rounded-lg border border-[#2d2d2d]/15 bg-white px-5 py-10">
            <FaLocationDot className="text-accent" size={32} />
            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-semibold text-[#2d2d2d] sm:text-xl md:text-2xl">
                Local & Relevant
              </h1>
              <p className="text-sm text-[#535353] md:text-lg">
                Tailored features that meet the specific requirements of the Nigerian
                education system.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-8 rounded-lg border border-[#2d2d2d]/15 bg-white px-5 py-10">
            <BiShieldQuarter className="text-accent" size={32} />
            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-semibold text-[#2d2d2d] sm:text-xl md:text-2xl">
                Secure & Structured
              </h1>
              <p className="text-sm text-[#535353] md:text-lg">
                Prioritizing data privacy and security with organized, reliable
                information management
              </p>
            </div>
          </div>{" "}
        </section>
      </div>
    </div>
  )
}

export default AboutPerks
