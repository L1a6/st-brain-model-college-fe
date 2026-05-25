import React from "react"
import { featuresData } from "./_lib/features.data"
import FeatureSection from "./_components/feature-section"

const page = () => {
  return (
    <div className="min-h-screen pt-15">
      <div className="container flex flex-col gap-8">
        <div className="flex flex-col items-center gap-2.5 text-center">
          <h1 className="text-lg font-medium text-[#2d2d2d] uppercase md:text-2xl lg:text-3xl">
            WHY YOU SHOULD USE SCHOOL BASE
          </h1>
          <p className="text-sm text-[#535353] sm:text-lg md:text-xl">
            Our platform powers the full student and school lifecycle from admissions to
            graduation.
          </p>
        </div>
        <div className="flex flex-col gap-20 py-10">
          {featuresData.map((data, index) => (
            <FeatureSection
              key={index}
              number={data.number}
              title={data.title}
              description={data.description}
              features={data.listItems}
              imageSrc={data.imageSrc}
              imgWidth={data.imgWidth}
              imgHeight={data.imgHeight}
              isReversed={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default page
