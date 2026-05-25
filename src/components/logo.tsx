import Image from "next/image"

interface LogoProps {
  size?: number
  textColor?: string
  className?: string
}

const Logo: React.FC<LogoProps> = ({
  size = 28,
  textColor = "#0A0A0A",
  className = "",
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative shrink-0 overflow-hidden rounded-md" style={{ width: size, height: size }}>
        <Image src="/logo123.jpg" alt="St. Brian's Model College logo" fill className="object-cover" />
      </div>

      <span
        className="font-bold tracking-wider"
        style={{ color: textColor, fontSize: size * 0.5 }}
      >
        St. Brian's Model College
      </span>
    </div>
  )
}

export default Logo

