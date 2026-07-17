import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { TrustStrip } from "./components/TrustStrip";
import { Standards } from "./components/Standards";
import { Commitment } from "./components/Commitment";
import { FeatureGrid } from "./components/FeatureGrid";
import { Story } from "./components/Story";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <TrustStrip />
        <Standards />
        <Commitment />
        <FeatureGrid />
        <Story />
      </main>
      <Footer />
    </>
  );
}
