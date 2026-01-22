import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Download, Menu, X, Sun, Moon, Briefcase, GraduationCap, Code, Database, Cloud, Globe, Users, BookOpen, Award, MapPin, Calendar, Sparkles, Zap, TrendingUp, Rocket } from 'lucide-react';

const CVWeb = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(true);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleDownloadPDF = () => {
        const link = document.createElement('a');
        link.href = '/Matias_Javier_Lucero_CV.pdf';
        link.download = 'Matias_Javier_Lucero_CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setMobileMenuOpen(false);
        }
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-[#0a0a0f]' : 'bg-gradient-to-br from-gray-50 to-blue-50'} transition-all duration-500`}>
            {/* Animated Background Blobs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none print:hidden">
                <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-blob" />
                <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
                <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-full blur-3xl animate-blob animation-delay-4000" />
            </div>

            {/* Header/Navigation */}
            <nav className={`${darkMode ? 'bg-gray-900/80' : 'bg-white/80'} backdrop-blur-xl ${scrolled ? 'shadow-2xl' : 'shadow-lg'} fixed w-full top-0 z-50 print:hidden transition-all duration-300 border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} flex items-center gap-3`}>
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-75" />
                                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                                    <Code className={`${scrolled ? 'rotate-180' : ''} transition-transform duration-500 text-white`} size={20} />
                                </div>
                            </div>
                            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Matías Lucero</span>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-6">
                            {['perfil', 'experiencia', 'docencia', 'habilidades', 'contacto'].map((section) => (
                                <button
                                    key={section}
                                    onClick={() => scrollToSection(section)}
                                    className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} px-3 py-2 rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-600/10 hover:to-purple-600/10 capitalize font-medium`}
                                >
                                    {section}
                                </button>
                            ))}
                            <button onClick={toggleDarkMode} className={`p-2 rounded-lg transition-all duration-200 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
                                {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-700" />}
                            </button>
                            <button onClick={handleDownloadPDF} className={`flex items-center gap-2 px-5 py-2 rounded-md transition-all duration-200 border ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-800' : 'border-gray-400 text-gray-700 hover:bg-gray-100'} font-medium text-sm`}>
                                <Download size={16} />
                                Descargar PDF
                            </button>
                        </div>

                        {/* Mobile menu button */}
                        <div className="flex items-center gap-3 md:hidden">
                            <button onClick={toggleDarkMode} className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                                {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
                            </button>
                            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                                {mobileMenuOpen ? <X size={24} className={darkMode ? 'text-white' : 'text-gray-900'} /> : <Menu size={24} className={darkMode ? 'text-white' : 'text-gray-900'} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className={`md:hidden ${darkMode ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-xl border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                        <div className="px-4 py-3 space-y-3">
                            {['perfil', 'experiencia', 'docencia', 'habilidades', 'contacto'].map((section) => (
                                <button
                                    key={section}
                                    onClick={() => scrollToSection(section)}
                                    className={`block w-full text-left ${darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'} px-3 py-2 rounded-lg transition-all duration-200 capitalize`}
                                >
                                    {section}
                                </button>
                            ))}
                            <button onClick={handleDownloadPDF} className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 border ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-800' : 'border-gray-400 text-gray-700 hover:bg-gray-100'} font-medium w-full justify-center`}>
                                <Download size={16} />
                                Descargar PDF
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="animate-fadeIn">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-8">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity" />
                                <div className="relative w-32 h-32 md:w-40 md:h-40 overflow-hidden rounded-3xl bg-gray-800 border-2 border-white/20 shadow-2xl transform transition-all duration-500 group-hover:scale-105">
                                    <img
                                        src="/matias-profile.png"
                                        alt="Matías Javier Lucero"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <div className="flex-1">
                                <h1 className={`text-5xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight`}>
                                    Matías Javier Lucero
                                </h1>
                                <div className="flex flex-wrap items-center gap-3">
                                    <div className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-full border border-blue-500/30">
                                        <Sparkles size={20} className="text-blue-400" />
                                        <h2 className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                            Python Backend Developer
                                        </h2>
                                    </div>
                                    <div className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-full border border-purple-500/30">
                                        <Zap size={20} className="text-purple-400" />
                                        <h2 className="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                            Data Engineer
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`${darkMode ? 'bg-gray-800/40' : 'bg-white/80'} backdrop-blur-xl border ${darkMode ? 'border-gray-700/50' : 'border-gray-200'} p-8 rounded-3xl shadow-2xl mb-8 hover:shadow-3xl transition-all duration-300`}>
                            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                                <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">5+ años</span> de experiencia en desarrollo Backend con Python.
                                Especializado en <span className="font-semibold text-blue-400">APIs REST</span>, <span className="font-semibold text-purple-400">pipelines de datos</span> y
                                <span className="font-semibold text-pink-400"> procesamiento geoespacial</span> en el sector AgTech.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4 mb-6">
                            <a href="https://github.com/matiasjavierlucero" target="_blank" rel="noopener noreferrer"
                                className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 border border-gray-700">
                                <Github size={22} className="text-white group-hover:rotate-12 transition-transform" />
                                <span className="text-white font-semibold">GitHub</span>
                            </a>
                            <a href="https://www.linkedin.com/in/matiasjavierlucero/" target="_blank" rel="noopener noreferrer"
                                className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1">
                                <Linkedin size={22} className="text-white group-hover:rotate-12 transition-transform" />
                                <span className="text-white font-semibold">LinkedIn</span>
                            </a>
                            <a href="mailto:matiasjavierlucero@gmail.com"
                                className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1">
                                <Mail size={22} className="text-white group-hover:rotate-12 transition-transform" />
                                <span className="text-white font-semibold">Email</span>
                            </a>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm rounded-full border border-blue-500/20">
                                <MapPin size={18} className="text-blue-400" />
                                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Alcira Gigena, Córdoba, Argentina</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24 relative z-10">

                {/* Perfil Section */}
                <section id="perfil" className="animate-fadeInUp">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-75" />
                            <div className="relative w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <Users size={28} className="text-white" />
                            </div>
                        </div>
                        <h3 className={`text-4xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Perfil Profesional</h3>
                    </div>
                    <div className={`${darkMode ? 'bg-gray-800/40' : 'bg-white/80'} backdrop-blur-xl p-10 rounded-3xl shadow-2xl ${darkMode ? 'border-gray-700/50' : 'border-gray-200'} border transition-all duration-300 hover:shadow-3xl hover:-translate-y-1`}>
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed text-lg`}>
                            Desarrollador Backend con experiencia sólida en Python, desarrollo de APIs REST, diseño de pipelines de datos
                            y procesamiento de información geoespacial. Actualmente trabajando en Kilimo (AgTech), donde desarrollo y mantengo
                            servicios backend para integración de datos agronómicos, climáticos y satelitales. Complemento mi perfil técnico
                            con experiencia docente activa desde 2021, formando desarrolladores en Python, lo que refuerza mis habilidades
                            de comunicación, mentoring y pensamiento estructurado.
                        </p>
                    </div>
                </section>

                {/* Experiencia Section con Timeline */}
                <section id="experiencia" className="animate-fadeInUp">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-75" />
                            <div className="relative w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <Briefcase size={28} className="text-white" />
                            </div>
                        </div>
                        <h3 className={`text-4xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Experiencia Profesional</h3>
                    </div>

                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-purple-600 to-pink-600 hidden md:block" />

                        <div className="space-y-8">
                            {/* Kilimo */}
                            <div className="relative">
                                <div className="absolute left-6 top-8 w-5 h-5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full border-4 border-[#0a0a0f] hidden md:block animate-pulse" />
                                <div className={`md:ml-20 ${darkMode ? 'bg-gray-800/40' : 'bg-white/80'} backdrop-blur-xl p-8 rounded-3xl shadow-2xl ${darkMode ? 'border-gray-700/50' : 'border-gray-200'} border transition-all duration-300 hover:shadow-3xl hover:-translate-y-1 group`}>
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-12 h-12 overflow-hidden bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform p-1 border border-gray-200">
                                                    <img
                                                        src="/kilimo-icon.png"
                                                        alt="Kilimo Logo"
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>
                                                <a href="https://www.kilimo.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                                                    <h4 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Kilimo</h4>
                                                </a>
                                                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold border border-green-500/30">Actual</span>
                                            </div>
                                            <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-bold text-xl mb-2">Python Backend Developer / Data Engineer</p>
                                            <div className={`flex items-center gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                                                <Calendar size={16} />
                                                <span>Nov 2021 - Actualidad</span>
                                                <span className="mx-2">•</span>
                                                <TrendingUp size={16} className="text-green-400" />
                                                <span className="text-green-400 font-semibold">4+ años</span>
                                            </div>
                                        </div>
                                    </div>

                                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-6 leading-relaxed text-lg`}>
                                        Desarrollo y mantenimiento de servicios backend en entornos productivos del sector AgTech,
                                        con foco en integración y procesamiento de datos agronómicos, climáticos y satelitales.
                                    </p>

                                    <div className={`grid md:grid-cols-2 gap-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-6`}>
                                        {[
                                            'Desarrollo y mantenimiento de servicios backend en Python',
                                            'Diseño y mantenimiento de pipelines de datos',
                                            'Desarrollo de APIs REST',
                                            'Procesamiento batch y asincrónico',
                                            'Manipulación de datos geoespaciales (polígonos, índices de vegetación, series temporales)',
                                            'Uso intensivo de AWS (especialmente S3)',
                                            'Code reviews, refactors y mejora continua',
                                            'Participación en decisiones de arquitectura'
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex items-start gap-3 group-hover:translate-x-1 transition-transform duration-200">
                                                <div className="mt-1.5 w-2 h-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex-shrink-0" />
                                                <p>{item}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {['Python', 'FastAPI', 'Flask', 'Django', 'SQLAlchemy', 'PostgreSQL', 'Docker', 'AWS', 'REST APIs'].map(tech => (
                                            <span key={tech} className="px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105 cursor-default border border-blue-500/30">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Comprando en Grupo */}
                            <div className="relative">
                                <div className="absolute left-6 top-8 w-5 h-5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full border-4 border-[#0a0a0f] hidden md:block" />
                                <div className={`md:ml-20 ${darkMode ? 'bg-gray-800/40' : 'bg-white/80'} backdrop-blur-xl p-8 rounded-3xl shadow-2xl ${darkMode ? 'border-gray-700/50' : 'border-gray-200'} border transition-all duration-300 hover:shadow-3xl hover:-translate-y-1 group`}>
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-12 h-12 overflow-hidden bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform p-2 border border-gray-200">
                                                    <img
                                                        src="/ceg-logo.png"
                                                        alt="Comprando en Grupo Logo"
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>
                                                <a href="https://comprandoengrupo.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                                                    <h4 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Comprando en Grupo</h4>
                                                </a>
                                            </div>
                                            <p className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 font-bold text-xl mb-2">Python Backend Developer</p>
                                            <div className={`flex items-center gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                                                <Calendar size={16} />
                                                <span>May 2021 - Nov 2021</span>
                                                <span className="mx-2">•</span>
                                                <span>6 meses</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`grid gap-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        {[
                                            'Desarrollo de APIs backend',
                                            'Implementación de lógica de negocio',
                                            'Persistencia de datos en bases relacionales'
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex items-start gap-3 group-hover:translate-x-1 transition-transform duration-200">
                                                <div className="mt-1.5 w-2 h-2 rounded-full bg-gradient-to-r from-orange-600 to-red-600 flex-shrink-0" />
                                                <p>{item}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Docencia Section */}
                <section id="docencia" className="animate-fadeInUp">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl blur opacity-75" />
                            <div className="relative w-14 h-14 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <GraduationCap size={28} className="text-white" />
                            </div>
                        </div>
                        <h3 className={`text-4xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Experiencia Docente</h3>
                    </div>

                    <div className={`${darkMode ? 'bg-gray-800/40' : 'bg-white/80'} backdrop-blur-xl p-10 rounded-3xl shadow-2xl ${darkMode ? 'border-gray-700/50' : 'border-gray-200'} border transition-all duration-300 hover:shadow-3xl hover:-translate-y-1 group`}>
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                        <BookOpen size={24} className="text-white" />
                                    </div>
                                    <h4 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Instituto Tecnológico Río Cuarto</h4>
                                    <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-sm font-semibold border border-indigo-500/30">Actual</span>
                                </div>
                                <p className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400 font-bold text-xl mb-2">Profesor - Tecnicatura Superior en Desarrollo de Software</p>
                                <div className={`flex items-center gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                                    <Calendar size={16} />
                                    <span>Mar 2021 - Actualidad</span>
                                    <span className="mx-2">•</span>
                                    <Users size={16} className="text-indigo-400" />
                                    <span className="text-indigo-400 font-semibold">~120 alumnos activos</span>
                                </div>
                            </div>
                        </div>

                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-6 leading-relaxed text-lg`}>
                            Docente de programación en Python con aproximadamente 120 alumnos activos, enfocado en la
                            preparación de futuros desarrolladores para el mundo laboral.
                        </p>

                        <div className={`grid md:grid-cols-2 gap-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {[
                                'Enseñanza de fundamentos de programación',
                                'Programación orientada a objetos',
                                'Desarrollo Backend con Python',
                                'Buenas prácticas y lógica de programación',
                                'Diseño de trabajos prácticos y evaluaciones'
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-start gap-3 group-hover:translate-x-1 transition-transform duration-200">
                                    <div className="mt-1.5 w-2 h-2 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 flex-shrink-0" />
                                    <p>{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Habilidades Section */}
                <section id="habilidades" className="animate-fadeInUp">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl blur opacity-75" />
                            <div className="relative w-14 h-14 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <Award size={28} className="text-white" />
                            </div>
                        </div>
                        <h3 className={`text-4xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Habilidades Técnicas</h3>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: 'Lenguajes', icon: Code, content: 'Python (Avanzado)', gradient: 'from-yellow-500 to-orange-600', iconColor: 'text-yellow-400' },
                            { title: 'Backend & Frameworks', icon: Database, content: 'FastAPI, Flask, Django', gradient: 'from-green-500 to-emerald-600', iconColor: 'text-green-400' },
                            { title: 'Datos & Persistencia', icon: Database, content: 'PostgreSQL, SQLAlchemy, Pipelines de datos', gradient: 'from-blue-500 to-cyan-600', iconColor: 'text-blue-400' },
                            { title: 'Cloud & DevOps', icon: Cloud, content: 'Docker, AWS (S3), Git/GitHub', gradient: 'from-purple-500 to-indigo-600', iconColor: 'text-purple-400' },
                            { title: 'Otras Competencias', icon: Rocket, content: 'APIs REST, Refactorización, Trabajo colaborativo, Pensamiento orientado a producto', gradient: 'from-pink-500 to-rose-600', iconColor: 'text-pink-400' },
                            { title: 'Idiomas', icon: Globe, content: 'Inglés - Nivel intermedio (lectura técnica y documentación)', gradient: 'from-red-500 to-orange-600', iconColor: 'text-red-400' }
                        ].map((skill, idx) => (
                            <div key={idx} className={`${darkMode ? 'bg-gray-800/40' : 'bg-white/80'} backdrop-blur-xl p-6 rounded-2xl shadow-xl ${darkMode ? 'border-gray-700/50' : 'border-gray-200'} border transition-all duration-300 hover:shadow-3xl hover:-translate-y-2 group`}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="relative">
                                        <div className={`absolute inset-0 bg-gradient-to-r ${skill.gradient} rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity`} />
                                        <div className={`relative w-12 h-12 bg-gradient-to-br ${skill.gradient} rounded-xl flex items-center justify-center transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                                            <skill.icon size={24} className="text-white" />
                                        </div>
                                    </div>
                                    <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'} text-lg`}>{skill.title}</h4>
                                </div>
                                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>{skill.content}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contacto Section */}
                <section id="contacto" className="animate-fadeInUp">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-75" />
                            <div className="relative w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <Mail size={28} className="text-white" />
                            </div>
                        </div>
                        <h3 className={`text-4xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Contacto</h3>
                    </div>

                    <div className={`${darkMode ? 'bg-gray-800/40' : 'bg-white/80'} backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl ${darkMode ? 'border-gray-700/50' : 'border-gray-200'} border transition-all duration-300`}>
                        <div className="grid lg:grid-cols-2 gap-12">
                            <div>
                                <h4 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>¿Hablamos?</h4>
                                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} text-lg mb-8 leading-relaxed`}>
                                    Estoy abierto a nuevas oportunidades, colaboraciones en proyectos de Data Engineering oBackend con Python, y desafíos en el sector AgTech.
                                </p>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20">
                                            <Mail className="text-blue-400" size={24} />
                                        </div>
                                        <div>
                                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Email</p>
                                            <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>matiasjavierlucero@gmail.com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center border border-purple-500/20">
                                            <MapPin className="text-purple-400" size={24} />
                                        </div>
                                        <div>
                                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Ubicación</p>
                                            <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Córdoba, Argentina</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <form name="contacto" method="POST" data-netlify="true" className="space-y-5">
                                <input type="hidden" name="form-name" value="contacto" />
                                <div className="grid md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Nombre</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            className={`w-full px-4 py-3 rounded-xl border ${darkMode ? 'bg-gray-900/50 border-gray-700 text-white focus:border-blue-500' : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500'} outline-none transition-all duration-200`}
                                            placeholder="Tu nombre"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            className={`w-full px-4 py-3 rounded-xl border ${darkMode ? 'bg-gray-900/50 border-gray-700 text-white focus:border-blue-500' : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500'} outline-none transition-all duration-200`}
                                            placeholder="tu@email.com"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="subject" className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Asunto</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        required
                                        className={`w-full px-4 py-3 rounded-xl border ${darkMode ? 'bg-gray-900/50 border-gray-700 text-white focus:border-blue-500' : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500'} outline-none transition-all duration-200`}
                                        placeholder="Motivo de contacto"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="message" className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Mensaje</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        required
                                        className={`w-full px-4 py-3 rounded-xl border ${darkMode ? 'bg-gray-900/50 border-gray-700 text-white focus:border-blue-500' : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500'} outline-none transition-all duration-200 resize-none`}
                                        placeholder="Cuéntame sobre tu proyecto..."
                                    ></textarea>
                                </div>
                                <button type="submit" className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1">
                                    Enviar Mensaje
                                </button>
                            </form>
                        </div>
                    </div>
                </section>

                {/* Educación Section */}
                <section id="educacion" className="animate-fadeInUp">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl blur opacity-75" />
                            <div className="relative w-14 h-14 bg-gradient-to-br from-red-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <GraduationCap size={28} className="text-white" />
                            </div>
                        </div>
                        <h3 className={`text-4xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Educación</h3>
                    </div>
                    <div className={`${darkMode ? 'bg-gray-800/40' : 'bg-white/80'} backdrop-blur-xl p-10 rounded-3xl shadow-2xl ${darkMode ? 'border-gray-700/50' : 'border-gray-200'} border transition-all duration-300 hover:shadow-3xl hover:-translate-y-1`}>
                        <h4 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Técnico Superior en Desarrollo de Software</h4>
                        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-lg`}>Instituto Tecnológico</p>
                    </div>
                </section>
            </div>

            {/* Footer */}
            <footer className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16 mt-32 print:hidden overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-8">
                        <h3 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Matías Javier Lucero</h3>
                        <p className="text-gray-400 text-lg">Python Backend Developer / Data Engineer</p>
                    </div>
                    <div className="flex justify-center gap-6 mb-8">
                        <a href="https://github.com/matiasjavierlucero" target="_blank" rel="noopener noreferrer"
                            className="p-4 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-110 shadow-lg">
                            <Github size={24} />
                        </a>
                        <a href="https://www.linkedin.com/in/matiasjavierlucero/" target="_blank" rel="noopener noreferrer"
                            className="p-4 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-110 shadow-lg">
                            <Linkedin size={24} />
                        </a>
                        <a href="mailto:matiasjavierlucero@gmail.com"
                            className="p-4 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-110 shadow-lg">
                            <Mail size={24} />
                        </a>
                    </div>
                    <p className="text-center text-gray-400 text-sm">© 2026 - By 1926Dev - All rights reserved.</p>
                </div>
            </footer>

            {/* Animations & Styles */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
          animation-fill-mode: both;
        }
        
        .animate-blob {
          animation: blob 20s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        @media print {
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .print\\:hidden {
            display: none !important;
          }
          section {
            page-break-inside: avoid;
          }
          h3 {
            page-break-after: avoid;
          }
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
        </div>
    );
};

export default CVWeb;
