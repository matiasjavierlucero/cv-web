import React, { useState, useEffect } from 'react';

// ── Pixel palette ─────────────────────────────────────────────────────────────
const n = null;
const HAIR  = '#2E1A0E';
const SKIN  = '#F5C09A';
const EYE   = '#0A0400';
const BELT  = '#374151';
const PANTS = '#1E3A8A';
const SHOES = '#111111';
const PX    = 5; // scale factor

type PixelGrid = (string | null)[][];

// ── Pixel sprite builder ──────────────────────────────────────────────────────
function sprite(grid: PixelGrid, scale = PX) {
    const cols = grid[0]?.length ?? 10;
    const rows = grid.length;
    return (
        <svg
            width={cols * scale}
            height={rows * scale}
            style={{ imageRendering: 'pixelated', display: 'block', flexShrink: 0 }}
            aria-hidden
        >
            {grid.flatMap((row, r) =>
                row.map((fill, c) =>
                    fill
                        ? <rect key={`${r}-${c}`} x={c * scale} y={r * scale} width={scale} height={scale} fill={fill} />
                        : null
                )
            )}
        </svg>
    );
}

// ── Character grid factory ────────────────────────────────────────────────────
function charGrid(shirt: string, raised = false): PixelGrid {
    const T = shirt;
    // raised = arms up (used for Load character)
    const arms: PixelGrid = raised
        ? [[T,n,T,T,T,T,T,T,n,T]]
        : [[n,T,T,T,T,T,T,T,T,n]];
    return [
        [n, n, n, HAIR, HAIR, HAIR, HAIR, n,    n,    n   ], // hair
        [n, n, HAIR,HAIR,HAIR,HAIR,HAIR,HAIR, n,    n   ], // hair
        [n, n, SKIN,SKIN,SKIN,SKIN,SKIN,SKIN, n,    n   ], // face
        [n, n, SKIN,EYE, SKIN,SKIN,EYE, SKIN, n,    n   ], // eyes
        [n, n, SKIN,SKIN,SKIN,SKIN,SKIN,SKIN, n,    n   ], // face
        [n, n, n,   SKIN,SKIN,SKIN,SKIN, n,    n,    n   ], // chin
        ...arms,                                              // shoulders / raised arms
        [n, T, T,   T,   T,   T,   T,   T,    T,    n   ], // body
        [n, T, SKIN,T,   T,   T,   T,   SKIN, T,    n   ], // body + hands
        [n, n, n,   BELT,BELT,BELT,BELT, n,    n,    n   ], // belt
        [n, n, n,   PANTS,PANTS,n,PANTS,PANTS, n,    n   ], // legs
        [n, n, n,   PANTS,PANTS,n,PANTS,PANTS, n,    n   ],
        [n, n, n,   PANTS,PANTS,n,PANTS,PANTS, n,    n   ],
        [n, n, SHOES,SHOES,SHOES,n,SHOES,SHOES,SHOES, n  ], // feet
    ];
}

// ── Pixel art icons ───────────────────────────────────────────────────────────
const MonitorSprite = () => {
    const B = '#0C4A6E', L = '#38BDF8', F = '#7DD3FC', S = '#1E293B', C = '#475569';
    const g: PixelGrid = [
        [S,S,S,S,S,S,S,S,S,S,S,S],
        [S,B,B,B,B,B,B,B,B,B,B,S],
        [S,B,L,L,L,L,L,n,n,B,B,S],
        [S,B,n,F,F,F,F,F,n,B,B,S],
        [S,B,n,F,n,n,n,F,n,B,B,S],
        [S,B,L,L,L,L,L,L,n,B,B,S],
        [S,B,n,F,n,n,F,n,n,B,B,S],
        [S,B,B,B,B,B,B,B,B,B,B,S],
        [S,S,S,S,S,S,S,S,S,S,S,S],
        [n,n,n,n,C,C,C,C,n,n,n,n],
        [n,n,n,C,C,C,C,C,C,n,n,n],
    ];
    return sprite(g, 4);
};

