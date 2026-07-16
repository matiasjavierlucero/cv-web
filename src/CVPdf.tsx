import React from 'react';

// ── Design tokens ──────────────────────────────────────────────────────────────
const NAVY   = '#0f172a';
const TEAL   = '#0369a1';
const GRAY   = '#374151';
const MUTED  = '#6b7280';
const GREEN  = '#059669';
const RULE   = '#e2e8f0';

// ── Atoms ──────────────────────────────────────────────────────────────────────
function Tag({ label }: { label: string }) {
    return (
        <span style={{
            display: 'inline-block',
            background: '#f1f5f9',
            color: '#475569',
            border: '1px solid #e2e8f0',
            fontSize: 9,
            fontWeight: 600,
            padding: '2px 7px',
            borderRadius: 3,
            marginRight: 4,
            marginTop: 4,
            letterSpacing: 0.1,
        }}>
            {label}
        </span>
    );
}

function SectionTitle({ children }: { children: string }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ width: 3, height: 14, background: TEAL, borderRadius: 2, flexShrink: 0 }} />
            <span style={{
                fontSize: 10,
                fontWeight: 800,
                color: NAVY,
                textTransform: 'uppercase',
                letterSpacing: 2,
            }}>
                {children}
            </span>
            <div style={{ flex: 1, height: 1, background: RULE }} />
        </div>
    );
}

interface EntryProps {
    company: string;
    role: string;
    period: string;
    note?: string;
    badge?: { text: string; color: string };
    bullets: string[];
    tags?: string[];
}

