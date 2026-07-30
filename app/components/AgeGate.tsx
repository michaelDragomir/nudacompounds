'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const AGE_GATE_KEY = 'nuda_age_verified';

type GateStatus = 'checking' | 'verified' | 'gated' | 'blocked';

export function AgeGate() {
	const [status, setStatus] = useState<GateStatus>('checking');

	useEffect(() => {
		const stored = window.localStorage.getItem(AGE_GATE_KEY);
		// eslint-disable-next-line react-hooks/set-state-in-effect -- syncing initial state from localStorage, an external system, on mount
		setStatus(stored === 'true' ? 'verified' : 'gated');
	}, []);

	useEffect(() => {
		const shouldLock = status === 'gated' || status === 'blocked';
		document.body.style.overflow = shouldLock ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	}, [status]);

	if (status === 'checking' || status === 'verified') return null;

	const handleAgree = () => {
		window.localStorage.setItem(AGE_GATE_KEY, 'true');
		setStatus('verified');
	};

	return (
		<div
			role='dialog'
			aria-modal='true'
			aria-label='Age verification'
			className='fixed inset-0 z-100 flex items-center justify-center bg-navy-dark/50 px-6 backdrop-blur-xl'
		>
			<div className='w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl sm:p-10'>
				<Image
					src='/images/nudaLogo.png'
					alt='Nuda Compounds'
					width={423}
					height={144}
					priority
					className='mx-auto h-15 w-auto'
				/>

				{status === 'blocked' ? (
					<>
						<h1 className='mt-6 font-sora text-2xl font-extrabold leading-tight text-navy'>
							You must be 21 or older to enter
						</h1>
						<p className='mt-4 text-sm leading-relaxed text-charcoal/75'>
							This website is restricted to individuals 21 years of age or older
							who are purchasing research materials for laboratory use only. You
							do not currently meet the requirements to access this site.
						</p>
					</>
				) : (
					<>
						<h1 className='mt-6 font-sora text-2xl font-extrabold leading-tight text-navy'>
							Age &amp; Research Use Verification
						</h1>
						<p className='mt-4 font-bold text-navy'>
							All products on this website are to be used strictly only for
							research purposes. By clicking Agree, you confirm:
						</p>
						<p className='mt-4 text-sm leading-relaxed text-charcoal/75'>
							(1) you are at least 21 years of age; (2) you are a qualified
							researcher; (3) you will not use these products for human or
							animal consumption; (4) you accept full responsibility for
							compliance; and (5) if you purchase any products from this
							website, you will comply with the Terms of Service available on
							this website.
						</p>

						<div className='mt-8 flex items-center justify-center gap-3'>
							<button
								type='button'
								onClick={() => setStatus('blocked')}
								className='rounded-xl bg-navy-dark px-8 py-3 text-sm font-bold uppercase tracking-widest text-offwhite transition-colors hover:bg-navy'
							>
								No
							</button>
							<button
								type='button'
								onClick={handleAgree}
								className='rounded-xl bg-amber px-8 py-3 text-sm font-bold uppercase tracking-widest text-offwhite transition-colors hover:bg-amber-dark'
							>
								Yes
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
