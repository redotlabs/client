import HeroSection from './_sections/hero-section';
import ProcessSection from './_sections/process-section';
import WebsiteExamplesSection from './_sections/website-examples-section';
import OptionsSection from './_sections/options-section';
import BusinessSection from './_sections/business-section';

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