function Entry({ company, role, period, note, badge, bullets, tags = [] }: EntryProps) {
    return (
        <div style={{ marginBottom: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                <span style={{ fontSize: 12.5, fontWeight: 700, color: NAVY }}>{company}</span>
                {badge ? (
                    <span style={{ fontSize: 9.5, color: badge.color, fontWeight: 600 }}>● {badge.text}</span>
                ) : (
                    <span style={{ fontSize: 10, color: MUTED }}>{period}</span>
                )}
            </div>
            <div style={{ fontSize: 11, color: TEAL, fontWeight: 600, marginBottom: 3 }}>
                {role}
                {badge && <span style={{ color: MUTED, fontWeight: 400, marginLeft: 10, fontSize: 10 }}>{period}</span>}
            </div>
            {note && (
                <div style={{ fontSize: 10, color: MUTED, fontStyle: 'italic', marginBottom: 7 }}>{note}</div>
            )}
            <ul style={{ margin: 0, paddingLeft: 16 }}>
                {bullets.map((b, i) => (
                    <li key={i} style={{ fontSize: 11, color: GRAY, lineHeight: 1.55, marginBottom: 4 }}>{b}</li>
                ))}
            </ul>
            {tags.length > 0 && (
                <div style={{ marginTop: 6 }}>
                    {tags.map(t => <Tag key={t} label={t} />)}
                </div>
            )}
        </div>
    );
}

// ── Main ───────────────────────────────────────────────────────────────────────
export default function CVPdf() {
    return (
        <>
            <style>{`
                @page { margin: 15mm 16mm; size: A4 portrait; }
                @media print {
                    body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                    .print-hint { display: none !important; }
                }
                * { box-sizing: border-box; margin: 0; padding: 0; }
                body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background: #fff; }
                ul { list-style-type: disc; }
            `}</style>

            {/* Hint bar — oculto al imprimir */}
            <div className="print-hint" style={{
                background: '#0f172a', color: '#94a3b8',
                padding: '10px 24px', fontSize: 12,
                fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: 14,
            }}>
                <span style={{ color: '#f8fafc', fontWeight: 600 }}>Vista PDF</span>
                <span>→ Ctrl+P → Guardar como PDF → desactivar encabezados y pies de página</span>
            </div>

            <div style={{
                maxWidth: 794,
                margin: '0 auto',
                padding: '32px 42px 32px',
                background: '#fff',
            }}>

                {/* ── HEADER ──────────────────────────────────────────────── */}
                <div style={{ marginBottom: 20, paddingBottom: 16, borderBottom: `2px solid ${RULE}` }}>
                    <h1 style={{
                        fontSize: 28, fontWeight: 800, color: NAVY,
                        letterSpacing: -0.5, lineHeight: 1, marginBottom: 6,
                    }}>
                        Matías Javier Lucero
                    </h1>
                    <div style={{ fontSize: 13, color: TEAL, fontWeight: 600, marginBottom: 8 }}>
                        Python Backend Developer · Data Engineer · Docente
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', columnGap: 18, rowGap: 3, fontSize: 10.5, color: MUTED }}>
                        <span>Alcira Gigena, Córdoba, Argentina</span>
                        <span>matiasjavierlucero@gmail.com</span>
                        <span>github.com/matiasjavierlucero</span>
                        <span>linkedin.com/in/matiasjavierlucero</span>
                    </div>
                </div>

                {/* ── PERFIL ──────────────────────────────────────────────── */}
                <div style={{ marginBottom: 22 }}>
                    <SectionTitle>Perfil</SectionTitle>
                    <p style={{ fontSize: 11, color: GRAY, lineHeight: 1.65 }}>
                        Backend Developer Python especializado en Data Engineering e infraestructura cloud, con{' '}
                        <strong style={{ color: NAVY }}>5+ años de experiencia en entornos productivos</strong>.
                        En Kilimo (AgTech), diseño pipelines ETL sobre arquitectura medallion en AWS S3, proceso
                        datos satelitales y geoespaciales, y gestiono infraestructura serverless con Terraform.
                        Complemento ese perfil con experiencia en liderazgo técnico en ItecLabs
                        (equipo de 15+ personas) y docencia activa con{' '}
                        <strong style={{ color: NAVY }}>120+ alumnos</strong>.
                    </p>
                </div>

                {/* ── EXPERIENCIA PROFESIONAL ─────────────────────────────── */}
                <div style={{ marginBottom: 22 }}>
                    <SectionTitle>Experiencia Profesional</SectionTitle>

                    <Entry
                        company="Kilimo"
                        role="Python Backend Developer / Data Engineer"
                        period="Nov 2021 – Jun 2026 · 4+ años"
                        note="Startup AgTech de riego inteligente · equipo distribuido (Argentina, Israel, España)"
                        bullets={[
                            'Diseñé pipelines ETL que integran imágenes satelitales (Sentinel/Planet), índices NDVI y datos climáticos para modelos agronómicos en escala de producción',
                            'Implementé arquitectura Data Lake medallion (Bronze → Silver → Gold) en AWS S3 como fuente única de verdad para datos de múltiples clientes',
                            'Infraestructura cloud como código con Terraform: Lambda, API Gateway, S3, IAM — deploy reproducible y auditable',
                            'Automaticé flujos CI/CD con GitHub Actions: scraping periódico, validación de datos y deploy de servicios FastAPI',
                            'Code reviews, refactors y participación en decisiones de arquitectura en equipo internacional',
                        ]}
                        tags={['Python', 'FastAPI', 'Flask', 'Django', 'SQLAlchemy', 'PostgreSQL', 'Polars', 'AWS S3', 'AWS Lambda', 'Terraform', 'Docker', 'GitHub Actions']}
                    />

                    <Entry
                        company="ItecLabs"
                        role="Primer Desarrollador → Tech Lead → Mentor"
                        period="Dic 2019 – Actualidad · 5+ años"
                        note="Estudio de desarrollo de software · fui el primer desarrollador y crecí hasta ser referente técnico de un equipo de 15+ personas"
                        bullets={[
                            'Lideré el desarrollo de 5+ sistemas productivos: turnero clínico (Mellitus), gestión gremial (Sindicato de la Carne), monitoreo IoT de biodigestores (Tecnored), gestión de obras y APIs para terceros',
                            'Evolucioné de primer desarrollador a Tech Lead (arquitectura, diseño de BD, decisiones técnicas) a Mentor del equipo',
                            'Tomé decisiones de arquitectura y lideré code reviews a medida que el equipo escaló a 15+ personas',
                        ]}
                        tags={['Python', 'Flask', 'FastAPI', 'Django', 'PostgreSQL', 'Docker', 'IoT']}
                    />

                    <Entry
                        company="Comprando en Grupo"
                        role="Python Backend Developer"
                        period="May 2021 – Nov 2021 · 6 meses"
                        bullets={[
                            'Desarrollé APIs REST en Python para plataforma de compras grupales',
                            'Implementé lógica de negocio y persistencia de datos en PostgreSQL',
                        ]}
                        tags={['Python', 'FastAPI', 'PostgreSQL']}
                    />
                </div>

                {/* ── DOCENCIA ────────────────────────────────────────────── */}
                <div style={{ marginBottom: 22 }}>
                    <SectionTitle>Experiencia Docente</SectionTitle>
                    <Entry
                        company="Instituto Tecnológico Río Cuarto"
                        role="Profesor — Tecnicatura Superior en Desarrollo de Software"
                        period="Mar 2021 – Mar 2026 · 5 años"
                        bullets={[
                            'Docente de Python, POO, backend y buenas prácticas con 120+ alumnos activos',
                            'Diseño de trabajos prácticos y evaluaciones orientados al mercado laboral real',
                        ]}
                    />
                </div>

                {/* ── PROYECTOS ───────────────────────────────────────────── */}
                <div style={{ marginBottom: 22 }}>
                    <SectionTitle>Proyectos Personales</SectionTitle>

                    <Entry
                        company="TasaJusta"
                        role="Plataforma ML de inteligencia de precios para el mercado de autos usados argentino"
                        period=""
                        badge={{ text: 'En producción · tasajusta.vercel.app', color: GREEN }}
                        bullets={[
                            'Modelo LightGBM con R² = 0.55 entrenado sobre publicaciones reales de DeRuedas — detecta autos publicados 10%+ por debajo del precio de mercado',
                            'Pipeline ETL semanal automatizado (GitHub Actions) con arquitectura medallion en AWS S3',
                            'API FastAPI serverless en AWS Lambda + API Gateway · Frontend Next.js 14 con SSR en Vercel',
                        ]}
                        tags={['Python', 'LightGBM', 'FastAPI', 'Polars', 'AWS Lambda', 'AWS S3', 'Terraform', 'Next.js 14', 'Supabase', 'GitHub Actions', 'Docker']}
                    />

                    <Entry
                        company="RAG from Scratch"
                        role="Implementación de Retrieval-Augmented Generation desde cero en Python"
                        period="github.com/matiasjavierlucero/rag-from-scratch"
                        bullets={[
                            'Pipeline completo: chunking → embedding → retrieval vectorial → generación, sin frameworks de alto nivel',
                            'Diseñado para comprender los fundamentos antes de abstracciones como LangChain o LlamaIndex',
                        ]}
                        tags={['Python', 'FAISS', 'Sentence Transformers', 'OpenAI API']}
                    />
                </div>

                {/* ── HABILIDADES ─────────────────────────────────────────── */}
                <div style={{ marginBottom: 22 }}>
                    <SectionTitle>Habilidades Técnicas</SectionTitle>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 24px' }}>
                        {[
                            { cat: 'Backend',        items: 'Python (Avanzado) · FastAPI · Flask · Django · SQLAlchemy' },
                            { cat: 'Data & ML',      items: 'Polars · Pandas · LightGBM · Pipelines ETL · Data Lake' },
                            { cat: 'Cloud & IaC',    items: 'AWS (S3, Lambda, API Gateway) · Terraform · Docker · GitHub Actions' },
                            { cat: 'Bases de datos', items: 'PostgreSQL · SQLite · Supabase' },
                            { cat: 'Frontend',       items: 'Next.js 14 · React (básico)' },
                            { cat: 'Otros',          items: 'Git · Code Review · Arquitectura REST · Procesamiento geoespacial' },
                        ].map(({ cat, items }) => (
                            <div key={cat} style={{ paddingBottom: 4 }}>
                                <span style={{ fontSize: 10.5, fontWeight: 700, color: NAVY }}>{cat}: </span>
                                <span style={{ fontSize: 10.5, color: GRAY }}>{items}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── EDUCACIÓN + IDIOMAS ─────────────────────────────────── */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                    <div>
                        <SectionTitle>Educación</SectionTitle>
                        <div style={{ fontSize: 11.5, fontWeight: 700, color: NAVY, marginBottom: 3 }}>
                            Técnico Superior en Desarrollo de Software
                        </div>
                        <div style={{ fontSize: 10.5, color: MUTED }}>
                            Instituto Tecnológico Río Cuarto · 2017 – 2020
                        </div>
                    </div>
                    <div>
                        <SectionTitle>Idiomas</SectionTitle>
                        <div style={{ fontSize: 11, color: GRAY }}>
                            <strong style={{ color: NAVY }}>Inglés B2</strong>
                            {' '}— lectura técnica, documentación y comunicación escrita
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}
