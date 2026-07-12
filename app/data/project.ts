export const projects = [
  {
    id: 1,
    title: "ABANG – Real-time Jeepney Tracking App",
    description: "Commuters in the Philippines wait 15–30 minutes for public jeepneys with zero visibility into when one will arrive. I built ABANG to solve that — a full-stack mobile and web app that shows real-time jeepney locations via GPS. Before deployment, I manually tested data accuracy across 50+ simulated routes, verified location sync timing (<2s latency), and ran functional + edge-case coverage on the tracking pipeline to ensure the real-time feed was reliable at launch.",
    tags: ["Full Stack", "Manual Testing", "Data Validation", "Functional Testing"],
    link: "https://abang-theta.vercel.app/",
    image: "/images/abang.png"
  },
  {
    id: 2,
    title: "CLSU PRISM – Internship Project",
    description: "A university-wide system managing access and permissions for 1,000+ users across multiple departments. I contributed to requirements gathering and documentation, then executed manual testing on the RBAC module — covering role assignments, permission inheritance, and access revocation. Reported defects with full reproduction steps and validated fixes through regression runs before each deployment cycle.",
    tags: ["Requirement Analysis", "RBAC", "Manual Testing", "Regression Testing"],
    link: "https://github.com/thatdevjohnmark",
    image: "/images/clsu-prism.png"
  },
  {
    id: 3,
    title: "Peenam E-commerce Website",
    description: "An online retail platform that needed a usability overhaul — user testing revealed confusion in the checkout flow and inconsistent button behavior across product pages. I collaborated on the UI/UX redesign, auditing every user-facing page for visual consistency and documenting the revised system features and workflows. The result: a cleaner, more predictable shopping experience aligned with user expectations.",
    tags: ["UI/UX", "Usability", "Documentation", "E-commerce"],
    link: "https://github.com/thatdevjohnmark",
    image: "/images/peenam.png"
  },
  {
    id: 4,
    title: "Kickstart – Job Application Tracker",
    description: "Job hunters juggle applications across LinkedIn, company portals, and email — spreadsheets get messy fast. I architected Kickstart, a full-stack tracker that consolidates everything into one Kanban board. Built with Next.js 15 (App Router) and Supabase/PostgreSQL, it features drag-and-drop pipeline management, an analytics dashboard showing monthly trends and response rates, calendar-based deadline tracking, and email/password + Google OAuth authentication with middleware-protected routes. The pixel-art UI and optimistic updates make it feel fast while keeping state consistent across sessions.",
    tags: ["Full Stack", "Next.js", "Supabase", "PostgreSQL", "Authentication", "Kanban"],
    link: "https://kickstart-self.vercel.app/",
    image: "/images/kickstart.png"
  }
];
