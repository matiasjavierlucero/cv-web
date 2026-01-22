import { Code, Database, Server, Terminal, Cpu, Globe } from 'lucide-react';

export const profileData = {
  name: "Matias Javier Lucero",
  role: "Python Backend Developer | Data Engineer",
  headline: "Python Backend Developer || Data Engineer at Kilimo",
  location: "Argentina",
  email: "matiasjavierlucero@gmail.com",
  social: {
    linkedin: "https://www.linkedin.com/in/matiasjavierlucero",
    github: "https://github.com/matiasjavierlucero"
  },
  about: "Backend Developer especializado en Python con experiencia en Django, Flask y arquitecturas API Rest. Apasionado por la ingeniería de datos, la optimización de bases de datos PostgreSQL y la implementación de soluciones escalables usando Docker. Experiencia docente y en gestión de proyectos.",
  skills: [
    { name: "Python", category: "Backend", icon: Code },
    { name: "Django", category: "Backend", icon: Server },
    { name: "PostgreSQL", category: "Database", icon: Database },
    { name: "Docker", category: "DevOps", icon: Terminal },
    { name: "API Rest", category: "Backend", icon: Globe },
    { name: "Data Engineering", category: "Data", icon: Cpu },
  ],
  experience: [
    {
      id: 1,
      role: "Python Backend Developer",
      company: "Kilimo",
      period: "Nov 2021 - Presente",
      description: "Desarrollo y mantenimiento de backend en Python. Optimización de consultas y arquitectura de datos.",
      type: "Full-time"
    },
    {
      id: 2,
      role: "Profesor",
      company: "Instituto Tecnológico Rio Cuarto",
      period: "Mar 2021 - Presente",
      description: "Docencia en materias de desarrollo de software y programación.",
      type: "Part-time"
    },
    {
      id: 3,
      role: "Python Backend Dev",
      company: "Comprando en Grupo",
      period: "May 2021 - Nov 2021",
      description: "Desarrollo backend para plataforma de e-commerce B2B.",
      type: "Contract"
    },
    {
      id: 4,
      role: "Desarrollador Web Freelance",
      company: "Sindicato de la Carne / Clínica Mellitus",
      period: "May 2020 - Oct 2021",
      description: "Sistema de liquidación de aportes, gestión de turnos online y notificaciones automatizadas.",
      type: "Freelance"
    },
    {
      id: 5,
      role: "Python Backend Developer",
      company: "iTecLabs",
      period: "Dic 2019 - Oct 2021",
      description: "Desarrollo de soluciones backend a medida.",
      type: "Full-time"
    }
  ],
  education: [
    {
      id: 1,
      degree: "Técnico Superior en Desarrollo de Software",
      institution: "Instituto Tecnológico Rio Cuarto",
      period: "2017 - 2020"
    },
    {
      id: 2,
      degree: "Contador Público",
      institution: "Universidad Nacional de Río Cuarto",
      period: "2013"
    }
  ]
};
