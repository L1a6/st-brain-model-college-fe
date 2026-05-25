import React from "react"
import AboutHero from "./_components/about-hero"
import AboutPerks from "./_components/about-perks"
import AboutValues from "./_components/about-values"

const page = () => {
  return (
    <div className="min-h-screen">
      <AboutHero />
      <AboutPerks />
      <AboutValues />
    </div>
  )
}

export default page
