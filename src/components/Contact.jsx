import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github } from 'lucide-react';

const Contact = ({ data }) => {
    return (
        <section id="contact" style={{ background: 'var(--bg-secondary)', padding: '5rem 0 2rem' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="glass-card"
                    style={{
                        maxWidth: '600px',
                        margin: '0 auto',
                        textAlign: 'center',
                        background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.9))',
                        border: '1px solid var(--accent-secondary)'
                    }}
                >
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>¿Hablamos?</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                        Estoy siempre abierto a nuevas oportunidades y desafíos interesantes.
                    </p>

                    <a
                        href={`mailto:${data.email}`}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.8rem',
                            background: 'var(--accent-primary)',
                            color: 'var(--bg-primary)',
                            padding: '1rem 2rem',
                            borderRadius: '2rem',
                            fontWeight: '600',
                            fontSize: '1.1rem',
                            marginBottom: '3rem'
                        }}
                    >
                        <Mail size={20} />
                        Contactar ahora
                    </a>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
                        <a href={data.social.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                            <Linkedin size={24} />
                            <span style={{ fontSize: '0.8rem' }}>LinkedIn</span>
                        </a>
                        <a href={data.social.github} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                            <Github size={24} />
                            <span style={{ fontSize: '0.8rem' }}>GitHub</span>
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
