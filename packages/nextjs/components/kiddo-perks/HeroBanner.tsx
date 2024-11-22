type HeroBannerProps = {
  title: string;
  subtitle: string;
};

export const HeroBanner = ({ title, subtitle }: HeroBannerProps) => {
  return (
    <div id="hero-banner" className="px-5 pt-10 pb-5">
      <h1 className="text-center">
        <span className="block text-2xl mb-2">{subtitle}</span>
        <span className="block text-4xl font-bold">{title}</span>
      </h1>
    </div>
  );
};
