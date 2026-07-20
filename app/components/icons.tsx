type IconProps = { className?: string };

const base = 'w-5 h-5';

export function ShieldIcon({ className = base }: IconProps) {
	return (
		<svg
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='1.75'
			className={className}
		>
			<path
				d='M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path d='M9 12l2 2 4-4' strokeLinecap='round' strokeLinejoin='round' />
		</svg>
	);
}

export function FlaskIcon({ className = base }: IconProps) {
	return (
		<svg
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='1.75'
			className={className}
		>
			<path
				d='M9 3h6M10 3v6l-5.5 9a2 2 0 0 0 1.7 3h11.6a2 2 0 0 0 1.7-3L14 9V3'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path d='M7 15h10' strokeLinecap='round' />
		</svg>
	);
}

export function DocumentIcon({ className = base }: IconProps) {
	return (
		<svg
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='1.75'
			className={className}
		>
			<path
				d='M7 3h7l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path d='M14 3v4h4M9 13h6M9 17h6' strokeLinecap='round' />
		</svg>
	);
}

export function TruckIcon({ className = base }: IconProps) {
	return (
		<svg
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='1.75'
			className={className}
		>
			<path
				d='M3 7h11v9H3zM14 10h4l3 3v3h-7z'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<circle cx='7' cy='18' r='1.6' />
			<circle cx='17.5' cy='18' r='1.6' />
		</svg>
	);
}

export function PeopleIcon({ className = base }: IconProps) {
	return (
		<svg
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='1.75'
			className={className}
		>
			<circle cx='9' cy='8' r='3' />
			<path d='M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5' strokeLinecap='round' />
			<circle cx='17' cy='9' r='2.3' />
			<path d='M15.5 14.3c2.4.3 4.5 2.2 4.5 5.2' strokeLinecap='round' />
		</svg>
	);
}

export function CheckBadgeIcon({ className = base }: IconProps) {
	return (
		<svg
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='1.75'
			className={className}
		>
			<circle cx='12' cy='12' r='9' />
			<path d='M8 12.3l2.5 2.5L16 9' strokeLinecap='round' strokeLinejoin='round' />
		</svg>
	);
}

export function ClockIcon({ className = base }: IconProps) {
	return (
		<svg
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='1.75'
			className={className}
		>
			<circle cx='12' cy='12' r='9' />
			<path d='M12 7v5l3.5 2' strokeLinecap='round' strokeLinejoin='round' />
		</svg>
	);
}

export function CartIcon({ className = base }: IconProps) {
	return (
		<svg
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='1.75'
			className={className}
		>
			<path
				d='M3 4h2l2.4 12.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L21 8H6'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<circle cx='10' cy='21' r='1.4' />
			<circle cx='17' cy='21' r='1.4' />
		</svg>
	);
}

export function LockIcon({ className = base }: IconProps) {
	return (
		<svg
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='1.75'
			className={className}
		>
			<rect x='5' y='11' width='14' height='9' rx='2' />
			<path d='M8 11V7a4 4 0 0 1 8 0v4' strokeLinecap='round' />
		</svg>
	);
}

export function ArrowRightIcon({ className = 'w-4 h-4' }: IconProps) {
	return (
		<svg
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			className={className}
		>
			<path
				d='M5 12h14M13 6l6 6-6 6'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
}
