"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import DemoVideo from "../../_components/demo-video"

const DemoVideo2 = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [open, setOpen] = useState(false)

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)

    const video = videoRef.current
    if (!video) return

    if (isOpen) {
      video.currentTime = 0
      video.play()
    } else {
      video.pause()
      video.currentTime = 0
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          size={"sm"}
          className="rounded border-[#FAFAFA] text-[#FAFAFA] max-md:w-24 max-md:text-[12px] md:h-12 md:w-[167px] md:text-lg"
        >
          Watch Demo
        </Button>
      </DialogTrigger>

      <DialogContent className="h-full max-h-[500px] w-full max-w-[900px]! overflow-hidden p-0">
        <div className="w-full">
          <DemoVideo ref={videoRef} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DemoVideo2
