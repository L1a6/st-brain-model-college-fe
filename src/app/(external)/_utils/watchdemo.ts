export function playVideoAndScroll(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  elementId: string,
  offset = 0 // optional top offset in pixels
) {
  const video = videoRef.current
  if (video) {
    video.play()
  }

  const element = document.getElementById(elementId)
  if (element) {
    // Get element position relative to viewport
    const elementPosition = element.getBoundingClientRect().top + window.scrollY

    // Scroll to element minus the offset
    window.scrollTo({
      top: elementPosition - offset,
      behavior: "smooth",
    })
  }
}
