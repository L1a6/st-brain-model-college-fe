export interface ImageData {
  src: string
  mobile: {
    width: number
    height: number
    bottom: string
    left: string
  }
  desktop: {
    width: number
    height: number
    bottom: string
    left: string
  }
  zIndex: number
}

export interface Feature {
  id: string
  header: string
  paragraph: string
  images: ImageData[]
}

// DATA
export const HowItWorksFeatures: Feature[] = [
  {
    id: "feat-1",
    header: "Set Up Your School (Admins)",
    paragraph:
      "Admins can set up the entire school in minutes adding classes, departments, teachers, students, subjects, timetables, fee groups, and all necessary information creating a fully digitized school structure.",
    images: [
      {
        src: "/assets/images/howitworks/feat-1.1.svg",
        mobile: {
          width: 180,
          height: 180,
          bottom: "30px",
          left: "10px",
        },
        desktop: {
          width: 361,
          height: 264,
          bottom: "20px",
          left: "20px",
        },
        zIndex: 1,
      },
      {
        src: "/assets/images/howitworks/feat-1.2.svg",
        mobile: {
          width: 197,
          height: 296,
          bottom: "30px",
          left: "100px",
        },
        desktop: {
          width: 300,
          height: 380,
          bottom: "20px",
          left: "170px",
        },
        zIndex: 2,
      },
    ],
  },

  {
    id: "feat-2",
    header: "Smart Attendance (Admins, Teacher & Students)",
    paragraph:
      "Students check in instantly with NFC ID cards, teachers can take attendance manually, and admins get real-time attendance tracking with no paperwork.",
    images: [
      {
        src: "/assets/images/howitworks/feat-2.1.svg",
        mobile: {
          width: 174,
          height: 203,
          bottom: "30px",
          left: "10px",
        },
        desktop: {
          width: 278,
          height: 324,
          bottom: "20px",
          left: "10px",
        },
        zIndex: 2,
      },
      {
        src: "/assets/images/howitworks/feat-2.2.svg",
        mobile: {
          width: 157,
          height: 206,
          bottom: "50px",
          left: "140px",
        },
        desktop: {
          width: 251,
          height: 329,
          bottom: "40px",
          left: "230px",
        },
        zIndex: 1,
      },
    ],
  },

  {
    id: "feat-3",
    header: "Academics & Results (Teachers, Admins & Students)",
    paragraph:
      "Teachers enter scores, admins approve results, and students access their digital report cards anytime.",
    images: [
      {
        src: "/assets/images/howitworks/feat-3.1.svg",
        mobile: {
          width: 180,
          height: 190,
          bottom: "40px",
          left: "10px",
        },
        desktop: {
          width: 247,
          height: 320,
          bottom: "40px",
          left: "20px",
        },
        zIndex: 2,
      },
      {
        src: "/assets/images/howitworks/feat-3.2.svg",
        mobile: {
          width: 150,
          height: 160,
          bottom: "20px",
          left: "150px",
        },
        desktop: {
          width: 207,
          height: 313,
          bottom: "20px",
          left: "260px",
        },
        zIndex: 1,
      },
    ],
  },

  {
    id: "feat-4",
    header: "Fees & Payments (Admins & Parents)",
    paragraph:
      "Admins create invoices, track payments, and send reminders while parents pay online and view their full payment history.",
    images: [
      {
        src: "/assets/images/howitworks/feat-4.1.svg",
        mobile: {
          width: 154,
          height: 205,
          bottom: "20px",
          left: "10px",
        },
        desktop: {
          width: 245,
          height: 327,
          bottom: "20px",
          left: "20px",
        },
        zIndex: 1,
      },
      {
        src: "/assets/images/howitworks/feat-4.2.svg",
        mobile: {
          width: 157,
          height: 135,
          bottom: "40px",
          left: "140px",
        },
        desktop: {
          width: 250,
          height: 209,
          bottom: "40px",
          left: "220px",
        },
        zIndex: 2,
      },
    ],
  },

  {
    id: "feat-5",
    header: "Timetable Management (Admins & Teachers)",
    paragraph:
      "Admins and teachers manage timetables in one place, while students always see the most updated versions.",
    images: [
      {
        src: "/assets/images/howitworks/feat-5.1.svg",
        mobile: {
          width: 129,
          height: 198,
          bottom: "20px",
          left: "20px",
        },
        desktop: {
          width: 205,
          height: 315,
          bottom: "20px",
          left: "30px",
        },
        zIndex: 1,
      },
      {
        src: "/assets/images/howitworks/feat-5.2.svg",
        mobile: {
          width: 150,
          height: 172,
          bottom: "50px",
          left: "140px",
        },
        desktop: {
          width: 239,
          height: 273,
          bottom: "68px",
          left: "220px",
        },
        zIndex: 2,
      },
    ],
  },
]

