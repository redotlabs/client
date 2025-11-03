import HeroSection from './sections/hero-section';
import ProcessSection from './sections/process-section';
import WebsiteExamplesSection from './sections/website-examples-section';
import OptionsSection from './sections/options-section';
import BusinessSection from './sections/business-section';

export default function Home() {
  return (
    <main className="flex flex-col min-h-svh">
      <HeroSection />
      {/* <BannerSection /> */}
      <ProcessSection />
      <WebsiteExamplesSection />
      <OptionsSection />
      <BusinessSection />
    </main>
  );
}