const GearSprite = () => {
    const G = '#F59E0B', D = '#1C1917';
    const g: PixelGrid = [
        [n,n,n,G,G,G,G,n,n,n],
        [n,n,G,G,G,G,G,G,n,n],
        [n,G,G,D,D,D,D,G,G,n],
        [G,G,D,D,G,G,D,D,G,G],
        [G,G,D,G,G,G,G,D,G,G],
        [G,G,D,G,G,G,G,D,G,G],
        [G,G,D,D,G,G,D,D,G,G],
        [n,G,G,D,D,D,D,G,G,n],
        [n,n,G,G,G,G,G,G,n,n],
        [n,n,n,G,G,G,G,n,n,n],
    ];
    return sprite(g, 4);
};

const CloudSprite = () => {
    const C = '#94A3B8', W = '#CBD5E1', G = '#34D399';
    const g: PixelGrid = [
        [n,n,n,W,W,W,W,n,n,n,n,n],
        [n,n,W,W,W,W,W,W,n,n,n,n],
        [n,C,C,W,W,W,W,C,C,n,n,n],
        [C,C,C,C,C,C,C,C,C,C,n,n],
        [C,C,C,C,C,C,C,C,C,C,n,n],
        [n,C,C,C,C,C,C,C,C,n,n,n],
        [n,n,n,n,G,G,n,n,n,n,n,n],
        [n,n,n,G,G,G,G,n,n,n,n,n],
        [n,n,n,n,G,G,n,n,n,n,n,n],
        [n,n,n,n,G,G,n,n,n,n,n,n],
    ];
    return sprite(g, 4);
};

// ── Data packets ──────────────────────────────────────────────────────────────
interface PacketProps {
    color: string;
    delay: number;
    duration?: number;
    dimmed?: boolean;
}

const DataPacket = ({ color, delay, duration = 2.2, dimmed = false }: PacketProps) => (
    <div
        style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            width: 10,
            height: 10,
            marginTop: -5,
            background: color,
            borderRadius: 2,
            animation: `etl-packet ${duration}s ease-in-out ${delay}s infinite`,
            opacity: dimmed ? 0.4 : 1,
            boxShadow: `0 0 6px ${color}`,
        }}
    />
);

// ── Stage card ────────────────────────────────────────────────────────────────
interface StageProps {
    icon: React.ReactNode;
    label: string;
    sublabel: string;
    charColor: string;
    accentColor: string;
    isActive: boolean;
    charRaised?: boolean;
}

const Stage = ({ icon, label, sublabel, charColor, accentColor, isActive, charRaised = false }: StageProps) => (
    <div
        style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            padding: '16px 12px',
            borderRadius: 12,
            border: `2px solid ${isActive ? accentColor : 'rgba(255,255,255,0.06)'}`,
            background: isActive ? `${accentColor}14` : 'rgba(255,255,255,0.03)',
            transition: 'all 0.4s ease',
            boxShadow: isActive ? `0 0 24px ${accentColor}33` : 'none',
            minWidth: 120,
        }}
    >
        {/* Icon */}
        <div style={{ animation: 'etl-bob 1.4s ease-in-out infinite' }}>
            {icon}
        </div>

        {/* Character */}
        <div style={{
            animation: `etl-bob 1s ease-in-out ${isActive ? '0s' : '0.2s'} infinite`,
        }}>
            {sprite(charGrid(charColor, charRaised))}
        </div>

        {/* Labels */}
        <div style={{ textAlign: 'center' }}>
            <div style={{
                fontFamily: 'monospace',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: accentColor,
                marginBottom: 2,
            }}>
                {label}
            </div>
            <div style={{
                fontFamily: 'monospace',
                fontSize: 10,
                color: 'rgba(255,255,255,0.45)',
                letterSpacing: 0.5,
            }}>
                {sublabel}
            </div>
        </div>
    </div>
);

