import BlogCards from "./_components/blog-cards"

const Resources = () => {
  return (
    <div className="min-h-screen pt-15">
      <div className="container flex flex-col gap-8">
        <div className="flex flex-col items-center gap-2.5 text-center">
          <h1 className="text-4xl font-bold uppercase sm:text-5xl md:text-6xl">
            SCHOOL BASE
          </h1>
          <h2 className="max-w-[50ch] text-center text-xl font-medium text-[#535353] sm:text-2xl md:text-3xl">
            Learn how to use School Base to power the full student and school lifecycle
            from admissions to graduation.
          </h2>
          <p className="max-w-[45ch] text-center">
            We have all the guides you need to know how to effectively customize School
            Base.
          </p>
        </div>

        <BlogCards />
      </div>
    </div>
  )
}

export default Resources
