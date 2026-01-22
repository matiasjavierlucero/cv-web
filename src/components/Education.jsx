import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

const Education = ({ data }) => {
    return (
        <section id="education">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: '4rem' }}
                >
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                        Formación <span className="text-gradient">Académica</span>
                    </h2>
                    <div style={{ width: '60px', height: '4px', background: 'var(--accent-primary)', margin: '0 auto' }}></div>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
                    {data.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="glass-card"
                            style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}
                        >
                            <div style={{
                                padding: '0.8rem',
                                background: 'rgba(139, 92, 246, 0.1)',
                                borderRadius: '12px',
                                color: 'var(--accent-secondary)'
                            }}>
                                <GraduationCap size={24} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{item.degree}</h3>
                                <h4 style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>{item.institution}</h4>
                                <span style={{
                                    fontSize: '0.9rem',
                                    color: 'var(--accent-primary)',
                                    background: 'rgba(34, 211, 238, 0.05)',
                                    padding: '0.2rem 0.8rem',
                                    borderRadius: '1rem'
                                }}>
                                    {item.period}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
