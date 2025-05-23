import {
  Code,
  Laptop,
  Database,
  Smartphone,
  PenTool,
  Users,
  LucideIcon,
} from 'lucide-react';

export interface NavLink {
  id: string;
  title: string;
}

export const navLinks: NavLink[] = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "experience",
    title: "Experience",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

export interface Service {
  title: string;
  icon: LucideIcon;
}

export const services: Service[] = [
  {
    title: "Frontend Developer",
    icon: Code,
  },
  {
    title: "Backend Developer",
    icon: Database,
  },
  {
    title: "Android Developer",
    icon: Smartphone,
  },
  {
    title: "Full Stack Developer",
    icon: Laptop,
  },
  {
    title: "UI/UX Designer",
    icon: PenTool,
  },
  {
    title: "Team Collaborator",
    icon: Users,
  },
];

export interface Technology {
  name: string;
  icon: string;
}

export const technologies: Technology[] = [
  {
    name: "HTML 5",
    icon: "html.png",
  },
  {
    name: "CSS 3",
    icon: "css.png",
  },
  {
    name: "JavaScript",
    icon: "javascript.png",
  },
  {
    name: "React JS",
    icon: "reactjs.png",
  },
  {
    name: "Node JS",
    icon: "nodejs.png",
  },
  {
    name: "MongoDB",
    icon: "mongodb.png",
  },
  {
    name: "git",
    icon: "git.png",
  },
  {
    name: "Java",
    icon: "java.png",
  },
  {
    name: "Python",
    icon: "python.png",
  },
  {
    name: "Android",
    icon: "android.png",
  },
];

export interface Experience {
  title: string;
  company_name: string;
  icon: string;
  iconBg: string;
  date: string;
  points: string[];
}

export const experiences: Experience[] = [
  {
    title: "Android Developer Intern",
    company_name: "24HR7 Commerce Private Limited",
    icon: "company1.png",
    iconBg: "#383E56",
    date: "Sept 2024 - Dec 2024",
    points: [
      "Developed and optimized Android applications using Java, XML, and Android Studio, improving user engagement by 20%.",
      "Designed responsive web interfaces with HTML, CSS, JavaScript, and React for cross-platform compatibility.",
      "Conducted UI/UX testing, debugging, and performance optimization, reducing app crashes by 15%.",
      "Collaborated in Agile teams, participated in code reviews, and contributed to project planning.",
    ],
  },
  {
    title: "Full-Stack Developer Intern",
    company_name: "EXCELR",
    icon: "company2.png",
    iconBg: "#E6DEDD",
    date: "Dec 2023 - May 2024",
    points: [
      "Built full-stack web applications using MERN stack (MongoDB, Express.js, React, Node.js).",
      "Integrated RESTful APIs and databases to enhance dynamic user experiences.",
      "Implemented responsive design principles, ensuring seamless functionality across devices.",
    ],
  },
];

export interface Project {
  name: string;
  description: string;
  tags: {
    name: string;
    color: string;
  }[];
  image: string;
  source_code_link: string;
}

export const projects: Project[] = [
  {
    name: "JAICOB: Data Science Chatbot",
    description:
      "AI-powered chatbot for data science tasks (e.g., data analysis, model building) using Python. Built with PyCharm, Jupyter, and Anaconda.",
    tags: [
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "ai",
        color: "green-text-gradient",
      },
      {
        name: "data science",
        color: "pink-text-gradient",
      },
    ],
    image: "project1.png",
    source_code_link: "https://github.com/",
  },
  {
    name: "YouTube Clone",
    description:
      "A full-stack YouTube-like platform with React, Node.js, and YouTube Data API v3. Features include video streaming, user authentication, and responsive UI.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "node.js",
        color: "green-text-gradient",
      },
      {
        name: "api",
        color: "pink-text-gradient",
      },
    ],
    image: "project2.png",
    source_code_link: "https://github.com/Shyamala9926/Youtube-Clone",
  },
];