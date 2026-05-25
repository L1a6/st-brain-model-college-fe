import Image from "next/image"
import { IoIosCheckbox } from "react-icons/io"

interface FeatureSectionProps {
  number: number
  title: string
  description: string
  features: string[]
  imageSrc: string
  isReversed?: boolean
  imgWidth?: number
  imgHeight?: number
}

const FeatureSection = ({
  number,
  title,
  description,
  features,
  imageSrc,
  isReversed = false,
  imgWidth = 700,
  imgHeight = 600,
}: FeatureSectionProps) => {
  return (
    <section
      className={`flex flex-col items-center gap-15 ${
        isReversed ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      {/* Text Container */}
      <div
        className={`flex w-fit flex-col gap-4 ${isReversed ? "justify-self-end" : "justify-self-start"}`}
      >
        <div className="flex w-fit items-center gap-4 rounded-md border border-[#2d2d2d]/30 p-1 pr-2">
          <p className="bg-accent flex size-9 items-center justify-center rounded-sm text-3xl font-bold text-white">
            {number}
          </p>
          <p className="text-lg font-bold text-[#2d2d2d] sm:text-xl">{title}</p>
        </div>
        <p className="text-base font-medium text-[#2d2d2d] md:text-lg">{description}</p>
        <ul className="flex flex-col gap-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <IoIosCheckbox className="size-6 shrink-0 rounded-xl text-[#10B981]" />
              <p className="text-sm text-[#535353] md:text-lg">{feature}</p>
            </li>
          ))}
        </ul>
      </div>

      <div
        className={`flex w-full flex-1 ${!isReversed ? "justify-end" : "justify-start"}`}
      >
        <Image
          src={imageSrc}
          alt={title}
          width={imgWidth}
          height={imgHeight}
          className="h-auto w-full object-contain"
          style={{ maxWidth: imgWidth }}
        />
      </div>
    </section>
  )
}

export default FeatureSection
