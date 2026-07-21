'use client';

import { useEffect, useState } from 'react';

const COLORS = ['#E6AC67', '#2F4A78', '#FAF9F6', '#3F5F93', '#C48A3D'];
const PARTICLE_COUNT = 14;

type Particle = {
	id: number;
	dx: number;
	dy: number;
	color: string;
	size: number;
	delay: number;
};

function createBurst(seed: number): Particle[] {
	return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
		const angle = (Math.PI * 2 * i) / PARTICLE_COUNT + Math.random() * 0.4;
		const distance = 22 + Math.random() * 26;
		return {
			id: seed * 100 + i,
			dx: Math.cos(angle) * distance,
			dy: Math.sin(angle) * distance - 8,
			color: COLORS[i % COLORS.length],
			size: 4 + Math.random() * 3,
			delay: Math.random() * 0.05,
		};
	});
}

export function ConfettiBurst({ trigger }: { trigger: number }) {
	const [prevTrigger, setPrevTrigger] = useState(trigger);
	const [particles, setParticles] = useState<Particle[]>([]);

	// Derive the burst from `trigger` during render (React's recommended
	// pattern for "adjusting state when a prop changes") instead of setting
	// it synchronously inside an effect, which React warns can cascade.
	if (trigger !== prevTrigger) {
		setPrevTrigger(trigger);
		setParticles(trigger === 0 ? [] : createBurst(trigger));
	}

	useEffect(() => {
		if (particles.length === 0) return;
		const timeout = setTimeout(() => setParticles([]), 700);
		return () => clearTimeout(timeout);
	}, [particles]);

	if (particles.length === 0) return null;

	return (
		<div
			className='pointer-events-none absolute inset-0 overflow-visible'
			aria-hidden='true'
		>
			{particles.map((p) => (
				<span
					key={p.id}
					className='confetti-particle absolute left-1/2 top-1/2 rounded-sm'
					style={
						{
							width: p.size,
							height: p.size,
							backgroundColor: p.color,
							animationDelay: `${p.delay}s`,
							'--confetti-dx': `${p.dx}px`,
							'--confetti-dy': `${p.dy}px`,
						} as React.CSSProperties
					}
				/>
			))}
		</div>
	);
}