// ── Main component ─────────────────────────────────────────────────────────────
export default function PixelETL() {
    const [activeStage, setActiveStage] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setActiveStage(s => (s + 1) % 3), 2200);
        return () => clearInterval(id);
    }, []);

    const PIPE_W = 140; // width of arrow segments

    return (
        <div style={{
            width: '100%',
            overflowX: 'auto',
            borderRadius: 16,
            background: '#08090F',
            border: '1px solid rgba(255,255,255,0.07)',
            padding: '20px 16px 16px',
        }}>
            {/* Header */}
            <div style={{
                fontFamily: 'monospace',
                fontSize: 11,
                color: 'rgba(255,255,255,0.3)',
                letterSpacing: 3,
                textTransform: 'uppercase',
                marginBottom: 16,
                textAlign: 'center',
            }}>
                {'> ETL_PIPELINE.py — TasaJusta'}
            </div>

            {/* Pipeline */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 0,
                minWidth: 580,
            }}>
                {/* Stage 1: Extract */}
                <Stage
                    icon={<MonitorSprite />}
                    label="Extract"
                    sublabel="Kavak.com"
                    charColor="#3B82F6"
                    accentColor="#38BDF8"
                    isActive={activeStage === 0}
                />

                {/* Arrow 1: raw data packets (some "bad" ones) */}
                <div style={{ position: 'relative', width: PIPE_W, height: 40, flexShrink: 0 }}>
                    {/* Track line */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: 0,
                        right: 0,
                        height: 1,
                        background: 'rgba(56,189,248,0.2)',
                    }} />
                    {/* Arrow tip */}
                    <div style={{
                        position: 'absolute',
                        right: 0,
                        top: '50%',
                        marginTop: -5,
                        width: 0,
                        height: 0,
                        borderTop: '5px solid transparent',
                        borderBottom: '5px solid transparent',
                        borderLeft: '8px solid rgba(56,189,248,0.4)',
                    }} />
                    {/* Packets: 5 raw (mixed) */}
                    <DataPacket color="#38BDF8" delay={0}    duration={2.2} />
                    <DataPacket color="#F59E0B" delay={0.44} duration={2.2} />
                    <DataPacket color="#38BDF8" delay={0.88} duration={2.2} />
                    <DataPacket color="#F87171" delay={1.32} duration={2.2} dimmed />
                    <DataPacket color="#38BDF8" delay={1.76} duration={2.2} />
                </div>

                {/* Stage 2: Transform */}
                <Stage
                    icon={<GearSprite />}
                    label="Transform"
                    sublabel="Filtra y limpia"
                    charColor="#F59E0B"
                    accentColor="#FBBF24"
                    isActive={activeStage === 1}
                />

                {/* Arrow 2: clean data packets */}
                <div style={{ position: 'relative', width: PIPE_W, height: 40, flexShrink: 0 }}>
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: 0,
                        right: 0,
                        height: 1,
                        background: 'rgba(52,211,153,0.2)',
                    }} />
                    <div style={{
                        position: 'absolute',
                        right: 0,
                        top: '50%',
                        marginTop: -5,
                        width: 0,
                        height: 0,
                        borderTop: '5px solid transparent',
                        borderBottom: '5px solid transparent',
                        borderLeft: '8px solid rgba(52,211,153,0.4)',
                    }} />
                    {/* Packets: 3 clean */}
                    <DataPacket color="#34D399" delay={0.3}  duration={2.2} />
                    <DataPacket color="#34D399" delay={1.0}  duration={2.2} />
                    <DataPacket color="#34D399" delay={1.7}  duration={2.2} />
                </div>

                {/* Stage 3: Load */}
                <Stage
                    icon={<CloudSprite />}
                    label="Load"
                    sublabel="AWS S3 Gold"
                    charColor="#10B981"
                    accentColor="#34D399"
                    isActive={activeStage === 2}
                    charRaised
                />
            </div>

            {/* Legend */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 20,
                marginTop: 16,
                flexWrap: 'wrap',
            }}>
                {[
                    { color: '#38BDF8', label: 'datos crudos' },
                    { color: '#F87171', label: 'descartados', dim: true },
                    { color: '#34D399', label: 'datos limpios' },
                ].map(({ color, label, dim }) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{
                            width: 8, height: 8,
                            background: color,
                            borderRadius: 2,
                            opacity: dim ? 0.45 : 1,
                            boxShadow: `0 0 4px ${color}`,
                        }} />
                        <span style={{
                            fontFamily: 'monospace',
                            fontSize: 10,
                            color: 'rgba(255,255,255,0.35)',
                            letterSpacing: 0.5,
                        }}>{label}</span>
                    </div>
                ))}
            </div>

            {/* CSS */}
            <style>{`
        @keyframes etl-packet {
          0%   { transform: translateX(0);    opacity: 0; }
          12%  { opacity: 1; }
          88%  { opacity: 1; }
          100% { transform: translateX(${PIPE_W - 14}px); opacity: 0; }
        }
        @keyframes etl-bob {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(-4px); }
        }
      `}</style>
        </div>
    );
}
