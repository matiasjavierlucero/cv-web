import React from 'react';
import { motion } from 'framer-motion';

const Skills = ({ data }) => {
    return (
        <section id="skills" style={{ background: 'var(--bg-secondary)' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: '4rem' }}
                >
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                        Habilidades <span className="text-gradient">Técnicas</span>
                    </h2>
                    <div style={{ width: '60px', height: '4px', background: 'var(--accent-secondary)', margin: '0 auto' }}></div>
                </motion.div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '2rem',
                    maxWidth: '1000px',
                    margin: '0 auto'
                }}>
                    {data.map((skill, index) => {
                        const Icon = skill.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                whileHover={{ scale: 1.05, borderColor: 'var(--accent-primary)' }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="glass-card"
                                style={{
                                    textAlign: 'center',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    background: 'rgba(15, 23, 42, 0.6)'
                                }}
                            >
                                <div style={{
                                    padding: '1rem',
                                    background: 'rgba(34, 211, 238, 0.1)',
                                    borderRadius: '50%',
                                    color: 'var(--accent-primary)'
                                }}>
                                    <Icon size={32} />
                                </div>
                                <h3 style={{ fontSize: '1.1rem' }}>{skill.name}</h3>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{skill.category}</span>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Skills;
