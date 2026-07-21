let sharedContext: AudioContext | null = null;

export function playAddToCartSound() {
	try {
		const AudioCtx =
			window.AudioContext ||
			(window as unknown as { webkitAudioContext: typeof AudioContext })
				.webkitAudioContext;
		if (!AudioCtx) return;

		sharedContext ??= new AudioCtx();
		const ctx = sharedContext;
		const now = ctx.currentTime;

		const osc = ctx.createOscillator();
		const gain = ctx.createGain();

		osc.type = 'sine';
		osc.frequency.setValueAtTime(720, now);
		osc.frequency.exponentialRampToValueAtTime(1180, now + 0.09);

		gain.gain.setValueAtTime(0.0001, now);
		gain.gain.exponentialRampToValueAtTime(0.18, now + 0.015);
		gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

		osc.connect(gain).connect(ctx.destination);
		osc.start(now);
		osc.stop(now + 0.3);
	} catch {
		// Audio isn't critical to the experience — fail silently.
	}
}
