import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { QualityStandard } from './components/QualityStandard';
import { Catalog } from './components/Catalog';
import { Standards } from './components/Standards';
import { Commitment } from './components/Commitment';
import { FeatureGrid } from './components/FeatureGrid';
import { FAQ } from './components/FAQ';
// import { Story } from './components/Story';

export default function Home() {
	return (
		<>
			<Hero />
			<TrustStrip />
			<Standards />
			<QualityStandard />
			<Catalog />
			<Commitment />
			<FeatureGrid />
			<FAQ />
			{/* <Story /> */}
		</>
	);
}
