import Image from "next/image"
import SqueezeForm from "./squeeze-form"

const SqueezePage = () => {
  return (
    <article className="w-full bg-white pt-20">
      {/* Put the image and CTA side by side */}
      <div className="container grid grid-cols-1 items-center gap-6 md:gap-12 lg:grid-cols-2">
        {/* Heading and subheading is by the left */}
        <div className="animate-onrender">
          <h1 className="max-w-[20ch] text-4xl leading-tight font-bold capitalize md:text-5xl">
            Run your school <span className="text-accent">smarter</span>, faster and Safer
          </h1>

          <p className="text-text-secondary mt-6 max-w-[40ch] text-lg leading-snug">
            Use SchoolBase to automate administrative tasks, improve communication with
            parents and upgrade overall performance specifically for your school needs.
          </p>
        </div>

        {/* IMAGE SECTION */}
        <div className="relative flex justify-center">
          <Image
            src="/assets/desktop-x-phone.png"
            alt="Squeeze preview"
            width={700}
            height={700}
            className=""
          />
        </div>
      </div>

      {/* the video should be by the left and the form by the right */}
      <section className="container grid items-center gap-6 py-14 md:gap-12 lg:grid-cols-2">
        {/* video */}
        <div className="bg-accent/10 rounded-xl p-2">
          <video controls className="h-full w-full rounded-xl">
            <source src="/assets/videos/squeeze_video.MOV" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* FORM */}
        <div className="flex w-full justify-end">
          <SqueezeForm />
        </div>
      </section>

      {/* CTA */}
      <div>
        <p className="bg-accent w-full rounded-none py-1 text-center text-lg text-white">
          Be among the first 30 schools
        </p>
      </div>
    </article>
  )
}
export default SqueezePage
