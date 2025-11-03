import Image from 'next/image';

const BannerSection = () => {
  return (
    <section>
      <Image
        src="/assets/banners/banner1.png"
        alt="banner1"
        width={1440}
        height={240}
        className="w-full object-cover"
      />
    </section>
  );
};

export default BannerSection;