// interface ImageData {
//   src: string
//   width: number
//   height: number
//   style: {
//     bottom: string
//     left: string
//     zIndex: number
//   }
// }

// interface Features {
//   id: string
//   header: string
//   paragraph: string
//   images: ImageData[]
// }

// export const HowItWorksFeatures: Features[] = [
//   {
//     id: "feat-1",
//     header: "Set Up Your School (Admins)",
//     paragraph:
//       "Admins can set up the entire school in minutes adding classes, departments, teachers, students, subjects, timetables, fee groups, and all necessary information creating a fully digitized structure that forms the foundation for smooth, efficient operations.",
//     images: [
//       {
//         src: "/assets/images/howitworks/feat-1.1.svg",
//         width: 350,
//         height: 264,
//         style: { bottom: "-140px", left: "20px", zIndex: 1 },
//       },
//       {
//         src: "/assets/images/howitworks/feat-1.2.svg",
//         width: 300,
//         height: 380,
//         style: { bottom: "-140px", left: "120px", zIndex: 2 },
//       },
//     ],
//   },
//   {
//     id: "feat-2",
//     header: "Smart Attendance (Admins, Teacher & Students)",
//     paragraph:
//       "With Smart Attendance, students check in instantly by tapping their NFC ID cards, teachers can take attendance manually when needed, and admins see real-time records for the entire school automatically tracking late arrivals, absences, and teacher attendance, eliminating paperwork and ensuring instant, accurate updates for everyone.",
//     images: [
//       {
//         src: "/assets/images/howitworks/feat-2.1.svg",
//         width: 350,
//         height: 264,
//         style: { bottom: "-140px", left: "20px", zIndex: 2 },
//       },
//       {
//         src: "/assets/images/howitworks/feat-2.2.svg",
//         width: 300,
//         height: 264,
//         style: { bottom: "-140px", left: "120px", zIndex: 1 },
//       },
//     ],
//   },
//   {
//     id: "feat-3",
//     header: "Academics & Results (Teachers, Admins & Students)",
//     paragraph:
//       "Teachers can record classwork, assignments, tests, and exams while uploading results; admins can approve and publish digital report cards; and students and parents can view results anytime, track performance, and download report cards creating a complete academic record that is organized, transparent, and always accessible.",
//     images: [
//       {
//         src: "/assets/images/howitworks/feat-3.1.svg",
//         width: 350,
//         height: 420,
//         style: { bottom: "-140px", left: "20px", zIndex: 2 },
//       },
//       {
//         src: "/assets/images/howitworks/feat-3.2.svg",
//         width: 300,
//         height: 380,
//         style: { bottom: "-140px", left: "120px", zIndex: 1 },
//       },
//     ],
//   },
//   {
//     id: "feat-4",
//     header: "Fees & Payments (Admins & Parents)",
//     paragraph:
//       "Fees become structured and easy to manage as admins create fee groups, assign charges to classes or individual students, generate invoices, send reminders, and track payments in real time, while parents can view all fee details, pay directly, and access their full payment history resulting in stress free fee collection with complete transparency.",
//     images: [
//       {
//         src: "/assets/images/howitworks/feat-4.1.svg",
//         width: 350,
//         height: 420,
//         style: { bottom: "-140px", left: "20px", zIndex: 1 },
//       },
//       {
//         src: "/assets/images/howitworks/feat-4.2.svg",
//         width: 300,
//         height: 380,
//         style: { bottom: "-140px", left: "120px", zIndex: 2 },
//       },
//     ],
//   },
//   {
//     id: "feat-5",
//     header: "Timetable Management (Admins & Teachers)",
//     paragraph:
//       "Open School Portal keeps the school schedule organized by allowing admins and teachers to create and update timetables, assign classes and subjects, and share schedules with students and parents, while everyone can view the latest timetable in one place ensuring no confusion, missed classes, or scheduling conflicts across the school community.",
//     images: [
//       {
//         src: "/assets/images/howitworks/feat-5.1.svg",
//         width: 350,
//         height: 420,
//         style: { bottom: "-140px", left: "20px", zIndex: 1 },
//       },
//       {
//         src: "/assets/images/howitworks/feat-5.2.svg",
//         width: 300,
//         height: 380,
//         style: { bottom: "-140px", left: "120px", zIndex: 2 },
//       },
//     ],
//   },
// ]
