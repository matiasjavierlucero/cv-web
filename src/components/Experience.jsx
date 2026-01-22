import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const ExperienceItem = ({ item, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="glass-card"
            style={{
                marginBottom: '2rem',
                position: 'relative',
                borderLeft: '4px solid var(--accent-primary)'
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                    <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>{item.role}</h3>
                    <h4 style={{ fontSize: '1.2rem', color: 'var(--accent-secondary)' }}>{item.company}</h4>
                </div>
                <span style={{
                    background: 'rgba(34, 211, 238, 0.1)',
                    color: 'var(--accent-primary)',
                    padding: '0.5rem 1rem',
                    borderRadius: '2rem',
                    fontSize: '0.9rem',
                    height: 'fit-content'
                }}>
                    {item.period}
                </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>{item.description}</p>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>{item.type}</span>
        </motion.div>
    );
};

const Experience = ({ data }) => {
    return (
        <section id="experience">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: '4rem' }}
                >
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                        Experiencia <span className="text-gradient">Profesional</span>
                    </h2>
                    <div style={{ width: '60px', height: '4px', background: 'var(--accent-primary)', margin: '0 auto' }}></div>
                </motion.div>

                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    {data.map((item, index) => (
                        <ExperienceItem key={item.id} item={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
