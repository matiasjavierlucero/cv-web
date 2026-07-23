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
                    <span style={{ fontSize: 9.5, color: badge.color, fontWeight: 600 }}>{badge.text}</span>
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
                        Python Backend Developer / Data Engineer / Docente
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', columnGap: 18, rowGap: 3, fontSize: 10.5, color: MUTED }}>
                        <span>Alcira Gigena, Córdoba, Argentina</span>
                        <span>+54 9 358 431-9481</span>
                        <span>matiasjavierlucero@gmail.com</span>
                        <span>github.com/matiasjavierlucero</span>
                        <span>linkedin.com/in/matiasjavierlucero</span>
                    </div>
                </div>

                {/* ── PERFIL ──────────────────────────────────────────────── */}
                <div style={{ marginBottom: 22 }}>
                    <SectionTitle>Perfil</SectionTitle>
                    <p style={{ fontSize: 11, color: GRAY, lineHeight: 1.65 }}>
                        Backend Developer Python con{' '}
                        <strong style={{ color: NAVY }}>5+ años en entornos productivos</strong>{' '}
                        especializado en Data Engineering, ML y soluciones de IA.
                        En Kilimo (AgTech multi-país) diseñé microservicios REST con FastAPI/Django/Celery, construí un
                        Data Lake Medallion sobre AWS S3/Glue/Athena orquestado con Airflow en EKS, desarrollé
                        pipelines ML (XGBoost, MLflow) e implementé agentes IA con LangChain/LangGraph + Azure OpenAI.
                        Complemento con liderazgo técnico de equipos bajo metodologías ágiles (Scrum) y docencia activa con{' '}
                        <strong style={{ color: NAVY }}>180+ alumnos formados</strong>.
                    </p>
                </div>

                {/* ── EXPERIENCIA PROFESIONAL ─────────────────────────────── */}
                <div style={{ marginBottom: 22 }}>
                    <SectionTitle>Experiencia Profesional</SectionTitle>

                    <Entry
                        company="Kilimo"
                        role="Python Backend Developer / Data Engineer"
                        period="Nov 2021 – Jun 2026 · 4+ años"
                        note="Startup AgTech multi-país (Argentina, Chile, México, Perú, Colombia, Brasil) · equipo distribuido"
                        bullets={[
                            'Diseñé e implementé múltiples microservicios REST en producción con FastAPI, Django, Celery/Redis, Taskiq/RabbitMQ, SQLAlchemy 2.0 + Alembic, bajo Layered Architecture (api > services > repositories) con routers por dominio y CI/CD completo (GitHub Actions > ECS Fargate)',
                            'Auth end-to-end: OAuth2 con Django OAuth Toolkit, JWT custom (PyJWT, passlib, bcrypt) con middleware JWTBearer, Firebase Auth para mobile y API Key — diseño en capas (middleware > servicio, nunca mezclado)',
                            'Construí Data Lake Medallion (Bronze/Silver/Gold) sobre AWS S3/Glue/Athena, orquestado con Apache Airflow en Kubernetes (EKS) e integración dbt vía Astronomer Cosmos',
                            'Desarrollé pipelines ML end-to-end con XGBoost, scikit-learn, MLflow para clasificación de eventos hídricos, con inference periódica deployada en ECS Fargate',
                            'Implementé agentes IA conversacionales con LangChain, LangGraph, Azure OpenAI (GPT-4) y prototipé pipeline RAG con Azure AI Search + Azure Document Intelligence',
                            'Integré SentinelHub, Planet Labs y FAO WAPOR; procesamiento geoespacial con rasterio, GDAL, geopandas y rasterstats a escala',
                            'IaC Terraform modular para múltiples microservicios: ECS Fargate, RDS PostgreSQL 15, Amazon MQ (RabbitMQ), ALB, ACM, Secrets Manager — multi-entorno stg/prod',
                            'Servicio de notificaciones multi-canal (Firebase FCM, Twilio SMS, Email) con Factory + Strategy Pattern para selección dinámica de canal en runtime',
                            'Cultura de calidad: pytest, pytest-asyncio, pytest-django, factory-boy, Faker, freezegun, pytest-vcr, pytest-xdist — separación unit/integration con markers; mypy strict, ruff, pre-commit, pytest-cov',
                        ]}
                        tags={['Python', 'FastAPI', 'Django', 'REST API', 'SQLAlchemy 2.0', 'Alembic', 'Celery', 'Taskiq', 'Redis', 'OAuth2', 'JWT', 'pytest', 'Airflow', 'dbt', 'MLflow', 'XGBoost', 'LangChain', 'Azure OpenAI', 'SentinelHub', 'rasterio', 'Firebase FCM', 'Twilio', 'AWS ECS', 'S3', 'Glue', 'Athena', 'EKS', 'Terraform', 'Docker', 'GitHub Actions']}
                    />

                    <Entry
                        company="ItecLabs"
                        role="Primer Desarrollador / Tech Lead / Mentor"
                        period="Dic 2019 – Actualidad · 5+ años"
                        note="Estudio de desarrollo de software · fui el primer desarrollador y crecí hasta ser referente técnico de un equipo de 15+ personas"
                        bullets={[
                            'Lideré el desarrollo de 5+ sistemas productivos: turnero clínico (Mellitus), gestión gremial (Sindicato de la Carne), monitoreo IoT de biodigestores (Tecnored), gestión de obras y APIs REST para terceros',
                            'Evolucioné de primer desarrollador a Tech Lead (arquitectura, diseño de BD, decisiones técnicas) a Mentor del equipo bajo metodologías ágiles (Scrum)',
                            'Tomé decisiones de arquitectura y lideré code reviews a medida que el equipo escaló a 15+ personas',
                        ]}
                        tags={['Python', 'Flask', 'FastAPI', 'Django', 'REST API', 'PostgreSQL', 'Docker', 'Scrum', 'IoT']}
                    />

                    <Entry
                        company="Comprando en Grupo"
                        role="Python Backend Developer"
                        period="May 2021 – Nov 2021 · 6 meses"
                        bullets={[
                            'Desarrollé APIs REST en Python para plataforma de compras grupales B2B',
                            'Implementé lógica de negocio y persistencia de datos en PostgreSQL',
                        ]}
                        tags={['Python', 'FastAPI', 'REST API', 'PostgreSQL']}
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
                            'Docente de Python, POO, backend y buenas prácticas con 180+ alumnos formados',
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
                        badge={{ text: 'En produccion — tasajusta.vercel.app', color: GREEN }}
                        bullets={[
                            'Modelo LightGBM con R2 = 0.55 entrenado sobre publicaciones reales de DeRuedas — detecta autos publicados 10%+ por debajo del precio de mercado',
                            'Pipeline ETL semanal automatizado (GitHub Actions) con arquitectura medallion en AWS S3',
                            'API FastAPI serverless en AWS Lambda + API Gateway, Frontend Next.js 14 con SSR en Vercel',
                        ]}
                        tags={['Python', 'LightGBM', 'FastAPI', 'REST API', 'Polars', 'AWS Lambda', 'AWS S3', 'Terraform', 'Next.js 14', 'Supabase', 'GitHub Actions', 'Docker']}
                    />

                    <Entry
                        company="RAG from Scratch"
                        role="Implementacion de Retrieval-Augmented Generation desde cero en Python"
                        period="github.com/matiasjavierlucero/rag-from-scratch"
                        bullets={[
                            'Pipeline completo: chunking, embedding, retrieval vectorial, generacion — sin frameworks de alto nivel',
                            'Disenado para comprender los fundamentos antes de abstracciones como LangChain o LlamaIndex',
                        ]}
                        tags={['Python', 'FAISS', 'Sentence Transformers', 'OpenAI API']}
                    />
                </div>

                {/* ── HABILIDADES ─────────────────────────────────────────── */}
                <div style={{ marginBottom: 22 }}>
                    <SectionTitle>Habilidades Tecnicas</SectionTitle>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {[
                            { cat: 'Backend',           items: 'Python, FastAPI, Django, REST API, SQLAlchemy 2.0, Alembic, Celery, Taskiq, Redis, OAuth2, JWT, Pydantic v2' },
                            { cat: 'Data y ML',         items: 'Apache Airflow, dbt, MLflow, XGBoost, scikit-learn, Polars, Pandas, Medallion Architecture' },
                            { cat: 'IA / LLM',          items: 'LangChain, LangGraph, Azure OpenAI (GPT-4), RAG, Azure AI Search, Azure Document Intelligence' },
                            { cat: 'Cloud e IaC',       items: 'AWS (ECS, RDS, S3, Glue, Athena, Lambda, EKS), Kubernetes, Terraform, Docker, GitHub Actions' },
                            { cat: 'Geoespacial',       items: 'SentinelHub, Planet Labs, FAO WAPOR, rasterio, GDAL, geopandas, PostGIS' },
                            { cat: 'Bases de datos',    items: 'PostgreSQL, Redis, RabbitMQ, Amazon MQ, SQLite, Supabase' },
                            { cat: 'Integraciones',     items: 'Firebase Admin SDK, Firebase FCM, Twilio SMS, Cloudflare' },
                            { cat: 'Testing y Calidad', items: 'pytest, pytest-asyncio, pytest-django, factory-boy, Faker, freezegun, pytest-vcr, mypy strict, ruff, pre-commit' },
                            { cat: 'Metodologias',      items: 'Scrum, metodologias agiles, Git, code review, CI/CD' },
                        ].map(({ cat, items }) => (
                            <div key={cat}>
                                <span style={{ fontSize: 10.5, fontWeight: 700, color: NAVY }}>{cat}: </span>
                                <span style={{ fontSize: 10.5, color: GRAY }}>{items}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── EDUCACIÓN ───────────────────────────────────────────── */}
                <div style={{ marginBottom: 16 }}>
                    <SectionTitle>Educacion</SectionTitle>
                    <div style={{ fontSize: 11.5, fontWeight: 700, color: NAVY, marginBottom: 3 }}>
                        Tecnico Superior en Desarrollo de Software
                    </div>
                    <div style={{ fontSize: 10.5, color: MUTED }}>
                        Instituto Tecnologico Rio Cuarto · 2017 – 2020
                    </div>
                </div>

                {/* ── IDIOMAS ─────────────────────────────────────────────── */}
                <div>
                    <SectionTitle>Idiomas</SectionTitle>
                    <div style={{ fontSize: 11, color: GRAY }}>
                        <strong style={{ color: NAVY }}>Ingles A2/B1</strong>
                        {' '}— lectura tecnica y documentacion
                    </div>
                </div>

            </div>
        </>
    );
}
