import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { QualityStandard } from './components/QualityStandard';
import { Catalog } from './components/Catalog';
import { NudaPromise } from './components/NudaPromise';
import { Standards } from './components/Standards';
// import { Commitment } from './components/Commitment';
import { FeatureGrid } from './components/FeatureGrid';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
// import { Story } from './components/Story';

export default function Home() {
	return (
		<>
			<Hero />
			<TrustStrip />
			<Standards />
			<QualityStandard />
			<Catalog />
			<NudaPromise />
			{/* <Commitment /> */}
			<FeatureGrid />
			<FAQ />
			<Contact />
			{/* <Story /> */}
		</>
	);
}
