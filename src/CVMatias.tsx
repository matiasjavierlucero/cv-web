import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import PixelETL from './components/PixelETL';
import {
    Github, Linkedin, Mail, Download, Menu, X, Sun, Moon,
    Briefcase, GraduationCap, Code, Database, Cloud, Globe,
    Users, BookOpen, Award, MapPin, Calendar, Sparkles, Zap,
    TrendingUp, Rocket, Layers,
} from 'lucide-react';

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useTypewriter(
    words: string[],
    typingSpeed = 75,
    deletingSpeed = 38,
    pauseTime = 2000,
) {
    const [state, setState] = useState({
        text: '',
        wordIdx: 0,
        isDeleting: false,
        isPaused: false,
    });

    useEffect(() => {
        const { text, wordIdx, isDeleting, isPaused } = state;
        const current = words[wordIdx];

        if (isPaused) {
            const t = setTimeout(
                () => setState(s => ({ ...s, isPaused: false, isDeleting: true })),
                pauseTime,
            );
            return () => clearTimeout(t);
        }

        if (!isDeleting) {
            if (text.length < current.length) {
                const t = setTimeout(
                    () => setState(s => ({ ...s, text: current.slice(0, s.text.length + 1) })),
                    typingSpeed,
                );
                return () => clearTimeout(t);
            }
            setState(s => ({ ...s, isPaused: true }));
        } else {
            if (text.length > 0) {
                const t = setTimeout(
                    () => setState(s => ({ ...s, text: s.text.slice(0, -1) })),
                    deletingSpeed,
                );
                return () => clearTimeout(t);
            }
            setState(s => ({
                ...s,
                isDeleting: false,
                wordIdx: (s.wordIdx + 1) % words.length,
            }));
        }
    }, [state, words, typingSpeed, deletingSpeed, pauseTime]);

    return state.text;
}

