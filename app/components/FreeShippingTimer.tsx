'use client';

import { useEffect, useState } from 'react';
import { TruckIcon } from './icons';

const CUTOFF_HOUR_MT = 16;

function getSecondsUntilCutoff() {
	const parts = new Intl.DateTimeFormat('en-US', {
		timeZone: 'America/Denver',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hourCycle: 'h23',
	}).formatToParts(new Date());

	const get = (type: string) =>
		Number(parts.find((part) => part.type === type)?.value ?? 0);

	const nowSeconds = get('hour') * 3600 + get('minute') * 60 + get('second');
	const secondsInDay = 24 * 3600;
	return ((CUTOFF_HOUR_MT * 3600 - nowSeconds) % secondsInDay + secondsInDay) % secondsInDay;
}

function formatCountdown(totalSeconds: number) {
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;
	const pad = (value: number) => String(value).padStart(2, '0');
	return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export function FreeShippingTimer() {
	const [remaining, setRemaining] = useState<number | null>(null);

	useEffect(() => {
		const tick = () => setRemaining(getSecondsUntilCutoff());
		tick();
		const id = setInterval(tick, 1000);
		return () => clearInterval(id);
	}, []);

	if (remaining === null) return null;

	return (
		<div className='mt-2 flex items-center gap-2 text-sm'>
			<TruckIcon className='h-4 w-4 shrink-0 text-amber-dark' />
			<span className='font-bold uppercase tracking-wide text-amber-dark'>
				Shipped Free Today
			</span>
			<span className='font-mono text-sm font-semibold tabular-nums text-navy'>
				{formatCountdown(remaining)}
			</span>
		</div>
	);
}
