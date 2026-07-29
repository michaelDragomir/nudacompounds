import { Hero } from './components/Hero';
// import { TrustStrip } from './components/TrustStrip';
import { QualityStandard } from './components/QualityStandard';
import { BestSellers } from './components/BestSellers';
// import { ViewCatalogStrip } from './components/ViewCatalogStrip';
// import { NudaPromise } from './components/NudaPromise';
// import { Standards } from './components/Standards';
// import { Commitment } from './components/Commitment';
import { FeatureGrid } from './components/FeatureGrid';
// import { Story } from './components/Story';

export default function Home() {
	return (
		<>
			<Hero />
			{/* <NudaPromise /> */}
			{/* <TrustStrip /> */}
			{/* <Standards /> */}
			<QualityStandard />
			<BestSellers />
			{/* <ViewCatalogStrip /> */}
			{/* <Commitment /> */}
			<FeatureGrid />
			{/* <Story /> */}
		</>
	);
}
