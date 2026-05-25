import React from "react"
import { MdRocketLaunch } from "react-icons/md"
import { MdRemoveRedEye } from "react-icons/md"
const AboutValues = () => {
  return (
    <div className="bg-white py-14 md:gap-8">
      <div className="container grid gap-5 md:grid-cols-2">
        <section className="flex flex-col gap-6 rounded-2xl border border-[#2d2d2d]/15 bg-[#F8F8F8] px-8 py-12">
          <div className="flex items-center gap-2">
            <MdRocketLaunch className="text-accent" size={32} />
            <p className="text-lg font-semibold text-[#2d2d2d] sm:text-xl md:text-2xl">
              Our Mission
            </p>
          </div>
          <p className="text-sm text-[#535353] md:text-lg">
            To empower Nigerian schools with accessible, high-quality technology to
            improve administration and educational outcomes.
          </p>
        </section>
        <section className="flex flex-col gap-6 rounded-2xl border border-[#2d2d2d]/15 bg-[#F8F8F8] px-8 py-12">
          <div className="flex items-center gap-2">
            <MdRemoveRedEye className="text-accent" size={32} />
            <p className="text-lg font-semibold text-[#2d2d2d] sm:text-xl md:text-2xl">
              Our Vision
            </p>
          </div>
          <p className="text-sm text-[#535353] md:text-lg">
            To become the standard for school management systems across Nigeria, fostering
            a digitally-enabled education ecosystem.
          </p>
        </section>
      </div>
    </div>
  )
}

export default AboutValues
