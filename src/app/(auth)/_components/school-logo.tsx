import React from "react"
import Image from "next/image"
import Link from "next/link"

const SchoolLogo = () => {
  return (
    <div>
      <Link href="/">
        <div className="-gap-1.5 mb-8 flex flex-col items-center justify-center">
          <Image
            src="/logo123.jpg"
            alt="St. Brian's Model College logo"
            width={64}
            height={64}
            className="rounded-md object-cover"
          />
          <span className="text-sm font-bold tracking-wider text-neutral-900">
            St. Brian&apos;s Model College
          </span>
        </div>
      </Link>
    </div>
  )
}

export default SchoolLogo
