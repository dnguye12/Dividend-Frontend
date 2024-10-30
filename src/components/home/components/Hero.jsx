import { Trans } from "react-i18next";

const Hero = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://i.ibb.co/NZhQMXJ/business-person-futuristic-business-environment.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="hero-overlay bg-black bg-opacity-60"></div>
      <div className="hero-content text-center">
        <div className="max-w-lg">
          <h1 className="mb-5 text-6xl text-text font-bold">
            Dividend Insight
          </h1>
          <p className="mb-5">
            <Trans
              i18nKey="Home.hero-description"
              components={{ 0: <span />, 1: <span />, 2: <span /> }}
            >
              We provide <span>100% free</span> and{" "}
              <span>easy-to-understand</span> data to{" "}
              <span>Retail Investors.</span>
            </Trans>
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