function useCountUp(target: number, duration = 1400, shouldStart = false) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!shouldStart) return;
        const startTime = Date.now();
        const timer = setInterval(() => {
            const progress = Math.min((Date.now() - startTime) / duration, 1);
            const eased = 1 - (1 - progress) ** 3;
            const next = Math.floor(eased * target);
            setCount(next);
            if (progress >= 1) {
                setCount(target);
                clearInterval(timer);
            }
        }, 16);
        return () => clearInterval(timer);
    }, [target, duration, shouldStart]);

    return count;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({
    value,
    suffix,
    label,
    shouldStart,
    darkMode,
}: {
    value: number;
    suffix: string;
    label: string;
    shouldStart: boolean;
    darkMode: boolean;
}) {
    const count = useCountUp(value, 1400, shouldStart);
    return (
        <div className="flex flex-col items-center gap-1">
            <span
                className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent tabular-nums"
            >
                {count}{suffix}
            </span>
            <span className={`text-xs md:text-sm font-medium tracking-wide ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {label}
            </span>
        </div>
    );
}

function SectionHeader({
    icon: Icon,
    title,
    gradient,
    darkMode,
}: {
    icon: React.ElementType;
    title: string;
    gradient: string;
    darkMode: boolean;
}) {
    return (
        <div className="flex items-center gap-4 mb-10">
            <div className="relative flex-shrink-0">
                <div className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-2xl blur opacity-70`} />
                <div className={`relative w-14 h-14 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <Icon size={26} className="text-white" />
                </div>
            </div>
            <h3 className={`text-3xl md:text-4xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {title}
            </h3>
        </div>
    );
}

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeInUp = {
    hidden: { opacity: 0, y: 44 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
};

const chipAnim = {
    hidden: { opacity: 0, scale: 0.82 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
};

const slideLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Static Data ──────────────────────────────────────────────────────────────

const ROLES = [
    'Python Backend Developer',
    'Data Engineer',
    'Docente de Desarrollo de Software',
];

const STATS = [
    { value: 5,   suffix: '+', label: 'años de experiencia' },
    { value: 120, suffix: '+', label: 'alumnos activos'     },
    { value: 30,  suffix: '+', label: 'tecnologías'          },
    { value: 2,   suffix: '',  label: 'proyectos live'      },
];

const SKILL_CATEGORIES = [
    {
        title: 'Backend',
        gradient: 'from-blue-500 to-cyan-500',
        chipClass: 'bg-blue-500/10 text-blue-300 border-blue-500/25 hover:bg-blue-500/20',
        skills: ['Python 3.11+', 'FastAPI', 'Flask', 'Django', 'SQLAlchemy', 'REST APIs', 'Async/Await'],
    },
    {
        title: 'Data & Bases de Datos',
        gradient: 'from-violet-500 to-purple-500',
        chipClass: 'bg-violet-500/10 text-violet-300 border-violet-500/25 hover:bg-violet-500/20',
        skills: ['PostgreSQL', 'Polars', 'Pandas', 'Pipelines ETL', 'Medallion Architecture', 'SQLite'],
    },
    {
        title: 'Cloud & DevOps',
        gradient: 'from-emerald-500 to-teal-500',
        chipClass: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25 hover:bg-emerald-500/20',
        skills: ['AWS S3', 'AWS Lambda', 'API Gateway', 'Docker', 'Terraform', 'GitHub Actions', 'CI/CD'],
    },
    {
        title: 'Geoespacial & AgTech',
        gradient: 'from-orange-500 to-amber-500',
        chipClass: 'bg-orange-500/10 text-orange-300 border-orange-500/25 hover:bg-orange-500/20',
        skills: ['Datos satelitales', 'NDVI', 'Polígonos KML', 'Series temporales', 'Procesamiento batch'],
    },
    {
        title: 'Frontend',
        gradient: 'from-pink-500 to-rose-500',
        chipClass: 'bg-pink-500/10 text-pink-300 border-pink-500/25 hover:bg-pink-500/20',
        skills: ['Next.js 14', 'React 19', 'TypeScript', 'Tailwind CSS', 'Vite'],
    },
    {
        title: 'Idiomas',
        gradient: 'from-slate-400 to-gray-500',
        chipClass: 'bg-slate-500/10 text-slate-300 border-slate-500/25 hover:bg-slate-500/20',
        skills: ['Español (Nativo)', 'Inglés Técnico'],
    },
];

// ─── Main Component ───────────────────────────────────────────────────────────

const CVWeb = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [darkMode, setDarkMode] = useState(true);
    const [scrolled, setScrolled] = useState(false);

    const role = useTypewriter(ROLES);

    const statsRef = useRef<HTMLDivElement>(null);
    const statsVisible = useInView(statsRef, { once: true, amount: 0.4 });

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleDownloadPDF = () => {
        const link = document.createElement('a');
        link.href = '/Matias_Javier_Lucero_CV.pdf';
        link.download = 'Matias_Javier_Lucero_CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormStatus('submitting');
        const form = e.currentTarget;
        const data = new URLSearchParams();
        for (const [k, v] of new FormData(form)) data.append(k, v as string);
        try {
            const res = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: data.toString(),
            });
            if (res.ok) {
                setFormStatus('success');
                form.reset();
                setTimeout(() => setFormStatus('idle'), 5000);
            } else {
                setFormStatus('error');
            }
        } catch {
            setFormStatus('error');
        }
    };

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
    };

    const dk = darkMode;
    const card = `${dk ? 'bg-gray-800/40 border-gray-700/50' : 'bg-white/80 border-gray-200'} backdrop-blur-xl border rounded-3xl shadow-2xl`;

    return (
        <div className={`min-h-screen ${dk ? 'bg-[#080810]' : 'bg-gradient-to-br from-gray-50 to-blue-50'} transition-all duration-500`}>

            {/* ── Background blobs ── */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none print:hidden">
                <div className="absolute top-20 left-10 w-[32rem] h-[32rem] bg-gradient-to-r from-blue-500/15 to-cyan-500/15 rounded-full blur-3xl animate-blob" />
                <div className="absolute top-60 right-10 w-[32rem] h-[32rem] bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-blob animation-delay-2000" />
                <div className="absolute bottom-20 left-1/3 w-[32rem] h-[32rem] bg-gradient-to-r from-indigo-500/15 to-blue-500/15 rounded-full blur-3xl animate-blob animation-delay-4000" />
            </div>

            {/* ── Navbar ── */}
            <nav className={`${dk ? 'bg-gray-900/80' : 'bg-white/80'} backdrop-blur-xl ${scrolled ? 'shadow-2xl' : 'shadow-md'} fixed w-full top-0 z-50 print:hidden transition-all duration-300 border-b ${dk ? 'border-gray-800' : 'border-gray-200'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className={`text-xl font-bold ${dk ? 'text-white' : 'text-gray-900'} flex items-center gap-3`}>
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-75" />
                                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                                    <Code className={`${scrolled ? 'rotate-180' : ''} transition-transform duration-500 text-white`} size={20} />
                                </div>
                            </div>
                            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                Matías Lucero
                            </span>
                        </div>

                        <div className="hidden md:flex items-center space-x-1">
                            {['perfil', 'experiencia', 'docencia', 'habilidades', 'proyectos', 'contacto'].map(s => (
                                <button
                                    key={s}
                                    onClick={() => scrollTo(s)}
                                    className={`${dk ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} px-3 py-2 rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-600/10 hover:to-purple-600/10 capitalize font-medium text-sm`}
                                >
                                    {s}
                                </button>
                            ))}
                            <button
                                onClick={() => setDarkMode(!dk)}
                                className={`ml-2 p-2 rounded-lg transition-all duration-200 ${dk ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
                            >
                                {dk ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-gray-700" />}
                            </button>
                            <button
                                onClick={handleDownloadPDF}
                                className={`ml-2 flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200 ${dk ? 'border-gray-600 text-gray-300 hover:bg-gray-800' : 'border-gray-400 text-gray-700 hover:bg-gray-100'}`}
                            >
                                <Download size={15} />
                                PDF
                            </button>
                        </div>

                        <div className="flex items-center gap-3 md:hidden">
                            <button onClick={() => setDarkMode(!dk)} className={`p-2 rounded-lg ${dk ? 'bg-gray-800' : 'bg-gray-100'}`}>
                                {dk ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} />}
                            </button>
                            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                                {mobileMenuOpen
                                    ? <X size={24} className={dk ? 'text-white' : 'text-gray-900'} />
                                    : <Menu size={24} className={dk ? 'text-white' : 'text-gray-900'} />
                                }
                            </button>
                        </div>
                    </div>
                </div>

                {mobileMenuOpen && (
                    <div className={`md:hidden ${dk ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-xl border-t ${dk ? 'border-gray-800' : 'border-gray-200'}`}>
                        <div className="px-4 py-3 space-y-2">
                            {['perfil', 'experiencia', 'docencia', 'habilidades', 'proyectos', 'contacto'].map(s => (
                                <button
                                    key={s}
                                    onClick={() => scrollTo(s)}
                                    className={`block w-full text-left ${dk ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'} px-3 py-2 rounded-lg capitalize`}
                                >
                                    {s}
                                </button>
                            ))}
                            <button
                                onClick={handleDownloadPDF}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium w-full justify-center ${dk ? 'border-gray-600 text-gray-300 hover:bg-gray-800' : 'border-gray-400 text-gray-700 hover:bg-gray-100'}`}
                            >
                                <Download size={15} /> Descargar PDF
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            {/* ── Hero ── */}
            <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Profile + Name */}
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-8">
                            <div className="relative group perspective flex-shrink-0">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-40 group-hover:opacity-65 transition-opacity duration-500" />
                                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-3xl [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] transition-all duration-700 cursor-pointer shadow-2xl">
                                    <div className="absolute inset-0 [backface-visibility:hidden] rounded-3xl overflow-hidden border-2 border-white/20">
                                        <img src="/matias-profile.png" alt="Matías Javier Lucero" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-3xl overflow-hidden border-2 border-white/20">
                                        <img src="/matias-profile-alt.png" alt="Matías Javier Lucero Alt" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 min-w-0">
                                <motion.h1
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.7, delay: 0.1 }}
                                    className="text-5xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight"
                                >
                                    Matías Javier Lucero
                                </motion.h1>

                                {/* Typewriter role */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="flex items-center gap-3 flex-wrap"
                                >
                                    <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border ${dk ? 'bg-gray-800/60 border-gray-700' : 'bg-white/80 border-gray-200'}`}>
                                        <Zap size={16} className="text-blue-400 flex-shrink-0" />
                                        <span className="text-base md:text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent min-w-[16ch]">
                                            {role}
                                            <span className="animate-blink">|</span>
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-600/10">
                                        <MapPin size={15} className="text-blue-400 flex-shrink-0" />
                                        <span className={`text-sm ${dk ? 'text-gray-400' : 'text-gray-600'}`}>Córdoba, Argentina</span>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* About blurb */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className={`${card} p-7 mb-8`}
                        >
                            <p className={`text-lg ${dk ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                                <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">5+ años</span>{' '}
                                de experiencia en desarrollo Backend con Python. Especializado en{' '}
                                <span className="font-semibold text-blue-400">APIs REST</span>,{' '}
                                <span className="font-semibold text-purple-400">pipelines de datos</span> y{' '}
                                <span className="font-semibold text-pink-400">procesamiento geoespacial</span>{' '}
                                en el sector AgTech.
                            </p>
                        </motion.div>

                        {/* CTA buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.45 }}
                            className="flex flex-wrap gap-3 mb-10"
                        >
                            <a href="https://github.com/matiasjavierlucero" target="_blank" rel="noopener noreferrer"
                                className="group flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 border border-gray-700">
                                <Github size={20} className="text-white group-hover:rotate-12 transition-transform" />
                                <span className="text-white font-semibold">GitHub</span>
                            </a>
                            <a href="https://www.linkedin.com/in/matiasjavierlucero/" target="_blank" rel="noopener noreferrer"
                                className="group flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1">
                                <Linkedin size={20} className="text-white group-hover:rotate-12 transition-transform" />
                                <span className="text-white font-semibold">LinkedIn</span>
                            </a>
                            <a href="mailto:matiasjavierlucero@gmail.com"
                                className="group flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1">
                                <Mail size={20} className="text-white group-hover:rotate-12 transition-transform" />
                                <span className="text-white font-semibold">Email</span>
                            </a>
                            <button
                                onClick={handleDownloadPDF}
                                className={`group flex items-center gap-2.5 px-6 py-3 rounded-xl transition-all duration-300 shadow hover:-translate-y-1 border font-semibold ${dk ? 'border-gray-600 text-gray-300 hover:bg-gray-800' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                            >
                                <Download size={20} className="group-hover:-translate-y-0.5 transition-transform" />
                                Descargar CV
                            </button>
                        </motion.div>

                        {/* ── Stats Strip ── */}
                        <motion.div
                            ref={statsRef}
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.55, duration: 0.6 }}
                            className={`${card} px-8 py-7`}
                        >
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-y md:divide-y-0 ${dk ? 'divide-gray-700/60' : 'divide-gray-200'}">
                                {STATS.map((s, i) => (
                                    <StatCard key={i} {...s} shouldStart={statsVisible} darkMode={dk} />
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ── Sections ── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24 relative z-10">

                {/* Perfil */}
                <motion.section id="perfil" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>
                    <SectionHeader icon={Users} title="Perfil Profesional" gradient="from-blue-600 to-cyan-600" darkMode={dk} />
                    <div className={`${card} p-9 hover:-translate-y-1 transition-all duration-300`}>
                        <p className={`${dk ? 'text-gray-300' : 'text-gray-700'} leading-relaxed text-lg`}>
                            Desarrollador Backend con foco en Data Engineering, experto en ecosistemas Python (3.11+) y bases de datos (PostgreSQL).
                            Actualmente en Kilimo, centralizo el procesamiento de información climática y geoespacial diseñando pipelines bajo
                            arquitecturas Data Lake (Bronze/Silver/Gold). Aporto valor diferencial mediante la orquestación de infraestructura cloud
                            en AWS (Lambda, S3) usando Terraform y la creación de flujos CI/CD robustos. Mi rol como docente activo desde 2021
                            consolida mis habilidades de comunicación y pensamiento estructurado.
                        </p>
                    </div>
                </motion.section>

                {/* Experiencia */}
                <motion.section id="experiencia" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
                    <SectionHeader icon={Briefcase} title="Experiencia Profesional" gradient="from-purple-600 to-pink-600" darkMode={dk} />

                    <div className="relative">
                        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-purple-600 to-pink-600 hidden md:block" />

                        <motion.div className="space-y-8" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>

                            {/* Kilimo */}
                            <motion.div variants={slideLeft} className="relative">
                                <div className="absolute left-6 top-8 w-5 h-5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full border-4 border-[#080810] hidden md:block animate-pulse" />
                                <div className={`md:ml-20 ${card} p-8 hover:-translate-y-1 transition-all duration-300 group`}>
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3 flex-wrap">
                                                <div className="w-11 h-11 overflow-hidden bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform p-1 border border-gray-200">
                                                    <img src="/kilimo-icon.png" alt="Kilimo Logo" className="w-full h-full object-contain" />
                                                </div>
                                                <a href="https://www.kilimo.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                                                    <h4 className={`text-2xl font-bold ${dk ? 'text-white' : 'text-gray-900'}`}>Kilimo</h4>
                                                </a>
                                                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold border border-green-500/30">Actual</span>
                                            </div>
                                            <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-bold text-lg mb-2">
                                                Python Backend Developer / Data Engineer
                                            </p>
                                            <div className={`flex items-center gap-2 ${dk ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                                                <Calendar size={14} />
                                                <span>Nov 2021 — Actualidad</span>
                                                <span className="mx-1">·</span>
                                                <TrendingUp size={14} className="text-green-400" />
                                                <span className="text-green-400 font-semibold">4+ años</span>
                                            </div>
                                        </div>
                                    </div>

                                    <p className={`${dk ? 'text-gray-300' : 'text-gray-700'} mb-6 leading-relaxed`}>
                                        Desarrollo y mantenimiento de servicios backend en entornos productivos del sector AgTech,
                                        con foco en integración y procesamiento de datos agronómicos, climáticos y satelitales.
                                    </p>

                                    <div className={`grid md:grid-cols-2 gap-3 ${dk ? 'text-gray-300' : 'text-gray-700'} mb-6 text-sm`}>
                                        {[
                                            'Desarrollo y mantenimiento de servicios backend en Python',
                                            'Diseño y mantenimiento de pipelines de datos',
                                            'Desarrollo de APIs REST',
                                            'Procesamiento batch y asincrónico',
                                            'Manipulación de datos geoespaciales (NDVI, series temporales)',
                                            'Uso intensivo de AWS (S3, Lambda, API Gateway)',
                                            'Code reviews, refactors y mejora continua',
                                            'Participación en decisiones de arquitectura',
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-start gap-2.5 group-hover:translate-x-1 transition-transform duration-200">
                                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex-shrink-0" />
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {['Python', 'FastAPI', 'Flask', 'Django', 'SQLAlchemy', 'PostgreSQL', 'Docker', 'AWS', 'REST APIs'].map(t => (
                                            <span key={t} className="px-3 py-1.5 bg-blue-600/15 text-blue-300 rounded-lg text-xs font-semibold border border-blue-500/25 hover:scale-105 transition-transform cursor-default">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Comprando en Grupo */}
                            <motion.div variants={slideLeft} className="relative">
                                <div className="absolute left-6 top-8 w-5 h-5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full border-4 border-[#080810] hidden md:block" />
                                <div className={`md:ml-20 ${card} p-8 hover:-translate-y-1 transition-all duration-300 group`}>
                                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                                        <div className="w-11 h-11 overflow-hidden bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform p-2 border border-gray-200">
                                            <img src="/ceg-logo.png" alt="Comprando en Grupo Logo" className="w-full h-full object-contain" />
                                        </div>
                                        <a href="https://comprandoengrupo.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                                            <h4 className={`text-2xl font-bold ${dk ? 'text-white' : 'text-gray-900'}`}>Comprando en Grupo</h4>
                                        </a>
                                    </div>
                                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 font-bold text-lg mb-2">
                                        Python Backend Developer
                                    </p>
                                    <div className={`flex items-center gap-2 ${dk ? 'text-gray-400' : 'text-gray-600'} text-sm mb-5`}>
                                        <Calendar size={14} />
                                        <span>May 2021 — Nov 2021</span>
                                        <span className="mx-1">·</span>
                                        <span>6 meses</span>
                                    </div>
                                    <div className={`grid gap-2.5 ${dk ? 'text-gray-300' : 'text-gray-700'} text-sm`}>
                                        {[
                                            'Desarrollo de APIs backend para plataforma e-commerce B2B',
                                            'Implementación de lógica de negocio',
                                            'Persistencia de datos en bases relacionales',
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-start gap-2.5 group-hover:translate-x-1 transition-transform duration-200">
                                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex-shrink-0" />
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                        </motion.div>
                    </div>
                </motion.section>

                {/* Docencia */}
                <motion.section id="docencia" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>
                    <SectionHeader icon={GraduationCap} title="Experiencia Docente" gradient="from-indigo-600 to-blue-600" darkMode={dk} />
                    <div className={`${card} p-8 hover:-translate-y-1 transition-all duration-300 group`}>
                        <div className="flex items-center gap-3 mb-4 flex-wrap">
                            <div className="w-11 h-11 bg-gradient-to-br from-indigo-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <BookOpen size={22} className="text-white" />
                            </div>
                            <h4 className={`text-2xl font-bold ${dk ? 'text-white' : 'text-gray-900'}`}>Instituto Tecnológico Río Cuarto</h4>
                            <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-xs font-semibold border border-indigo-500/30">Actual</span>
                        </div>
                        <p className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400 font-bold text-lg mb-2">
                            Profesor — Tecnicatura Superior en Desarrollo de Software
                        </p>
                        <div className={`flex items-center gap-2 ${dk ? 'text-gray-400' : 'text-gray-600'} text-sm mb-6`}>
                            <Calendar size={14} />
                            <span>Mar 2021 — Actualidad</span>
                            <span className="mx-1">·</span>
                            <Users size={14} className="text-indigo-400" />
                            <span className="text-indigo-400 font-semibold">~120 alumnos activos</span>
                        </div>
                        <p className={`${dk ? 'text-gray-300' : 'text-gray-700'} mb-5 leading-relaxed`}>
                            Docente de programación en Python con aproximadamente 120 alumnos activos, enfocado en la
                            preparación de futuros desarrolladores para el mundo laboral.
                        </p>
                        <div className={`grid md:grid-cols-2 gap-2.5 ${dk ? 'text-gray-300' : 'text-gray-700'} text-sm`}>
                            {[
                                'Enseñanza de fundamentos de programación',
                                'Programación orientada a objetos',
                                'Desarrollo Backend con Python',
                                'Buenas prácticas y lógica de programación',
                                'Diseño de trabajos prácticos y evaluaciones',
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-2.5 group-hover:translate-x-1 transition-transform duration-200">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 flex-shrink-0" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* ── Habilidades — rediseñada ── */}
                <motion.section id="habilidades" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
                    <SectionHeader icon={Layers} title="Habilidades Técnicas" gradient="from-teal-600 to-cyan-600" darkMode={dk} />

                    <motion.div
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        {SKILL_CATEGORIES.map((cat) => (
                            <motion.div
                                key={cat.title}
                                variants={chipAnim}
                                className={`${card} p-6 hover:-translate-y-1.5 transition-all duration-300 group`}
                            >
                                {/* Category header */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="relative flex-shrink-0">
                                        <div className={`absolute inset-0 bg-gradient-to-r ${cat.gradient} rounded-xl blur opacity-50 group-hover:opacity-80 transition-opacity`} />
                                        <div className={`relative w-2.5 h-10 bg-gradient-to-b ${cat.gradient} rounded-full`} />
                                    </div>
                                    <h4 className={`font-bold ${dk ? 'text-white' : 'text-gray-900'} text-base`}>{cat.title}</h4>
                                </div>

                                {/* Chip grid */}
                                <motion.div
                                    className="flex flex-wrap gap-2"
                                    variants={stagger}
                                >
                                    {cat.skills.map(skill => (
                                        <motion.span
                                            key={skill}
                                            variants={chipAnim}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border cursor-default transition-all duration-200 ${cat.chipClass}`}
                                        >
                                            {skill}
                                        </motion.span>
                                    ))}
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.section>

                {/* Proyectos */}
                <motion.section id="proyectos" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
                    <SectionHeader icon={Rocket} title="Proyectos Personales" gradient="from-emerald-600 to-teal-600" darkMode={dk} />

                    <div className={`${card} p-8 hover:-translate-y-1 transition-all duration-300 group`}>
                        <div className="flex flex-col md:flex-row md:items-start gap-6">
                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg border border-white/10 group-hover:scale-110 transition-transform">
                                    <img src="https://tasajusta.vercel.app/icon.svg" alt="TasaJusta" className="w-full h-full object-cover" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-3 mb-3">
                                    <a href="https://tasajusta.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                                        <h4 className={`text-2xl font-bold ${dk ? 'text-white' : 'text-gray-900'}`}>TasaJusta</h4>
                                    </a>
                                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-semibold border border-emerald-500/30 flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                        En producción
                                    </span>
                                </div>
                                <p className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 font-bold text-lg mb-3">
                                    Inteligencia de precios para el mercado de autos usados argentino
                                </p>
                                <p className={`${dk ? 'text-gray-300' : 'text-gray-700'} leading-relaxed mb-5 text-sm`}>
                                    Estima el precio justo de cualquier auto usado en Argentina usando un modelo ML entrenado sobre publicaciones reales,
                                    detecta oportunidades de compra (publicaciones más de 10% por debajo del mercado) y cruza los precios con el dólar blue.
                                </p>

                                {/* ETL Pipeline Animation */}
                                <div className="mb-5">
                                    <PixelETL />
                                </div>
                                <div className={`grid md:grid-cols-2 gap-2.5 ${dk ? 'text-gray-300' : 'text-gray-700'} mb-5 text-sm`}>
                                    {[
                                        'Modelo LightGBM entrenado sobre publicaciones reales de DeRuedas',
                                        'Detector de oportunidades con scoring de anomalías de precio',
                                        'Pipeline ETL semanal automatizado con GitHub Actions',
                                        'Arquitectura medallion (Bronze → Silver → Gold) en AWS S3',
                                        'API FastAPI deployada en AWS Lambda + API Gateway (Terraform)',
                                        'Frontend Next.js 14 en Vercel con SSR y streaming',
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-2.5 group-hover:translate-x-1 transition-transform duration-200">
                                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex-shrink-0" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-wrap gap-2 mb-5">
                                    {['Python', 'FastAPI', 'LightGBM', 'Next.js 14', 'AWS Lambda', 'AWS S3', 'Terraform', 'GitHub Actions', 'Polars', 'Docker'].map(t => (
                                        <span key={t} className="px-3 py-1.5 bg-emerald-600/15 text-emerald-300 rounded-lg text-xs font-semibold border border-emerald-500/25 hover:scale-105 transition-transform cursor-default">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    <a href="https://tasajusta.vercel.app/" target="_blank" rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:-translate-y-0.5 text-sm">
                                        <Globe size={15} />
                                        Ver demo en vivo
                                    </a>
                                    <a href="https://github.com/matiasjavierlucero/tasajusta" target="_blank" rel="noopener noreferrer"
                                        className={`flex items-center gap-2 px-5 py-2.5 font-semibold rounded-xl transition-all duration-300 shadow hover:-translate-y-0.5 text-sm border ${dk ? 'bg-gray-700/60 hover:bg-gray-700 text-white border-gray-600' : 'bg-gray-100 hover:bg-gray-200 text-gray-900 border-gray-200'}`}>
                                        <Github size={15} />
                                        Código en GitHub
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Educación */}
                <motion.section id="educacion" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                    <SectionHeader icon={GraduationCap} title="Educación" gradient="from-red-600 to-pink-600" darkMode={dk} />
                    <div className={`${card} p-9 hover:-translate-y-1 transition-all duration-300`}>
                        <div className="flex items-start gap-4">
                            <div className="relative flex-shrink-0">
                                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 rounded-xl blur opacity-60" />
                                <div className="relative w-12 h-12 bg-gradient-to-br from-red-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <Award size={22} className="text-white" />
                                </div>
                            </div>
                            <div>
                                <h4 className={`text-2xl font-bold ${dk ? 'text-white' : 'text-gray-900'} mb-1`}>
                                    Técnico Superior en Desarrollo de Software
                                </h4>
                                <p className={`${dk ? 'text-gray-400' : 'text-gray-600'} text-base`}>Instituto Tecnológico Río Cuarto</p>
                                <p className={`${dk ? 'text-gray-500' : 'text-gray-500'} text-sm mt-1`}>2017 — 2020</p>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Contacto */}
                <motion.section id="contacto" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
                    <SectionHeader icon={Mail} title="Contacto" gradient="from-blue-600 to-purple-600" darkMode={dk} />

                    <div className={`${card} p-8 md:p-12`}>
                        <div className="grid lg:grid-cols-2 gap-12">
                            <div>
                                <h4 className={`text-2xl font-bold ${dk ? 'text-white' : 'text-gray-900'} mb-4`}>¿Hablamos?</h4>
                                <p className={`${dk ? 'text-gray-300' : 'text-gray-700'} text-base mb-8 leading-relaxed`}>
                                    Estoy abierto a nuevas oportunidades, colaboraciones en proyectos de
                                    Data Engineering o Backend con Python, y desafíos en el sector AgTech.
                                </p>
                                <div className="space-y-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-11 h-11 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20">
                                            <Mail className="text-blue-400" size={20} />
                                        </div>
                                        <div>
                                            <p className={`text-xs ${dk ? 'text-gray-400' : 'text-gray-500'} mb-0.5`}>Email</p>
                                            <p className={`font-semibold ${dk ? 'text-white' : 'text-gray-900'} text-sm`}>matiasjavierlucero@gmail.com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-11 h-11 bg-purple-500/10 rounded-xl flex items-center justify-center border border-purple-500/20">
                                            <MapPin className="text-purple-400" size={20} />
                                        </div>
                                        <div>
                                            <p className={`text-xs ${dk ? 'text-gray-400' : 'text-gray-500'} mb-0.5`}>Ubicación</p>
                                            <p className={`font-semibold ${dk ? 'text-white' : 'text-gray-900'} text-sm`}>Córdoba, Argentina</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <form name="contacto" onSubmit={handleSubmit} className="space-y-4">
                                <input type="hidden" name="form-name" value="contacto" />
                                {formStatus === 'success' && (
                                    <div className="p-4 bg-green-500/15 border border-green-500/40 text-green-400 rounded-xl text-sm">
                                        ¡Mensaje enviado con éxito! Me pondré en contacto pronto.
                                    </div>
                                )}
                                {formStatus === 'error' && (
                                    <div className="p-4 bg-red-500/15 border border-red-500/40 text-red-400 rounded-xl text-sm">
                                        Hubo un error. Por favor, enviame un mail directo.
                                    </div>
                                )}
                                <div className="grid md:grid-cols-2 gap-4">
                                    {[
                                        { id: 'name', label: 'Nombre', type: 'text', placeholder: 'Tu nombre' },
                                        { id: 'email', label: 'Email', type: 'email', placeholder: 'tu@email.com' },
                                    ].map(f => (
                                        <div key={f.id} className="space-y-1.5">
                                            <label htmlFor={f.id} className={`text-xs font-medium ${dk ? 'text-gray-300' : 'text-gray-700'}`}>{f.label}</label>
                                            <input
                                                type={f.type} id={f.id} name={f.id} required
                                                placeholder={f.placeholder}
                                                className={`w-full px-4 py-3 rounded-xl border text-sm ${dk ? 'bg-gray-900/50 border-gray-700 text-white focus:border-blue-500' : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500'} outline-none transition-all duration-200`}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-1.5">
                                    <label htmlFor="subject" className={`text-xs font-medium ${dk ? 'text-gray-300' : 'text-gray-700'}`}>Asunto</label>
                                    <input
                                        type="text" id="subject" name="subject" required
                                        placeholder="Motivo de contacto"
                                        className={`w-full px-4 py-3 rounded-xl border text-sm ${dk ? 'bg-gray-900/50 border-gray-700 text-white focus:border-blue-500' : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500'} outline-none transition-all duration-200`}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label htmlFor="message" className={`text-xs font-medium ${dk ? 'text-gray-300' : 'text-gray-700'}`}>Mensaje</label>
                                    <textarea
                                        id="message" name="message" rows={4} required
                                        placeholder="Cuéntame sobre tu proyecto..."
                                        className={`w-full px-4 py-3 rounded-xl border text-sm ${dk ? 'bg-gray-900/50 border-gray-700 text-white focus:border-blue-500' : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500'} outline-none transition-all duration-200 resize-none`}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={formStatus === 'submitting'}
                                    className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                >
                                    {formStatus === 'submitting' ? 'Enviando...' : 'Enviar Mensaje'}
                                </button>
                            </form>
                        </div>
                    </div>
                </motion.section>
            </div>

            {/* ── Footer ── */}
            <footer className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-14 mt-28 print:hidden overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/8 via-purple-600/8 to-pink-600/8" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h3 className="text-2xl font-extrabold mb-1 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Matías Javier Lucero
                    </h3>
                    <p className="text-gray-400 text-sm mb-6">Python Backend Developer / Data Engineer</p>
                    <div className="flex justify-center gap-4 mb-8">
                        {[
                            { href: 'https://github.com/matiasjavierlucero', icon: Github },
                            { href: 'https://www.linkedin.com/in/matiasjavierlucero/', icon: Linkedin },
                            { href: 'mailto:matiasjavierlucero@gmail.com', icon: Mail },
                        ].map(({ href, icon: Icon }) => (
                            <a key={href} href={href} target={href.startsWith('http') ? '_blank' : undefined}
                                rel="noopener noreferrer"
                                className="p-3.5 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-110 shadow-lg">
                                <Icon size={20} />
                            </a>
                        ))}
                    </div>
                    <p className="text-gray-500 text-xs">© 2026 · mjlucero.com · All rights reserved.</p>
                </div>
            </footer>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        * { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }

        .perspective { perspective: 1000px; }

        @keyframes blob {
          0%, 100% { transform: translate(0,0) scale(1); }
          25%       { transform: translate(20px,-50px) scale(1.1); }
          50%       { transform: translate(-20px,20px) scale(0.9); }
          75%       { transform: translate(50px,50px) scale(1.05); }
        }
        .animate-blob          { animation: blob 22s infinite; }
        .animation-delay-2000  { animation-delay: 2s; }
        .animation-delay-4000  { animation-delay: 4s; }

        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        .animate-blink { animation: blink 1s step-end infinite; margin-left: 1px; }

        html { scroll-behavior: smooth; }

        @media print {
          body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
          .print\\:hidden { display: none !important; }
          section { page-break-inside: avoid; }
        }
      `}</style>
        </div>
    );
};

export default CVWeb;
