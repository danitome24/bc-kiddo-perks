type HeroBannerProps = {
  title: string;
  subtitle: string;
};

export const HeroBanner = ({ title, subtitle }: HeroBannerProps) => {
  return (
    <div id="hero-banner" className="px-5 pt-10 pb-5">
      <h1 className="text-4xl font-bold text-center">{title}</h1>
      <p className="text-center">
        <span className="block text-2xl mb-2">{subtitle}</span>
      </p>
    </div>
  );
};
