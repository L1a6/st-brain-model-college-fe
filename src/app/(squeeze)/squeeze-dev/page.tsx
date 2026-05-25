import React from "react"
import Image from "next/image"
import SqueezeForm from "../_components/squeeze-form"

const SqueezeDev = () => {
  return (
    <article className="pt-10">
      <section className="container grid grid-cols-1 items-center gap-5 lg:grid-cols-2">
        <div className="relative flex max-h-screen justify-center">
          <Image
            src="/assets/images/developer_coding.jpg"
            alt="Squeeze preview"
            width={500}
            height={300}
            className="w-full rounded-xl object-cover"
          />
        </div>

        <div className="flex w-full flex-col items-center justify-center space-x-4">
          <h3 className="text-primary text-xl font-bold lg:text-3xl">
            Build your first Integration
          </h3>
          <p className="text-text-secondary max-w-[50ch] py-4 text-center">
            Start building custom school management solutions with SchoolBase open source
            in 30 minutes.
          </p>
          {/* form by the right */}

          <SqueezeForm cta="dev" />
        </div>
      </section>

      {/* video */}
      <div className="bg-accent/10 mx-auto mt-20 mb-10 max-w-2xl rounded-xl p-2 lg:my-10">
        <video controls className="rounded-xl">
          <source src="/assets/videos/squeeze_video.MOV" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <p className="bg-accent w-full rounded-none py-1 text-center text-lg text-white">
        Build your first integration seamlessly with SchoolBase
      </p>
    </article>
  )
}

export default SqueezeDev
