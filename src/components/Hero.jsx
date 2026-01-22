import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, FileText, ChevronDown } from 'lucide-react';

const Hero = ({ data }) => {
    return (
        <section style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            textAlign: 'center'
        }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 style={{
                        color: 'var(--accent-primary)',
                        fontSize: '1.5rem',
                        marginBottom: '1rem',
                        letterSpacing: '2px',
                        textTransform: 'uppercase'
                    }}>
                        Hola, soy
                    </h2>
                    <h1 style={{
                        fontSize: 'clamp(3rem, 8vw, 6rem)',
                        fontWeight: 800,
                        marginBottom: '1rem',
                        lineHeight: 1.1
                    }}>
                        <span className="text-gradient">{data.name}</span>
                    </h1>
                    <h3 style={{
                        fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                        color: 'var(--text-secondary)',
                        marginBottom: '2rem'
                    }}>
                        {data.role}
                    </h3>
                    <p style={{
                        maxWidth: '600px',
                        margin: '0 auto 3rem',
                        fontSize: '1.1rem',
                        color: 'var(--text-secondary)'
                    }}>
                        {data.about}
                    </p>

                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                        <a href={data.social.linkedin} target="_blank" rel="noopener noreferrer" className="glass-card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Linkedin size={24} />
                            <span>LinkedIn</span>
                        </a>
                        <a href={data.social.github} target="_blank" rel="noopener noreferrer" className="glass-card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Github size={24} />
                            <span>GitHub</span>
                        </a>
                        <a href="#" className="glass-card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderColor: 'var(--accent-primary)' }}>
                            <FileText size={24} />
                            <span>Descargar CV</span>
                        </a>
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                style={{ position: 'absolute', bottom: '2rem' }}
            >
                <ChevronDown size={32} color="var(--accent-primary)" />
            </motion.div>
        </section>
    );
};

export default Hero;
