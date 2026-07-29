import Script from 'next/script';
import { Suspense } from 'react';
import { GA_MEASUREMENT_ID } from '../lib/site';
import { GoogleAnalyticsPageview } from './GoogleAnalyticsPageview';

export function GoogleAnalytics() {
	return (
		<>
			<Script
				src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
				strategy='afterInteractive'
			/>
			<Script id='ga-init' strategy='afterInteractive'>
				{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
				`}
			</Script>
			{/* Fires a page_view on every route change, including client-side
			    next/link navigations that the base gtag snippet above can't see. */}
			<Suspense fallback={null}>
				<GoogleAnalyticsPageview />
			</Suspense>
		</>
	);
}
