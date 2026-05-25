"use client"

import React, { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Wallet,
  CalendarCheck,
  BookOpen,
  GraduationCap,
  Users,
  MessageSquare,
  Smartphone,
  ArrowRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

const modules = [
  {
    title: "Fees Module",
    description:
      "Manages everything related to school payments, fee tracking, debts, and receipts.",
    icon: Wallet,
    features: [
      {
        name: "Debt setup",
        description: "Set how much each student owes and organize all debt records.",
      },
      {
        name: "Student fees dashboard",
        description: "See all student payments, balances, and debts in one place.",
      },
      {
        name: "Payments",
        description: "Record and track all fee payments made by students.",
      },
      {
        name: "Receipts",
        description: "Generate and download receipts for every payment.",
      },
    ],
  },
  {
    title: "Attendance Module",
    description:
      "Handles daily attendance for students and teachers, including class attendance, NFC tap attendance, and attendance analytics.",
    icon: CalendarCheck,
    features: [
      {
        name: "Daily attendance",
        description: "Mark if students and teachers are present or absent each day.",
      },
      {
        name: "Class attendance",
        description: "Track attendance for specific classes or subjects.",
      },
      {
        name: "NFC attendance integration",
        description: "Use NFC tap to take attendance quickly.",
      },
      {
        name: "Attendance analytics",
        description: "View charts and reports showing attendance patterns.",
      },
    ],
  },
  {
    title: "Academics Module",
    description:
      "Supports academic structure such as subjects, classes, teacher assignments, and school timetables.",
    icon: BookOpen,
    features: [
      {
        name: "Subjects",
        description: "Create and manage all subjects offered in the school.",
      },
      {
        name: "Classes/Arms",
        description: "Set up class levels and different arms or groups.",
      },
      {
        name: "Teacher assignment",
        description: "Assign teachers to classes and subjects.",
      },
      {
        name: "Timetable",
        description: "Build and manage the school timetable.",
      },
    ],
  },
  {
    title: "Exams Module",
    description:
      "Covers continuous assessment, exam entry, result generation, and result approval workflows.",
    icon: GraduationCap,
    features: [
      {
        name: "CA & Exam entry",
        description: "Teachers enter continuous assessment and exam scores.",
      },
      {
        name: "Result generation",
        description: "Automatically calculate and generate student results.",
      },
      {
        name: "Result approval workflow",
        description: "Admin reviews and approves results before release.",
      },
    ],
  },
  {
    title: "Users Module",
    description:
      "Manages all user types on the platform—admins, teachers, parents, students, and roles.",
    icon: Users,
    features: [
      {
        name: "Super Admin",
        description: "Full control of the entire system and all users.",
      },
      {
        name: "Admins",
        description: "Manage school operations like users, classes, and settings.",
      },
      {
        name: "Teachers",
        description: "Manage attendance, scores, and classroom tasks.",
      },
      {
        name: "Students",
        description: "Access results, attendance, and personal details.",
      },
      {
        name: "Parents",
        description: "View their child’s results, fees, and notifications.",
      },
    ],
  },
  {
    title: "Communication Module",
    description: "Handles school-wide announcements and automated result notifications.",
    icon: MessageSquare,
    features: [
      {
        name: "Notices / Announcements",
        description: "Send important messages to the whole school.",
      },
      {
        name: "Result notifications",
        description: "Automatically notify parents when results are released.",
      },
    ],
  },
  {
    title: "Device & Gateway Module",
    description:
      "Controls device authentication and allows switching between different operational modes (Gate, Duty, Classroom).",
    icon: Smartphone,
    features: [
      {
        name: "Device authentication",
        description: "Approve and register devices that can use the system.",
      },
      {
        name: "Mode selection (Gate, Duty, Classroom)",
        description: "Switch device mode for gate checks, duty roles, or classroom use.",
      },
    ],
  },
]

const ModuleCard = ({
  module,
  index,
}: {
  module: (typeof modules)[0]
  index: number
}) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [showScrollIndicator, setShowScrollIndicator] = useState(false)
  const contentRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const checkOverflow = () => {
      if (contentRef.current) {
        const { scrollHeight, clientHeight } = contentRef.current
        setShowScrollIndicator(scrollHeight > clientHeight)
      }
    }

    checkOverflow()
    window.addEventListener("resize", checkOverflow)
    return () => window.removeEventListener("resize", checkOverflow)
  }, [isFlipped])

  return (
    <div
      className="group animate-onrender h-[400px]"
      style={{
        animationDelay: `${index * 100}ms`,
        perspective: "1000px",
      }}
    >
      <div
        className={cn(
          "relative h-full w-full transition-all duration-500",
          isFlipped ? "rotate-y-180" : ""
        )}
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front of Card */}
        <Card
          className="border-border/50 hover:border-primary/50 absolute inset-0 flex h-full w-full flex-col justify-between transition-all duration-300 hover:shadow-md"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <CardHeader>
            <div className="bg-accent/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg transition-colors">
              <module.icon className="text-accent h-6 w-6" />
            </div>
            <CardTitle className="text-xl font-bold">{module.title}</CardTitle>
            <CardDescription className="mt-2 text-sm">
              {module.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-6">
            <Button
              onClick={() => setIsFlipped(true)}
              className="group/btn w-full"
              variant="default"
            >
              Learn More
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </CardContent>
        </Card>

        {/* Back of Card */}
        <Card
          className="border-border/50 bg-card absolute inset-0 flex h-full w-full flex-col overflow-hidden py-0"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <CardHeader className="pt-6 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-accent text-lg font-bold">
                {module.title} Features
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent
            ref={contentRef}
            className="scrollbar-thin scrollbar-thumb-accent/20 scrollbar-track-transparent relative mt-4 flex-1 overflow-y-auto pr-2"
          >
            <div className="space-y-4 pb-6">
              {module.features.map((feature, idx) => (
                <div key={idx} className="space-y-1">
                  <h4 className="text-foreground flex items-center gap-2 text-sm font-semibold">
                    <div className="bg-accent h-1.5 w-1.5 rounded-full" />
                    {feature.name}
                  </h4>
                  <p className="text-muted-foreground pl-3.5 text-xs leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
          <div className="border-border/10 bg-background/50 relative border-t p-6 backdrop-blur-sm">
            {/* Scroll Indicator */}
            {showScrollIndicator && (
              <div className="from-card pointer-events-none absolute -top-8 right-0 left-0 flex h-8 items-end justify-center bg-gradient-to-t to-transparent pb-1">
                <div className="text-accent/50 flex animate-bounce flex-col items-center text-[10px] font-medium">
                  <span className="mb-[-2px]">Scroll</span>
                  <ArrowRight className="h-3 w-3 rotate-90" />
                </div>
              </div>
            )}
            <Button
              onClick={() => setIsFlipped(false)}
              variant="outline"
              className="w-full"
            >
              Back to Overview
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

const ModulesPage = () => {
  return (
    <div className="bg-background min-h-screen py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="animate-onrender mx-auto mb-16 flex max-w-220 flex-col gap-4">
          <h1 className="text-center text-2xl font-medium text-[#2d2d2d] md:text-3xl">
            Modules
          </h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((module, index) => (
            <ModuleCard key={index} module={module} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ModulesPage
