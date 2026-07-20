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
  about: "Backend Developer con 5+ años en entornos productivos. Especializado en microservicios Python, Data Lake en AWS con Airflow + dbt, ML con XGBoost + MLflow, y agentes IA con LangChain + Azure OpenAI. Docente activo con 180+ alumnos formados.",
  skills: [
    { name: "Python", category: "Backend", icon: Code },
    { name: "FastAPI / Django", category: "Backend", icon: Server },
    { name: "PostgreSQL", category: "Database", icon: Database },
    { name: "AWS + Terraform", category: "Cloud", icon: Terminal },
    { name: "Airflow + dbt + MLflow", category: "Data & ML", icon: Cpu },
    { name: "LangChain + Azure OpenAI", category: "IA / LLM", icon: Globe },
  ],
  experience: [
    {
      id: 1,
      role: "Python Backend Developer",
      company: "Kilimo",
      period: "Nov 2021 - Jun 2026",
      description: "Microservicios FastAPI/Django/Celery en producción · Data Lake Medallion en AWS (Airflow, dbt, Glue, Athena) · Pipelines ML con XGBoost + MLflow · Agentes IA con LangChain/LangGraph + Azure OpenAI · IaC Terraform modular · Datos satelitales (SentinelHub, Planet Labs, rasterio).",
      type: "Full-time"
    },
    {
      id: 2,
      role: "Profesor",
      company: "Instituto Tecnológico Rio Cuarto",
      period: "Mar 2021 - Mar 2026",
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
