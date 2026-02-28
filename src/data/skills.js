import {
    FaHtml5, FaCss3Alt, FaJs, FaReact, FaBootstrap, FaPython, FaJava,
    FaAws, FaGitAlt, FaGithub, FaWordpress, FaFigma, FaCuttlefish,
    FaServer, FaPalette, FaRobot, FaMousePointer
} from 'react-icons/fa';
import {
    SiTailwindcss, SiDjango, SiPostgresql, SiRedis, SiNotion,
    SiCodepen, SiPostman, SiPycharm, SiCanva,
    SiVercel, SiGodaddy, SiCpanel, SiHostinger, SiFirebase, SiBrevo
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { SiFirebase } from 'react-icons/si';

export const skills = [
    {
        category: "Frontend",
        items: [
            { name: "HTML", level: 95, icon: FaHtml5 },
            { name: "CSS", level: 95, icon: FaCss3Alt },
            { name: "Bootstrap", level: 90, icon: FaBootstrap },
            { name: "Tailwind CSS", level: 92, icon: SiTailwindcss },
            { name: "React JS", level: 90, icon: FaReact },
            { name: "JavaScript", level: 90, icon: FaJs }
        ]
    },
    {
        category: "Backend",
        items: [
            { name: "Python", level: 90, icon: FaPython },
            { name: "Django", level: 92, icon: SiDjango },
            { name: "DRF", level: 88, icon: SiDjango }, // Using Django icon for DRF
            { name: "PostgreSQL", level: 85, icon: SiPostgresql },
            { name: "Firebase", level: 90, icon: SiFirebase }
        ]
    },
    {
        category: "Other",
        items: [
            { name: "C", level: 75, icon: FaCuttlefish },
            { name: "Java", level: 75, icon: FaJava },
            { name: "AWS", level: 70, icon: FaAws },
            { name: "Hostinger", level: 80, icon: SiHostinger },
            { name: "Git", level: 88, icon: FaGitAlt },
            { name: "Redis", level: 75, icon: SiRedis },
            { name: "UI Design", level: 85, icon: FaPalette }
        ]
    },
    {
        category: "Tools",
        items: [
            { name: "Antigravity (AI Agent)", level: 95, icon: FaRobot },
            { name: "Cursor (AI Agent)", level: 95, icon: FaMousePointer },
            { name: "Notion", level: 90, icon: SiNotion },
            { name: "CodePen", level: 85, icon: SiCodepen },
            { name: "VS Code", level: 95, icon: VscVscode },
            { name: "Postman", level: 90, icon: SiPostman },
            { name: "PyCharm", level: 90, icon: SiPycharm },
            { name: "Canva", level: 92, icon: SiCanva },
            { name: "Vercel", level: 88, icon: SiVercel },
            { name: "GitHub", level: 90, icon: FaGithub },
            { name: "WordPress", level: 85, icon: FaWordpress },
            { name: "Figma", level: 88, icon: FaFigma },
            { name: "GoDaddy", level: 80, icon: SiGodaddy },
            { name: "cPanel", level: 85, icon: SiCpanel },
            { name: "Brevo", level: 85, icon: SiBrevo },

        ]
    }
];

export const softSkills = [
    "Problem Solving",
    "Team Collaboration",
    "Communication",
    "Time Management",
    "Agile/Scrum",
    "Client Relations"
];
