import Image from "next/image"
import React from "react"

const AboutHero = () => {
  return (
    <div className="flex flex-col gap-6 bg-white py-8 md:gap-8 md:py-12">
      <h1 className="text-center text-2xl font-medium text-[#2d2d2d] md:text-3xl">
        About Us
      </h1>
      <div className="container flex flex-col-reverse gap-8 md:grid md:grid-cols-2 md:gap-20 md:pt-20">
        <section className="grid grid-cols-2 gap-5">
          <Image
            src={"/images/home/about/image1.png"}
            alt=""
            width={"500"}
            height={"800"}
            className="max-h-97 w-full max-w-77 rounded-lg"
          />
          <Image
            src={"/images/home/about/image2.png"}
            alt=""
            width={"500"}
            height={"800"}
            className="mt-25 max-h-97 w-full max-w-77 rounded-lg"
          />
        </section>
        <section className="flex flex-col gap-4 md:gap-6">
          <h2 className="text-lg font-medium sm:text-2xl lg:text-3xl">
            We’re Building a Smarter, Connected School Experience
          </h2>
          <p className="text-base leading-relaxed text-[#535353] md:text-lg">
            School Base is a modern, all-in-one school management system designed to help
            schools automate daily tasks, enhance communication, and deliver a seamless
            digital experience for students, teachers, and parents.
          </p>
          <p className="text-base leading-relaxed text-[#535353] md:text-lg">
            We focus on making everyday operations faster, easier, and more transparent,
            allowing schools to work smarter—not harder. With powerful tools for
            attendance, results, fees, communication, reporting, and classroom management,
            School Base brings your entire school ecosystem into one simple, intuitive
            platform.
          </p>
          <p className="text-base leading-relaxed text-[#535353] md:text-lg">
            Whether you are an administrator aiming for efficiency, a teacher needing
            better classroom tools, a parent seeking clarity, or a student who wants easy
            access to learning resources, School Base ensures everyone stays connected,
            informed, and empowered. Our goal is to help schools transition into a fully
            digital learning environment—organized, transparent, and built for the future
            of education.
          </p>
        </section>
      </div>
    </div>
  )
}

export default AboutHero
